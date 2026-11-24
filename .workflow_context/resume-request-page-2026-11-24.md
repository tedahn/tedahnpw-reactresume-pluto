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

## Korean / English page (2026-11-24, later)

- The request page now has Korean copy (`resumeRequest.ko`) and an EN / 한국어 switch in the header.
- Language order: `?lang=ko` or `?lang=en` in the URL, then the visitor's saved switch choice (localStorage), then `navigator.languages` (first `ko` or `en` match; otherwise English). No IP or location lookup: the browser language is more accurate (a Korean speaker abroad, a foreigner in Seoul) and needs no permission prompt or third-party service.
- The résumé language follows the page language until the visitor picks one, so it is never empty on load but stays a single choice.
- Korean text uses Noto Serif KR (Google Fonts, loaded by unicode range) behind Newsreader; Korean labels drop the monospace uppercase style.
- Tested with browser locales ko-KR, en-US, ja-JP and fr-FR, the `?lang=` override, switch persistence after reload, and that a visitor's résumé choice is not overwritten by switching the page language. Korean submit and confirmation tested with a mocked endpoint at 390px and 1280px: no overflow, no console errors.
