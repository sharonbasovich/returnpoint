# Official requirements verified before implementation

Verified 2026-10-21 via the supported in-app browser, using visible accessibility page text. Web search/open could not access these pages; terminal HTTP failed DNS. Browser reading succeeded. No sign-in, registration, project submission, or account changes performed.

Sources:
- https://taskforge.devpost.com/ (overview)
- https://taskforge.devpost.com/rules (rules)
- https://taskforge.devpost.com/details/dates (schedule)

Overview: intended audience is students above age of majority in their country, excluding companies/professional organizations and standard excluded territories. Choose one user and productivity/access barrier, demonstrate a meaningful change. Original working prototype, complete Devpost story and team, demo or walkthrough, and code or clear build instructions. Explain problem, user, solution, tools, limitations, learnings, AI help and pre-existing work. Use permitted examples.

Visible overview rubric: Impact (usefulness/positive impact), Technical Execution (working implementation). Technical Execution is duplicated in the page. No weights displayed. Rules additionally name usefulness, accessibility, technical execution, originality and presentation. Cover all five rather than inventing weights or silently removing the discrepancy.

Rules require original work created during the event and a complete project page with demo or video. Overview explicitly allows a walkthrough. An actual video is not necessary based on these visible sources. Organizer decisions final.

Schedule page: submissions October 17 at 8:45 PM EDT to October 24 at 5 PM EDT, 2026. UTC conversion: October 18 00:45 through October 24 21:00. Toronto deadline 17:00. Winners October 28 at 9 AM EDT. The page says submissions, not a separately labeled build period; rules require creation during event period.

93 displayed participants means registered people, not teams or submissions. Registration and empty dashboard verified earlier by the parent task at 17:07 UTC; not independently rechecked here. No entry submitted.

## Product and rubric mapping

- User/barrier: student returning to an interrupted project has lost context and may mistake a guess for a checked fact. This is an unvalidated product-fit hypothesis, not interview evidence or proven demand.
- Impact/usefulness: a single checkpoint reopens to last recorded state, next action, assumptions, questions, supplied references.
- Accessibility: semantic forms, keyboard path, save shortcut, visible focus, text status and errors, mobile single-column reading, reduced-motion handling and no animation.
- Technical execution: lock-serialized conditional persistence, draft recovery, explicit read/write errors, recoverable exports/import previews, no runtime dependencies.
- Originality: fresh ReturnPoint implementation in a new folder on October 21; no submitted project forked or changed. It applies interruption recovery and epistemic separation to a single project rather than a task list.
- Presentation: synthetic scenario and reproducible walkthrough showing state recovered after closing/reopening. No claims of user validation.

## Disclosure

Codex AI assisted product scope, design, implementation, tests and documentation. Image generation supplied a design concept, not a screenshot or runtime feature. Pre-existing components: Node.js standard library, native HTML/CSS/JavaScript, browser Web Locks/localStorage/Blob APIs and system fonts; no third-party runtime packages, borrowed project code, runtime AI, automatic reference browsing, telemetry or accounts.
