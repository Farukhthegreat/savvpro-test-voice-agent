import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
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
