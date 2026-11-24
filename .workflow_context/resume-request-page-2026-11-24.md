# Résumé Request Page — 2026-11-24

## Direction

Ted asked for `resume.html` to stop showing his experience and become a page that matches the home page with only the request form, so the only way to get the résumé is the form and an approved email. He also asked for the UI to look good.

## Implementation

- `scripts/generate-resume-assets.mjs` now builds `resume.html` as a standalone Ink & Sea-glass page: header (node mark, Home, LinkedIn, GitHub), a small photo ring, eyebrow, heading and intro, the node ornament, and the form in a panel. On success the form is replaced by a "Request received" confirmation.
- Language is chosen with two large choice cards (English / 한국어); nothing is pre-selected. Required fields show a red border and a summary message only after a submit attempt, and the message clears once the form is valid.
- The LinkedIn/website field is plain text with a URL keyboard, so `linkedin.com/in/…` is accepted; the Apps Script adds `https://`.
- Removed `public/resume.md`, `resume.json` and `resume.txt`, the `<link rel="alternate">` tags in `index.html`, and the footer links to them. The footer now links to the request page. `llms.txt` and `sitemap.xml` list only the home page and the request page.
- New copy keys in `resumeRequest`: `eyebrow`, `pageDescription`, `successHeading`, `invalid`, `noscript`, and a `hint` per language. `main.resumeResources` now has only `request`.

## Validation

- `npm run build` passes; unit tests pass when run by file.
- Tested with a mocked endpoint at 1280px and 390px: empty submit is blocked and highlighted, a filled form posts the expected payload and shows the confirmation, no horizontal overflow, no console errors. `/resume.md`, `/resume.json` and `/resume.txt` return 404 locally.

## Note

Copies of the old résumé files may persist in search-engine caches or web archives for a while after removal.
