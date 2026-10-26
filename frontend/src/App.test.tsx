import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import App, { prettyTime } from './App'

const appointment = {
  id: 'fake-id',
  reference: 'DEADBEEF',
  service: 'tyre_rotation',
  service_name: 'Tyre Rotation',
  vehicle: 'suv',
  date: '2026-10-27',
  time: '11:00',
  description: 'Tyre Rotation for your SUV',
  minutes: 30,
  status: 'active',
}
const session = {
  revision: 0,
  state: {},
  appointments: [appointment],
  history: [],
  welcome: 'Welcome to Bayline.',
  caller: 'Alex Rivera',
  timezone: 'Asia/Karachi',
  demo_date: '2026-10-27',
}
const trace = {
  from_state: 'IDLE',
  to_state: 'COLLECTING',
  intent: 'BOOK',
  rules: ['intent_book'],
  extracted: {},
  validation: [],
  action: 'none',
}

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => ({
      ok: true,
      json: async () =>
        url === '/api/capabilities'
          ? { server_stt: false, services: {}, timezone: 'Asia/Karachi' }
          : url === '/api/turn'
            ? {
                revision: 1,
                state: { phase: 'COLLECTING' },
                appointments: [appointment],
                reply: 'Which service?',
                trace,
              }
            : session,
    })),
  )
})
afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

it('opens a distinct appointments view and targets the selected booking when managing it', async () => {
  render(<App />)
  await screen.findByText('11:00 AM')
  fireEvent.click(screen.getByRole('link', { name: /Your appointments/ }))
  expect(screen.getByRole('heading', { name: 'Your appointments.' })).toBeInTheDocument()
  expect(screen.queryByRole('textbox', { name: 'Type your message' })).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Your appointments/ })).toHaveAttribute(
    'aria-current',
    'page',
  )
  expect(screen.getByText('DEADBEEF')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Reschedule' }))
  expect(screen.getByRole('textbox', { name: 'Type your message' })).toBeInTheDocument()
  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      '/api/turn',
      expect.objectContaining({
        body: expect.stringContaining('Reschedule my appointment reference DEADBEEF'),
      }),
    ),
  )
})

it('supports appointment deep links and cancellation without bypassing confirmation', async () => {
  window.history.replaceState(null, '', '/#appointments')
  render(<App />)
  await screen.findByText('DEADBEEF')
  fireEvent.click(screen.getByRole('button', { name: 'Cancel appointment' }))
  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      '/api/turn',
      expect.objectContaining({
        body: expect.stringContaining('Cancel my appointment reference DEADBEEF'),
      }),
    ),
  )
  const turns = vi.mocked(fetch).mock.calls.filter(([url]) => url === '/api/turn')
  expect(turns).toHaveLength(1)
  expect(String(turns[0][1]?.body)).not.toContain('"text":"yes"')
})

it('responds to back navigation and shows an actionable empty appointment view', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => ({
      ok: true,
      json: async () =>
        url === '/api/capabilities'
          ? { server_stt: false, services: {}, timezone: 'Asia/Karachi' }
          : { ...session, appointments: [] },
    })),
  )
  render(<App />)
  await screen.findByText('A clear schedule.')
  window.history.replaceState(null, '', '/#appointments')
  fireEvent(window, new HashChangeEvent('hashchange'))
  expect(screen.getByRole('heading', { name: 'No upcoming appointments.' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Book your first service/ })).toBeEnabled()
  window.history.replaceState(null, '', '/#reception')
  fireEvent(window, new HashChangeEvent('hashchange'))
  expect(screen.getByRole('button', { name: /Start a call/ })).toBeInTheDocument()
})

it('renders the seeded appointment and disables unavailable server speech', async () => {
  render(<App />)
  expect(await screen.findByText('11:00 AM')).toBeInTheDocument()
  expect(screen.getByText('Tyre Rotation')).toBeInTheDocument()
  expect(screen.getByRole('option', { name: /Server speech/ })).toBeDisabled()
  expect(screen.getByRole('button', { name: /Start a call/ })).toBeEnabled()
})

it('dispatches quick utterances through the same turn endpoint as typing', async () => {
  render(<App />)
  await screen.findByText('11:00 AM')
  fireEvent.click(
    screen.getByRole('button', { name: /Book a brake inspection for my SUV tomorrow at 2 PM/ }),
  )
  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      '/api/turn',
      expect.objectContaining({ body: expect.stringContaining('Book a brake inspection') }),
    ),
  )
  expect(await screen.findByText('Which service?')).toBeInTheDocument()
  const input = screen.getByRole('textbox', { name: 'Type your message' })
  fireEvent.change(input, { target: { value: 'oil change' } })
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      '/api/turn',
      expect.objectContaining({ body: expect.stringContaining('oil change') }),
    ),
  )
})

it('requires deliberate reset and calls the session-scoped endpoint', async () => {
  render(<App />)
  await screen.findByText('11:00 AM')
  fireEvent.click(screen.getByRole('button', { name: /Reset demo/ }))
  expect(screen.getByText('Reset this demo session?')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Reset Demo Session' }))
  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      '/api/session/reset',
      expect.objectContaining({ body: '{"revision":0}' }),
    ),
  )
})

it('formats midnight, noon, and afternoon without timezone conversion', () => {
  expect(prettyTime('00:00')).toBe('12:00 AM')
  expect(prettyTime('12:30')).toBe('12:30 PM')
  expect(prettyTime('17:30')).toBe('5:30 PM')
})

it('offers typed entry without starting a voice call or sending a turn', async () => {
  render(<App />)
  await screen.findByText('11:00 AM')
  fireEvent.click(screen.getByRole('button', { name: 'Type instead' }))
  expect(screen.getByRole('textbox', { name: 'Type your message' })).toHaveFocus()
  expect(vi.mocked(fetch).mock.calls.filter(([url]) => url === '/api/turn')).toHaveLength(0)
})

it('lists multiple appointments and manages the chosen reference rather than the first booking', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => ({
      ok: true,
      json: async () =>
        url === '/api/capabilities'
          ? {
              server_stt: false,
              services: { oil_change: { name: 'Oil Change', minutes: 30 } },
              timezone: 'Asia/Karachi',
            }
          : url === '/api/turn'
            ? { revision: 1, state: {}, appointments: [appointment], reply: 'Which date?', trace }
            : {
                ...session,
                appointments: [
                  appointment,
                  {
                    ...appointment,
                    id: 'second',
                    reference: 'CAFEBABE',
                    service_name: 'Brake Inspection',
                    service: 'brake_inspection',
                    minutes: 60,
                  },
                ],
              },
    })),
  )
  render(<App />)
  await screen.findByText('11:00 AM')
  expect(screen.getByRole('button', { name: /Oil Change.*30 min/ })).toBeEnabled()
  fireEvent.click(screen.getByRole('link', { name: /Your appointments/ }))
  expect(screen.getAllByRole('article')).toHaveLength(2)
  const second = screen.getByRole('article', { name: 'Brake Inspection booking CAFEBABE' })
  fireEvent.click(within(second).getByRole('button', { name: 'Reschedule' }))
  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      '/api/turn',
      expect.objectContaining({
        body: expect.stringContaining('Reschedule my appointment reference CAFEBABE'),
      }),
    ),
  )
})

it('starts a fresh call with a greeting after a previous call ended', async () => {
  const speak = vi.fn()
  vi.stubGlobal('speechSynthesis', { cancel: vi.fn(), getVoices: () => [], speak })
  vi.stubGlobal(
    'SpeechSynthesisUtterance',
    class {
      text: string
      constructor(text: string) {
        this.text = text
      }
    },
  )
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => ({
      ok: true,
      json: async () =>
        url === '/api/capabilities'
          ? { server_stt: false, services: {}, timezone: 'Asia/Karachi' }
          : { ...session, state: { phase: 'ENDED', last_reply: 'Goodbye.' } },
    })),
  )
  render(<App />)
  await screen.findByText('11:00 AM')
  fireEvent.click(screen.getByRole('button', { name: /Start a call/ }))
  expect(speak.mock.calls[0][0].text).toBe('Welcome to Bayline.')
})
