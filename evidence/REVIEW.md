# Source and artifact review

Automated source and artifact review, October 21, 2026. This is not an independent human security audit or user study. Version 1.0.2 updates documentation and version/build metadata; product code and tests are unchanged from 1.0.1.

## Boundaries and security

The Node process reads exactly four static files from public/. Routes resolve through a Map, never through a user-supplied filesystem path. Source, evidence, package metadata, arbitrary absolute paths, dot traversal, encoded traversal and prototype names are not file-serving endpoints. Request targets must be origin-form paths; malformed/absolute/network-path targets return 400 rather than crashing. Unsupported methods return 404. HEAD has no body. Query strings are not reflected in response bodies. Tests directly exercise the exported request handler, including real static asset reads; no privileged user data is read.

Checkpoint and draft data remain in the browser's origin storage. There is no upload, persistence, log, AI or data endpoint on the server. The app does not send fetch/XHR/beacon/WebSocket traffic; CSP additionally has connect-src none, form-action none, object-src none and no inline scripts. Supplied references are plain text, not link elements. Screenshots and sample data contain only the synthetic scenario.

## Correctness findings and fixes

1. The original 100,000-character import cap could reject a valid export containing maximum-length escaped control characters. Changed the bound to 512,000 UTF-8 bytes, enough for six 12,000-character fields at maximum JSON escaping. Added worst-case round-trip and multibyte-byte-bound tests. Exported incomplete drafts omit the unused base snapshot to avoid doubling backup size. Existing import formats remain compatible.
2. Returning from a recovered old draft could leave the saved-checkpoint editor based on that old draft revision. Saved raw snapshot now has separate identity; rendering saved data restores its matching revision. Draft editing still preserves its original revision, so stale saves fail safely.
3. Repeating Export from the backup panel could substitute saved data for an unsaved draft backup. It now re-downloads the exact visible backup snapshot and keeps its correct filename.
4. Malformed HTTP target parsing occurred outside the error handler. It now fails closed with 400. The server handler is exported for targeted request-boundary tests without binding a test port.

## Concurrency and recovery assessment

All cooperating tabs save under the same exclusive Web Lock, reread the current exact raw checkpoint inside the lock and compare it with the editor's base before writing. A stale base never silently overwrites the latest checkpoint. Missing locks or storage errors fail visibly. Read-after-write uncertainty does not claim success; the checkpoint may have landed and can be reread. Per-editor recovery keys are distinct; recovery copies keep the original base but use a fresh key. No automatic retries or merges occur. Pending save freezes mutation controls, and draft cleanup uses the captured saving-draft key.

Browser storage is not durable backup and can be cleared or denied. Exports offer both Blob download and visible copyable JSON. Imports are bounded, validated, synchronous paste previews; a later selection cannot be superseded by an older asynchronous file read because no such file-read operation exists. Cancel retains saved data and draft recovery. No delete/reset is implemented.

Recorded facts are the user's report, not app verification. Reopen reads the original timestamp; it never refreshes it or promotes assumptions. Explicitly saving an update/import records a new account and warns that it is not fresh verification. Verification dates/evidence belong in the manually supplied facts.

## Artifact review

The build uses an explicit file allowlist; no browser-local storage, credentials, unrelated files, .git, environment files or user downloads are included. Runtime dependencies: zero. MIT license and AI/pre-existing-component disclosures are included. A per-file SHA-256 manifest and ZIP integrity check accompany the package. The release ZIP checksum is supplied separately to avoid a self-referential hash. Existing released ZIPs are not modified.

Tests: 15 source tests and syntax checks pass, including maximum-export/import and HTTP-boundary cases. Browser regression checks passed: repeated exports preserved the same unsaved backup snapshot; canceling edits restored the saved action; returning to the saved editor and saving succeeded. See test/build logs for output. Screenshots show the unchanged product layout. Other browser evidence and remaining limitations are in QA.md. No screen-reader, cross-browser or user-validation claim is made.
