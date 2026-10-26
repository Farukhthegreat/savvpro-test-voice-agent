# Bayline design system

This master records the shipped, user-approved interface. The initial UI UX Pro Max search recommendations were reviewed against the approved composition; conflicting generic marketing, red-CTA, and remote-font suggestions were not adopted.

## Source of truth

- PRODUCT.md: product facts and assessment constraints.
- DESIGN.md: shipped visual tokens, components, and deterministic-brain appendix.
- frontend/src/tokens.css: implementation primitives.
- pages/reception.md: caller-workspace composition and behavior overrides.

## System

- White panels on cool gray; slate text and a restrained blue action color.
- Primary #245e97; hover #194e82; tint #edf3f9; canvas #f5f7fa; ink #15273b; muted #596d82; dividers #e1e7ee.
- Approved local system sans. Large task heading, prominent appointment time, readable transcript, subordinate metadata.
- Top navigation; approximately 65/35 call/appointment split; single-column mobile flow.
- Flat regions separated by whitespace, tone, and dividers. No ornamental elevation.
- Controls >=44px; quick utterances wrap without truncation; mobile message input is 16px.
- Visible keyboard focus, semantic labels/log/details, real error/loading/disabled states, reduced-motion support.
- One CSS waveform illustrating actual controller status; no claim of measured audio amplitude.
- Use actual API data. No invented confidence scores, customer details, durations, locations, or confirmations.
- The decision inspector reveals matched rules, extracted slots, validation, actions, and revision.

This is an operational app, not a marketing landing page. No unverified accessibility-conformance or provider-quality claims.
