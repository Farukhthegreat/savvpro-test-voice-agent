# AI assistance and evidence

AI assistance was used throughout this assessment. **No language model participates in runtime application decisions.** The candidate chose the vehicle-service use case, free-service constraint, English language, hands-free interaction, isolated demos, mandatory architecture refinements, and approved the interface composition.

## Tools and contribution

- **Codex:** requirements analysis; architecture discussion; Python/SQLAlchemy/FastAPI implementation; deterministic grammar and dialogue policy; tests; React/TypeScript and speech lifecycle; container/CI configuration; documentation; repository operations and verification.
- **Firecrawl Developer and web research:** inspected upstream assessment sources and official provider/framework documentation. These are development tools, not app runtime dependencies.
- **Neon CLI and installed Neon skills:** linked the candidate-supplied project, retained the existing SQLAlchemy/psycopg driver, pulled private service configuration, and verified real Postgres operations through the app. The fetched skill instructed reuse of the already installed skills/MCP plugin, so duplicate server configuration was avoided.
- **Impeccable and UI UX Pro Max skills:** established and reviewed the caller-first reception composition, accessibility controls, responsive behavior, and design documentation. The candidate explicitly selected composition B and requested UI UX Pro Max.
- **Built-in Imagegen:** generated three interface composition references. Generated dates, addresses, durations, vehicles, confidence claims, and other invented content were not adopted. The application renders actual API data as accessible React UI; no image model is called at runtime.
- **Independent skill-directed finish review:** identified undersized controls. A focused correction and recapture resolved the finding; final disposition was `ship`. A separate documenter records the shipped design system.

## Observed mistakes and corrections

1. An initial substring rule treated “afternoon” as “noon.” A regression test exposed it; a word-boundary rule now requests an exact time instead of inventing noon.
2. The first intent grammar treated the word “appointment” as a new booking during appointment selection. A regression test now verifies that “the oil change appointment” preserves the rescheduling task.
3. Initial test parameter IDs included a 5 MB binary value, producing unusably long test paths/output on Windows. Explicit short test IDs fixed the test harness.
4. A browser-artifact script used URL pathname text without decoding spaces, writing screenshots to a percent-encoded sibling path. It now uses `fileURLToPath`; evidence was recovered and recaptured in the intended workspace.
5. A first design pass used 42px controls despite the stated 44px target. The independent review caught this; select/send/appointment controls were corrected and re-reviewed.
6. Review found that confirmation could transfer across operation/appointment changes. Tests reproduced it; confirmation now requires the same operation and target as the preceding readback, and cancellation corrections select and read back the new target.
7. The candidate's live test exposed robotic local-voice preference and pauses caused by fixed-size chunks. English natural/Google voices are now preferred, a reply-voice selector is available, and chunks preserve sentence/clause boundaries where possible. A second live check is still needed.

## Token evidence

Sanitized, machine-reported token-count events are in [docs/ai-usage/codex-token-counts.json](docs/ai-usage/codex-token-counts.json). The file records its cutoff timestamp and latest cumulative totals. **Do not sum cumulative event totals.** Cached input is included within input tokens; it is not added again. These counters are tool-reported usage, not a bill or unique-text measure.

The final assistant message and any work after the export cutoff are not included. Image-generation token usage is not exposed by the tool and is not estimated. Separate review/documentation sessions are identified as AI assistance; only counters actually available in exported evidence are claimed.

Reproduce an export from an available local Codex JSONL log with:

```sh
uv run python scripts/export_ai_usage.py --session /path/to/your/session.jsonl
```

The exporter includes only token metadata and reported model identifiers, excluding prompts, tool output, personal account state, and secrets. Raw session logs are not committed.

## Human validation and limitations

Automated tests validate actual Python decisions and transactions on both database dialects. Live microphone accuracy, browser voice quality, provider access, and public deployment require separate checks; their status is maintained honestly in [docs/VERIFICATION.md](docs/VERIFICATION.md). AI-generated assertions are not accepted as verification evidence.
