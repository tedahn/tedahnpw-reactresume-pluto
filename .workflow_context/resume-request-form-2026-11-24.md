# Résumé Request Form — 2026-11-24

## Direction

Ted asked for a way for visitors to request his résumé by email, choosing English or Korean (one per request), while keeping a private record of who asked (name, email, role, organization or institution, LinkedIn or website, optional phone and note).

## Implementation

- `src/resumeData.json` has a new `resumeRequest` block holding all form copy and the `endpoint` URL. While `endpoint` is empty, no form is rendered.
- `scripts/generate-resume-assets.mjs` renders the form at the end of `resume.html` (after Core skills) and adds an action link to it. Plain HTML and a small inline script; no new dependencies. The form is hidden in print.
- Submissions POST JSON as `text/plain` (no CORS preflight) to a Google Apps Script web app owned by Ted. The script logs each request to a private Google Sheet and emails Ted a notification. Nothing goes to the requester until Ted approves. It includes a honeypot field, a consent check, a per-address cooldown, a daily send cap, and protection against spreadsheet formula injection.
- The Apps Script source and the request log live in Ted's private Google Drive, not in this public repository.

## Public-safety boundary

- Nothing is sent automatically. For each request Ted chooses the public résumé, the fuller one, or to decline. Single-use approval links in his private notification email carry out the choice.
- The public PDFs follow the approved public narrative in `resume-content-governance.md`: no internal figures, revenue, partner names, award names, or system counts. Fuller résumés live only in Ted's private Drive.
- Form copy stays neutral (no recruiter or job-search wording).

## Validation

- `npm run build` passes; unit tests pass when run by file.
- Tested against a local mock endpoint at 1280px and 390px: submissions send the expected payload, an empty submit is blocked by browser validation, there is no horizontal overflow, and there are no console errors other than a missing favicon on the test server.

## Live

Deployed 2026-11-24 as a web app (Execute as: Me; access: Anyone). The `/exec` URL is in `resumeRequest.endpoint`. A live end-to-end test sent both PDFs and logged a row.

## Manual approval (2026-11-24, later)

Ted switched the flow from auto-send to manual approval and made the language a required single choice ("both" is rejected). The form copy now says Ted reviews each request. The same `/exec` URL is kept, and the new script version replaced the old one in place.
