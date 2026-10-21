# ReturnPoint

Recover context after interrupted student project work. One checkpoint contains the last state you checked, next concrete action, unverified assumptions, questions and manually supplied references. This is an unvalidated product-fit hypothesis; all demonstration content is synthetic.

## Run

Extract the downloadable ZIP into its own folder. With Node.js 22 or newer installed, run `node server.mjs` there, then open **http://127.0.0.1:4173/** in a current browser with Web Locks. No installation, account or network service is needed. Stop with Ctrl+C. Use the same address/port/browser profile when returning; storage belongs to that origin. HTTP is required; do not use a file URL.

Development checks: `npm test`, `npm run check`, `npm run build`. Build copies the app, server, source, tests and documentation into `dist/`. Zero third-party runtime dependencies. Server binds only to loopback, serves fixed routes and has no write endpoint or outbound requests. A different PORT creates a different storage origin.

## Use and recovery

Create a checkpoint or try the synthetic example. Tab through fields; Ctrl/Command+Enter saves. Save, Close workspace, then reopen the same address to recover the next action and context. Recorded facts are explicitly the student's account, not independent app verification. Reopening preserves recorded time and every assumption. Saving records updated notes; it does not check them. Include actual verification dates/evidence in the facts field.

Edits get separate recovery drafts on each input. Returning to the checkpoint preserves unfinished edits. Recovery creates a separate copy with its original base revision. A cross-tab Web Lock serializes conditional saves; stale tabs cannot silently overwrite newer work. On conflict, export current work, load latest, and reconcile deliberately. No automatic merge.

Export before leaving important work. Export includes current editor text; incomplete edits export as recovery drafts. If a download is unavailable, copy the read-only Backup JSON into a plain text file. Repeated Export keeps that same snapshot. Paste exported JSON into Import, review, then explicitly save. Cancel import leaves the checkpoint unchanged. Imports are bounded to 512,000 UTF-8 bytes and use synchronous pasted text, so there are no asynchronous file reads to finish in the wrong order. Controls freeze while an asynchronous save waits for its lock.

Storage read/write/quota failures appear explicitly. Missing Web Locks blocks saves. Damaged stored checkpoints are left intact and block replacement. Export from outside the editor can back up damaged raw storage for manual repair. References, including links and markup, render as plain text and are never automatically opened or verified. CSP disables outbound connections and inline scripts.

## Limitations and disclosure

One active project. No accounts, cloud sync, runtime AI, telemetry, automatic browsing, hosting or task lists. Browser storage can be cleared, evicted or disabled; exports are the portable backup. Drafts can accumulate and consume quota; there is no in-app delete/reset. Browser-profile cleanup can remove drafts after exporting. Web Locks coordinates cooperating ReturnPoint tabs, not extensions or external scripts. No historical version archive. Import saving creates a new checkpoint recorded time; preview shows the original time, which also remains in the export. There is no claim that notes were reverified.

See [WALKTHROUGH.md](WALKTHROUGH.md), [requirements](evidence/requirements.md), [QA evidence](evidence/QA.md) and [source/artifact review](evidence/REVIEW.md) for verified checks and remaining limits. No user study or screen-reader certification is claimed. Version 1.0.2 is a documentation-only maintenance release; product behavior is unchanged from 1.0.1.

Fresh original implementation created October 21, 2026 in this folder. Existing submitted projects were not changed or forked. Codex AI helped scope, design, implement, test and document. Image Gen supplied the concept in `evidence/concept.png`; that concept is not an app screenshot. Pre-existing components are Node standard library, native browser HTML/CSS/JavaScript, localStorage/Web Locks/Blob APIs and system fonts. MIT licensed. No contest entry has been submitted.
