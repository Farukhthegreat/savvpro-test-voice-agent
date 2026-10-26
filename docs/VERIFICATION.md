# Verification record

Date: 26 October 2026 (PKT). Update this record from actual runs before submission.

| Check | Result |
| --- | --- |
| Python pytest, SQLite and Postgres 17 | 100 passed on Windows; preceding 98-test suite also passed on Linux; no database skips with local test Postgres configured; backend coverage 91% |
| Ruff | Passed |
| Mypy backend | Passed |
| TypeScript and production Vite build | Passed |
| Vitest | 10 passed on Windows and Linux |
| Real backend browser smoke | Passed: alternatives, booking, multi-appointment selection, rescheduling, cancellation, reset |
| Desktop 1440px / mobile 390px | Rendered, screenshots captured; no horizontal overflow at mobile size |
| Browser JavaScript errors during smoke | None |
| Design detector | No findings |
| Container build/runtime | Passed: non-root image serves React/API; confirmed booking and session revision survived a container restart using Postgres |
| Actual Chrome microphone/STT/TTS | Candidate reports correct transcription, audible replies, and fast responses. Reported robotic voice and mid-sentence pauses; natural-voice preference/selector and sentence-aware chunking added, awaiting a second live check. |
| Live Groq provider | Not yet verified; provider success/errors covered with controlled test responses |
| Neon hosted database | Passed against production branch: actual API reschedule, two-segment booking, cancellation/release, state recovery, and isolated reset; pooled TLS connection verified |
| Root npm build | Passed after Neon initialization; TypeScript and production Vite bundle generated |
| Public deployment | Setup in progress on candidate's available Google-login Render account; original workspace suspended and Railway signups unavailable |
| GitHub Actions | Jobs did not start: GitHub reports account locked due to billing. Backend pytest/lint/types and frontend tests/build have also been exercised locally in Linux containers. |

The installed Starlette TestClient emits a deprecation warning about httpx; it does not fail the test suite. Do not suppress or reinterpret unavailable live checks as passes.
