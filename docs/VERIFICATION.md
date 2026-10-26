# Verification record

Date: 26 October 2026 (PKT). Update this record from actual runs before submission.

| Check | Result |
| --- | --- |
| Python pytest, SQLite and Postgres 17 | 100 passed on Windows; preceding 98-test suite also passed on Linux; no database skips with local test Postgres configured; backend coverage 91% |
| Ruff | Passed |
| Mypy backend | Passed |
| TypeScript and production Vite build | Passed |
| Vitest | 16 passed on Windows after the black/gold revision; preceding 10-test suite also passed on Linux |
| Real backend browser smoke | Passed: alternatives, booking, multi-appointment selection, rescheduling, cancellation, reset |
| Desktop 1440px / mobile 390px | Rendered, screenshots captured; no horizontal overflow at mobile size |
| Browser JavaScript errors during smoke | None |
| Design detector | No findings |
| Container build/runtime | Passed: non-root image serves React/API; confirmed booking and session revision survived a container restart using Postgres |
| Actual Chrome microphone/STT/TTS | Candidate reports correct transcription, audible replies, and fast responses. Reported robotic voice and mid-sentence pauses; natural-voice preference/selector and sentence-aware chunking added, awaiting a second live check. |
| Live Groq provider | Not yet verified; provider success/errors covered with controlled test responses |
| Neon hosted database | Passed against production branch: actual API reschedule, two-segment booking, cancellation/release, state recovery, and isolated reset; pooled TLS connection verified |
| Root npm build | Passed after Neon initialization; TypeScript and production Vite bundle generated |
| Public deployment | Passed at https://savvpro-test-voice-agent.onrender.com: real browser booking/alternatives/selection/reschedule/cancel/reset; desktop/mobile rendering; no page errors; real Neon writes verified independently |
| Hosted HTTPS/session boundary | Passed: same-origin session POST succeeds; cookie is Secure; static page, capabilities, and database health return 200 |
| GitHub Actions | Jobs did not start: GitHub reports account locked due to billing. Backend pytest/lint/types and frontend tests/build have also been exercised locally in Linux containers. |

The installed Starlette TestClient emits a deprecation warning about httpx; it does not fail the test suite. Do not suppress or reinterpret unavailable live checks as passes.

The final hosted browser smoke passed on the fresh-call greeting build (runtime commit 7b01b76), identified by frontend asset `index-Bgm5S7gI.js`; the candidate also confirmed the deployment passed. One repeat was interrupted by a local DNS lookup failure; DNS recovered and the retry passed. Subsequent documentation-only evidence updates do not change the runtime or require another deployment. Final public voice quality and optional Groq live access are not implied by automated checks.


## Black-and-gold interface revision ? 26 October, approximately 20:40 PKT

- Root `npm run build`: passed; generated `index-CWcEv-oe.js` / `index-BCEVZ1Rb.css` and locally served Manrope font files. Dependency audit reported zero vulnerabilities.
- Vitest: 16 passed, including dedicated navigation/deep links, selected-reference management with multiple appointments, empty state, explicit cancellation flow, and typed-entry focus.
- Actual-Neon browser smoke: passed booking/occupied alternatives, multi-appointment selection, rescheduling, cancellation through the appointments page, reset, and desktop/mobile navigation. Both initial pages retain `scrollY === 0`; mobile has no horizontal overflow; no page JavaScript errors.
- Backend regression: 100 pytest passed across SQLite/Postgres, Ruff passed, Mypy passed.
- Design detector: no findings. Independent finish-review final disposition: **ship**, with both original findings resolved (local transcript scrolling and visible typed fallback).
- Updated desktop/mobile screenshots cover reception and the dedicated appointments view. The silent recording shows the new interface.
- Public deployment verified on Render runtime commit `591f3f1`: expected `index-CWcEv-oe.js` fingerprint confirmed, then the complete real-browser smoke passed on HTTPS, including new appointment navigation/actions, desktop/mobile layout, and no page errors. Final real-microphone/voice-quality and optional live Groq checks remain separate.
