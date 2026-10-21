# Demonstration and rubric review

Run the local HTTP build in a separate browser profile for synthetic examples.

## Show recovered context within 30 seconds

1. Choose **Try a synthetic example**, then **Save checkpoint**.
2. Choose **Close workspace**, then **Resume workspace**. Point to the next action: run the parser on the three missing-meter rows. The student's last recorded parser check is visible; the guess that missing values mean zero remains explicitly unverified.
3. Say: “This is fictional student work. ReturnPoint recovers the student's account; it does not verify facts or browse references.” This is a product-fit hypothesis, not validated user demand.

## Continue the meaningful workflow

Close the saved tab and reopen the same HTTP address in the same profile. Recorded time and assumptions must remain unchanged. Update facts after a fictional check: “Retested missing-meter rows: they need an explicit missing-data flag.” Set the next action to “Add a missing-data flag, then rerun the three-row fixture.” Keep missing-value semantics as an unresolved question, then save. Explain that the student supplied the update.

Export a checkpoint, paste its JSON into Import, review, then save deliberately. Canceling an import leaves saved work unchanged. Try malformed JSON: it should fail without replacing anything. Edit without saving, return to the checkpoint, and recover the draft. In two tabs based on the same checkpoint, save in B then save in A: A must show conflict and retain its text. Export A, load latest, reconcile manually.

Use Tab, visible focus and Ctrl/Command+Enter to save. On mobile, read the single-column resume view. No animation is needed; reduced motion is respected. Storage failures must be visible, with export still available. See [QA evidence](evidence/QA.md) for completed checks and limitations.

## Rubric mapping

- Impact/usefulness: recover one student's interrupted analysis and show an immediate next action.
- Technical execution: conditional lock-protected saves, draft recovery copies, strict import validation, exposed failures and portable backup.
- Accessibility: semantic labels, text statuses/errors, keyboard control, readable mobile layout and no unnecessary motion.
- Originality: fresh event-period implementation, not a submitted-project fork.
- Presentation: concise before/after, synthetic content, honest limitations, AI and pre-existing-component disclosures.

The overview lists Impact and Technical Execution (duplicated); rules additionally name usefulness, accessibility, originality and presentation. No weights are invented. Requirements allow a walkthrough; a video is optional based on the reviewed sources. A complete entry would also include team/story, intended user/barrier, tools, build instructions, demo, disclosures, limitations and learning. No contest entry has been submitted for this prototype.
