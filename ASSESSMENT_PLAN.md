# Assessment execution plan

Deadline: 27 October 2026, 00:00 PKT. Final hour reserved for release and submission.

1. Fork/clone, verify remotes and candidate branch, write AGENTS.md, establish isolated Python environment and lockfiles.
2. Implement SQLAlchemy 2.0 models, create_all lifespan initialization, SQLite/Postgres engines, per-browser isolated bays, idempotent fixtures and reset. Allocation uniqueness: (bay_id, segment_start). Caller seed: Alex Rivera, SUV, tyre rotation, next open day at 11:00. Background fixtures include both bays full and a valid 17:30 slot.
3. Build a deterministic Python NLU/state machine for book/reschedule/cancel, dates, synonyms, negation, corrections, confirmation invalidation, and 0/1/multiple appointment selection. Test before connecting UI.
4. Add cookie-owned sessions, turn_id deduplication, revision checks, transactional rescheduling/cancellation, and structured decision traces. Test collisions and reset races on SQLite and Postgres.
5. Build premium React reception: transcript, booking details, actual decision inspector, typed input, quick utterances, session reset. Browser speech primary; MediaRecorder plus /api/stt Groq Whisper fallback. Synthesis flush, word-count watchdog <=12 seconds, short chunks, exactly-once guarded completion and resource cleanup.
6. Verify with pytest as primary budget, focused frontend Vitest/check/build and browser smoke. Manually verify actual Chrome speech; record any unavailable credentials or hardware checks honestly.
7. Deploy both layers together on Render with Neon. Complete README, DESIGN, AI_USAGE and sanitized token evidence, walkthrough, push, upstream PR.

All core assessment requirements remain mandatory. No runtime LLM decisions, real personal data, or committed secrets. create_all is initialization, not schema migration. Independent demo workshops allow predictable session-local reset without modifying another reviewer’s state.

## Progress

- Repository, rules, environment, backend, interface, and assessment documentation implemented.
- 90 pytest cases pass across SQLite and Postgres; backend coverage 91%. Type/lint, frontend checks and 8 Vitest tests pass.
- Actual API browser smoke and desktop/mobile render checks pass. Independent UI finish-review disposition: ship.
- Docker build and non-root runtime verified. Confirmed booking and revision persist across a container restart with Postgres.
- Remaining: candidate's real microphone check, optional Groq live check, Neon setup, public deployment, final evidence refresh and submission.
- Hosting change: the candidate's Render workspace is suspended for unpaid invoices. The same app also has Railway deployment configuration; account availability is being checked before provisioning.
