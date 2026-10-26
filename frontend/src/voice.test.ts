import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { chunkReply, VoiceController, watchdogMs } from './voice'

describe('speech safety helpers', () => {
  it('chunks the entire reply without changing words and bounds playback duration', () => {
    const text = Array.from({ length: 55 }, (_, i) => 'word' + i).join(' ')
    const chunks = chunkReply(text)
    expect(chunks).toHaveLength(4)
    expect(chunks.every((chunk) => chunk.split(' ').length <= 18)).toBe(true)
    expect(chunks.join(' ')).toBe(text)
    expect(watchdogMs('yes')).toBeGreaterThanOrEqual(3500)
    expect(watchdogMs(text)).toBe(12000)
    expect(chunkReply('  ')).toEqual([])
  })
})

describe('synthesis completion guards', () => {
  let utterances: SpeechSynthesisUtterance[]
  let controller: VoiceController
  const callbacks = { status: vi.fn(), interim: vi.fn(), text: vi.fn(), error: vi.fn() }
  beforeEach(() => {
    vi.useFakeTimers()
    utterances = []
    vi.stubGlobal(
      'SpeechSynthesisUtterance',
      class {
        text: string
        onend: (() => void) | null = null
        onerror: (() => void) | null = null
        constructor(text: string) {
          this.text = text
        }
      },
    )
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel: vi.fn(),
        getVoices: () => [],
        speak: (utterance: SpeechSynthesisUtterance) => utterances.push(utterance),
      },
    })
    controller = new VoiceController(callbacks)
  })
  afterEach(() => {
    controller.end()
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('recovers when onend never fires, once', () => {
    controller.speak('A short reply.', false)
    vi.advanceTimersByTime(12050)
    expect(callbacks.status).toHaveBeenLastCalledWith('idle')
    expect(window.speechSynthesis.cancel).toHaveBeenCalled()
    expect(utterances).toHaveLength(1)
  })

  it('does not advance twice when an old end event follows normal completion', () => {
    controller.speak(Array.from({ length: 25 }, () => 'test').join(' '), false)
    const oldEnd = utterances[0].onend as unknown as () => void
    oldEnd()
    oldEnd()
    vi.advanceTimersByTime(50)
    expect(utterances).toHaveLength(2)
  })

  it('discards late events after termination', () => {
    controller.speak(Array.from({ length: 25 }, () => 'test').join(' '), false)
    const oldEnd = utterances[0].onend as unknown as () => void
    controller.end()
    oldEnd()
    vi.advanceTimersByTime(15000)
    expect(utterances).toHaveLength(1)
    expect(callbacks.status).toHaveBeenLastCalledWith('idle')
  })
})
