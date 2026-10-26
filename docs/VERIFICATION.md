# Verification record

Date: 26 October 2026 (PKT). Update this record from actual runs before submission.

| Check | Result |
| --- | --- |
| Python pytest, SQLite and Postgres 17 | 100 passed on Windows; preceding 98-test suite also passed on Linux; no database skips with local test Postgres configured; backend coverage 91% |
| Ruff | Passed |
| Mypy backend | Passed |
| TypeScript and production Vite build | Passed |
| Vitest | 11 passed on Windows; preceding 10-test suite also passed on Linux |
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
