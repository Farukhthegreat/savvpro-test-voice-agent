---
name: Bayline Service Reception
description: A calm vehicle-service reception with visible, deterministic booking decisions.
colors:
  blue: "#245e97"
  blue-hover: "#194e82"
  blue-tint: "#edf3f9"
  canvas: "#f5f7fa"
  surface: "#ffffff"
  ink: "#15273b"
  muted: "#596d82"
  line: "#e1e7ee"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(30px, 3.4vw, 44px)"
    fontWeight: 650
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: "-0.015em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  conversation:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  compact: "6px"
  control: "8px"
  field: "10px"
  panel: "12px"
  shell: "16px"
spacing:
  small: "8px"
  compact: "12px"
  medium: "16px"
  comfortable: "20px"
  section: "24px"
  large: "32px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
  button-primary-hover:
    backgroundColor: "{colors.blue-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.blue}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
  button-secondary-hover:
    backgroundColor: "{colors.blue-tint}"
  button-text:
    textColor: "{colors.muted}"
    padding: "9px 0"
  field-composer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "7px"
  chip-utterance:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "14px 16px"
  panel-inspector:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
---

# Design System: Bayline Service Reception

## Overview

**Creative North Star: "The Calm Service Reception"**

Bayline turns a spoken vehicle-service request into a reviewed appointment. Its white surfaces, slate text, restrained blue controls, and precise dividers convey an orderly reception desk. Crisp system typography is an explicit user-approved choice, with no remote font dependency. Generous space around the call controls balances compact appointment details and conversation rows.

The product serves fictional callers booking, rescheduling, or cancelling car and SUV services. Every browser owns an isolated two-bay workshop and the fictional Alex Rivera profile. The caller's task stays primary; an expandable inspector exposes the actual Python decisions. No real contact, registration, or payment details belong in this experience.

This record describes the shipped React interface in `frontend/src/tokens.css`, `frontend/src/styles.css`, and `frontend/src/App.tsx`, checked against the desktop and mobile captures in `artifacts/`. The approved reception overrides in `design-system/bayline/pages/reception.md` take precedence over generic generated recommendations. The reference mock supplies composition, not fictional booking facts to copy.

**Key Characteristics:**

- White working surfaces on a cool slate canvas.
- Restrained blue actions and flat, finely divided panels.
- Clear call status, readable conversation, and a prominent appointment time.
- Confirmation before changes, with actual decision evidence available on demand.

## Colors

The palette uses a single blue accent with cool neutral surfaces; the frontmatter is the normative palette.

### Primary

- **Reception Blue** (`blue`): primary call, send, and confirmation controls, pending appointment time, and interactive emphasis.
- **Pressed Blue** (`blue-hover`): primary-control hover feedback.
- **Quiet Blue** (`blue-tint`): secondary hover and informational treatment.

### Neutral

- **Cool Canvas** (`canvas`): the page background outside working panels.
- **Reception White** (`surface`): primary workspace, navigation, composer, and quick utterances.
- **Slate Ink** (`ink`): headings and appointment facts.
- **Slate Secondary** (`muted`): supporting instructions, field labels, and secondary actions.
- **Fine Divider** (`line`): panel boundaries, ticket rows, and structural rules.

Small green, amber, and red state treatments distinguish confirmed, pending, warning, and end-call states. They remain semantic component treatments rather than additional brand accents; text and icons communicate their meaning too.

**The Action Blue Rule.** Use blue to identify an available action or a current proposal; keep most working surfaces white or neutral.

## Typography

**Display and body font:** the same locally available system sans stack, recorded in the frontmatter. Monospace is limited to booking references and actual rule identifiers.

**Character:** crisp and utilitarian, with a stronger weight and tighter tracking for the main heading and appointment time. This deliberately follows the approved reception direction.

### Hierarchy

- **Display:** the responsive frontmatter role introduces the caller's task. At the narrow breakpoint it becomes a fixed mobile heading (33px).
- **Appointment time:** a distinct ticket anchor, fluid on desktop (`clamp(37px, 4.4vw, 61px)`), intermediate at 42px and mobile at 52px; weight 650, line-height 1, tracking -0.04em.
- **Title:** the frontmatter role defines section hierarchy; local panel headings use compact variations rather than competing with the display.
- **Body:** the frontmatter role sets the base reading rhythm; the mobile base grows to 16px.
- **Conversation:** the frontmatter role limits transcript lines to 72ch and grows to 14px on mobile. Messages wrap long content and preserve line breaks.

The shipped interface also contains compact annotation text. Its smallest sizes are not a reusable reading-text scale for new surfaces; preserve readable message and input sizes.

## Layout

The reception is an operating workspace. Its desktop shell combines a wider call/conversation region with a narrower appointment ticket. The current grid uses `minmax(0, 1fr) minmax(300px, 0.465fr)` inside a centered container (maximum 1480px). Main horizontal padding is 3.5%, becoming 48px above 1550px. Fine dividers organize the call stage, conversation, and ticket details.

The call stage has intentional breathing room; the transcript remains bounded and scrollable. Quick utterances form two columns below the workspace, followed by the expandable decision inspector. Spacing draws from the frontmatter scale with component-specific adjustments; it is not a strict all-values grid.

At 1180px, padding tightens and the brand caption disappears. At 850px, navigation hides, the appointment minimum narrows, and inspector metadata reflows. At 650px, the workspace stacks call/conversation before appointment details, quick utterances become one column, and inspector grids stack. Mobile uses 16px page gutters, larger message/appointment text, and a 16px composer input. The reset action retains an accessible label when its visible text hides.

**The Task First Rule.** Keep the call controls and conversation before the appointment ticket in reading order; put technical evidence after the caller's task.

## Elevation & Depth

The shipped system has no box-shadow vocabulary. Depth comes from the cool page canvas, white working surfaces, a subtly tinted appointment panel, hairline borders, and the profile strip. Do not add floating-card shadows to recreate boundaries the dividers already express.

**The Flat Reception Rule.** Separate regions with surface tone, whitespace, and fine dividers rather than ornamental elevation.

## Shapes

Controls have gently rounded corners; larger containers receive proportionately broader corners using the frontmatter radius scale. The desktop workspace uses the shell radius and the mobile shell uses the panel radius. Circular avatars, small status dots, and the headset medallion are functional exceptions. Icons are consistent stroked SVGs, not text glyphs.

## Components

### Buttons

Confident, compact controls with clear labels. Primary buttons use blue with white text; secondary buttons use a white surface, blue text, and a pale blue border. Text buttons remain visually quiet for reset, cancellation, and rejecting a proposal. The minimum primary/text control height is 44px; icon-only buttons are at least 44px in both dimensions. Hover changes color over 180ms; enabled primary buttons move down 1px while pressed. Disabled controls reduce opacity and use a non-interactive cursor.

All applicable controls show the shared visible focus outline (3px solid `#3578c7`, offset 4px). A skip link provides direct keyboard entry to the main workspace.

### Chips

Quick utterances are full sentence action buttons rather than filter pills. They use the control radius, a fine border, a trailing arrow, and a pale blue hover surface. Their minimum height is 48px on desktop and 52px on mobile. Activation sends the displayed utterance through the same turn pipeline as typing or speech.

### Cards / Containers

Use the flat surface and border treatment described above. The reception shell contains joined task regions, not a collection of unrelated floating cards. The inspector uses the panel radius and a generous disclosure row; the appointment details use definition-list rows with fine top dividers.

### Inputs / Fields

The composer is a white, rounded border enclosure with a flexible text input and a blue send control. Focus within shifts the enclosure border to blue; the input has an accessible label. Mobile text input remains 16px. The speech-source select uses the same restrained border language and a minimum 44px interactive height. Warning and recoverable error notices remain inline with the workspace.

### Navigation

Desktop navigation uses muted text, darker active text, and a thin blue underline. Links retain a minimum 44px height. At the intermediate breakpoint, navigation disappears while the brand, isolated-demo marker, and reset control remain. Do not fabricate additional customer-management destinations from the reference mock.

### Voice stage and decision inspector

The waveform is a CSS status illustration, not a measured microphone waveform. Its bars remain still when idle and animate only for active controller states. The visible status and control labels carry the actual interaction meaning. Motion respects reduced-motion preferences; color/control transitions are short, and waveform animation reflects listening, speaking, or processing.

The native disclosure inspector presents actual state transitions, matched rules, extracted entities, validation, action, and revision. It shows an honest empty state before a request. Never substitute invented confidence scores or a fabricated reasoning narrative.

## Do's and Don'ts

### Do:

- **Do** use the recorded blue/slate palette and user-approved local system sans.
- **Do** preserve visible focus, meaningful status text, disabled states, and at least 44px primary control targets.
- **Do** distinguish a pending proposal from a confirmed appointment and require explicit confirmation.
- **Do** render dates, duration, booking ownership, and decision traces from the actual API response.
- **Do** keep the mobile composer readable and respect reduced-motion preferences.

### Don't:

- **Don't** import the generic red CTA or remote-font recommendations over the approved reception overrides.
- **Don't** copy invented customer, address, vehicle, duration, or confirmation facts from the mock.
- **Don't** replace structural borders with ornamental shadows or turn every detail into a separate card.
- **Don't** treat decorative waveform bars as measured audio or imply an LLM made a booking decision.
- **Don't** collect real personal, registration, or payment information in this fictional simulation.

## Technical appendix: deterministic reception brain

The Python backend makes zero runtime LLM calls for intent detection, extraction, dialogue policy, or response generation. A finite English grammar uses explicit rules and regular expressions to recognize booking, rescheduling, cancellation, service/vehicle synonyms, dates, times, references, and supported ordinal choices. Templates generate replies. Unsupported or ambiguous language produces clarification. Browser recognition is primary; optional Groq Whisper supplies transcription only. Typed text, final speech transcripts, and quick utterances use one turn pipeline.

The explicit state machine moves between `IDLE`, `COLLECTING`, `SELECTING_APPOINTMENT`, `CONFIRMING`, `COMPLETED`, and `ENDED`. Complete, valid, available details lead to a readback; explicit yes commits the proposed change. Editing any appointment detail invalidates confirmation and rechecks the proposal. A yes accompanied by changed details causes a new readback rather than a premature commit. Hours/catalog/help replies preserve the pending task.

Rescheduling and cancellation operate only on appointments owned by the browser's session. When multiple appointments match, the brain asks for a unique selection using supported reference, details, or ordinal choices. Background occupancy is never caller-owned. Dates resolve in Asia/Karachi through an injectable clock; stored instants normalize to UTC. The workshop opens Monday–Saturday 09:00–18:00, with half-hour boundaries, 30- or 60-minute services, and a 14-day horizon.

SQLAlchemy transactions protect two-bay allocation. Every service segment uses the same bay; `UniqueConstraint("bay_id", "segment_start")` enforces occupancy uniqueness. Savepoints and transaction rollback preserve an existing appointment when a reschedule cannot reserve its destination. Cancellation releases the owned allocations atomically. Persisted turn IDs deduplicate requests together with their mutations; expected revisions reject stale turns, including those arriving after a session-scoped reset. Confirmation, state, mutations, and the returned trace are persisted coherently.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the decision policy, database isolation, reset semantics, speech completion/watchdog lifecycle, and deliberate limits. This design record documents source and captured rendering; it does not assert live microphone, Groq, Neon/Postgres, deployment, Docker, or accessibility-conformance verification.
