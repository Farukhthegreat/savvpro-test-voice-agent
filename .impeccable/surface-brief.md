# Reception surface

- Mode: operate. Caller books, reschedules, and cancels; reviewer sees actual deterministic decisions.
- Approved composition: `.impeccable/mocks/layout-b.png`, selected by the user on 26 October 2026. Top navigation, approximately 65/35 call/appointment split, transcript composer beneath the call stage, quick utterances and decision inspector below.
- Preserve white/slate/blue reception language, generous call-stage whitespace, prominent microphone control, readable ticket details, and a clear left-to-right task hierarchy.
- Do not literalize generated content: all dates, durations, identities, appointment statuses, and state traces come from the real API. No invented customers, locations, vehicles, confidence scores, or confirmations.

| Ingredient | Implementation medium |
| --- | --- |
| Top bar and wordmark | Semantic HTML, CSS, small flat SVG mark |
| Call waveform and microphone | CSS bars driven by voice status; lucide SVG icons |
| Appointment ticket and draft | HTML definition lists backed by API data |
| Transcript and composer | HTML log/form with labels and keyboard support |
| Quick utterances and inspector | Buttons and native details element |
| Desktop/mobile hierarchy | CSS grid becoming a single-column flow |

The comp requires no photographic or illustrated assets. Images remain local reference artifacts; production UI is accessible code.
