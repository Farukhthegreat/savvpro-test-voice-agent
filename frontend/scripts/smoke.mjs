import { chromium, expect } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

// UI smoke and walkthrough only. Actual microphone speech requires manual Chrome verification.
const baseURL = process.env.SMOKE_URL || 'http://127.0.0.1:8000'
const root = new URL('../../artifacts/', import.meta.url)
await mkdir(root, { recursive: true })
const browser = await chromium.launch({ headless: true })
const errors = []
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  reducedMotion: 'reduce',
  recordVideo: {
    dir: fileURLToPath(new URL('walkthrough/', root)),
    size: { width: 1440, height: 1100 },
  },
})
const page = await context.newPage()
page.on('pageerror', (error) => errors.push(error.message))

async function send(text) {
  await page.getByRole('textbox', { name: 'Type your message' }).fill(text)
  const response = page.waitForResponse(
    (response) => response.url().endsWith('/api/turn') && response.request().method() === 'POST',
  )
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  const result = await response
  expect(result.status()).toBe(200)
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeDisabled()
  return result.json()
}

try {
  await page.goto(baseURL)
  await expect(page.getByText('11:00 AM', { exact: true })).toBeVisible()
  await page.screenshot({
    path: fileURLToPath(new URL('reception-desktop.png', root)),
    fullPage: true,
  })
  const first = await send('Book a brake inspection for my SUV tomorrow at 2 PM')
  expect(first.trace.validation).toContain('both_bays_occupied')
  await page.locator('.inspector summary').click()
  await expect(page.getByText('both_bays_occupied', { exact: true })).toBeVisible()
  const selected = await send('first one')
  expect(selected.state.phase).toBe('CONFIRMING')
  const confirmed = await send('yes')
  expect(confirmed.trace.action).toBe('booked')
  expect(confirmed.appointments).toHaveLength(2)
  const multiple = await send('reschedule my appointment')
  expect(multiple.state.phase).toBe('SELECTING_APPOINTMENT')
  await send('first one')
  await send('Thursday at 3 PM')
  const moved = await send('yes')
  expect(moved.trace.action).toBe('rescheduled')
  await send('cancel my tyre rotation')
  const cancelled = await send('yes')
  expect(cancelled.trace.action).toBe('cancelled')
  await page.getByRole('button', { name: /Reset demo/ }).click()
  const reset = page.waitForResponse((response) => response.url().endsWith('/api/session/reset'))
  await page.getByRole('button', { name: 'Reset Demo Session', exact: true }).click()
  expect((await reset).status()).toBe(200)
  await expect(page.getByText('11:00 AM', { exact: true })).toBeVisible()

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
  const phone = await mobile.newPage()
  phone.on('pageerror', (error) => errors.push(error.message))
  await phone.goto(baseURL)
  await expect(phone.getByText('11:00 AM', { exact: true })).toBeVisible()
  expect(
    await phone.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true)
  await phone.screenshot({
    path: fileURLToPath(new URL('reception-mobile.png', root)),
    fullPage: true,
  })
  await mobile.close()
  expect(errors).toEqual([])
  console.log(
    'PASS: booking, alternatives, selection, rescheduling, cancellation, reset, desktop/mobile rendering; no page errors.',
  )
} finally {
  await context.close()
  await browser.close()
}
