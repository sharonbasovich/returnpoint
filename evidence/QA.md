# ReturnPoint QA and limitations

## Test environment

Tests used Node.js 22 and a Chromium-based browser over loopback HTTP. The app's Blob download was requested but a saved file was not confirmed. The visible, read-only backup text was exported, imported, reviewed and saved successfully. This provides a verified recovery path when a browser download is unavailable.

## Completed checks

- Initial 11 Node tests passed; the 1.0.1 review expanded this to 15 passing tests, including maximum escaped export size, multibyte byte bounds, and fixed-route HTTP exposure/malformed-request handling. Repeated save/reopen/update; stale and simultaneous saves; read/quota failures; missing Web Locks; malformed/schema/oversized imports; Unicode/markup; damaged existing checkpoint; interrupted write acknowledgement; unchanged recorded time/facts/assumptions on reopen; partial draft recovery. Test output: test-results.txt.
- Syntax: server.mjs, app.js and core.js passed Node checks. Build and package records accompany this file.
- Browser over loopback HTTP: synthetic capture; Ctrl+Enter save; close-workspace state; same-address reload; update facts/assumptions/next action; draft recovery in second tab; second-tab save then first-tab stale-save conflict; malformed import rejection.
- True saved-tab close and new-tab reopening: sameTime=true, sameFacts=true, sameAssumptions=true from DOM text comparisons. Reopening did not refresh a timestamp or promote assumptions.
- Export backup text -> Import -> review: all six fields matched individually. Saved the import using Ctrl+Enter. Malformed import followed by Cancel returned to unchanged saved data and cleared the error.
- Mobile viewport 390x844: single column (331px content column), document scrollWidth 375 <= viewport 390; readable captured full page; visible buttons 44px or 45.59px high. Actual mobile editing and keyboard-save flow succeeded.
- Inspected computed animation name/duration/transition duration was `none / 0s / 0s`. Explicit reduced-motion CSS disables motion. OS reduced-motion preference emulation was not run; no animation or transition is defined in the app.
- Manual reference container contains zero links. References are rendered via textContent, so supplied URLs/markup remain inert. CSP disallows outbound connections and inline scripts. No automatic browsing, tracking, credentials or accounts.
- Actual screenshots: desktop.jpg (1265px browser width, full page), mobile.jpg (390px requested viewport, full page). Both were visually inspected alongside concept.png. The concept is a generated design reference, not an app screenshot.
- Final live interface was reviewed for typography, whitespace, fact/assumption separation, next-action hierarchy, readable footer, control sizes and mobile wrapping. No clipped primary content or horizontal overflow observed.

## Design/fidelity ledger

Reference: concept.png (1536x1024 composite desktop+mobile design). Actual screens: desktop.jpg and mobile.jpg. Exact whole-composite native viewport matching is inapplicable because the concept contains two separate surfaces in one image; desktop and 390px mobile were inspected separately.

1. White background and navy system-sans hierarchy retained. Actual uses installed system fallback rather than the generated typeface.
2. Blue next-action band and one concrete action retained; revised synthetic next action shows recovered context after an honest update.
3. Facts/assumptions remain separate with an amber assumption rule. Actual uses open sections instead of four enclosing concept boxes, reducing framing.
4. Export/Import header and Update/Close actions retained. Mobile uses direct text controls instead of a concept hamburger.
5. Actual adds truthful persistence status, recorded timestamp and verification cautions required by the workflow. Above-fold copy diff: these are intentional additions; no invented metrics, testimonials or demand claims.
6. Reference notes are longer than the concept and wrap without overflow. Actual lower sections and footer stay readable on mobile.

The implementation was visually reviewed against the generated design direction with these intentional differences. Pixel-identical fidelity is not claimed.

## Remaining limits

- A saved browser-download file and round-trip from that physical file are unverified. The copyable export/import path is verified and available without relying on download support.
- Unavailable-storage and quota behavior is fault-injected in core tests, not through browser permission changes. No screen-reader, Firefox/Safari, OS reduced-motion emulation, or real user study was performed.
- Drafts may accumulate; no in-app delete/reset. There is one active checkpoint and no version archive or merge. Cancel preserves drafts; never silently resets user work.
- Verification date/evidence is manually supplied in facts text. recordedAt is a checkpoint-recording timestamp, not an app-verified time. Import preview shows original recordedAt; explicitly saving an import creates a new record of the notes.
- No contest entry has been submitted. No production hosting, accounts, telemetry or automatic reference browsing is part of this prototype.
