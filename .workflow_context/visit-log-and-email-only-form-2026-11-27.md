# Visit Log and Email-Only Request Form — 2026-11-27

## Direction

Ted asked for metrics showing when and who visits tedahn.com, and for the résumé request form to ask for the email address only.

## Visit log

- `src/lib/analytics.js` (unit-tested in `analytics.test.mjs`) sends a `view` event on load and one `leave` event with visible seconds on page when the visitor first leaves the tab. Started from `src/main.jsx` for the home page and inlined into `resume.html` by the generator. Toggled by `analytics.enabled` in `resumeData.json`; it posts to `resumeRequest.endpoint`.
- Each event carries a random visitor ID kept in localStorage, a visit number (new session after the tab closes), the page, the external referrer without its query string, `utm_*` tags or a `?ref=` tag, browser language, time zone, device type, screen size and user agent. No cookies, no IP address, no third-party service.
- Skipped: hosts other than tedahn.com, bots and headless browsers, Do Not Track and Global Privacy Control, and devices opted out with `?notrack=1` (`?notrack=0` opts back in). `localStorage['tedahn.trackdebug'] = '1'` allows other hosts for testing.
- The private Apps Script appends events to a `Visits` tab in Ted's request-log Sheet (created on first event) with per-visitor and daily caps and formula-injection protection. When a visitor requests the résumé, their visitor ID is stored with the request, and later visits from that browser show the requester's email in the "Known as" column.

## Email-only form

- `resumeRequest.fields` now has only `email`. The language cards, name, role, organization, website, phone, note and consent checkbox were removed; a short privacy notice remains. The résumé language is the page language, with a hint pointing to the EN / 한국어 switch.
- The Apps Script was updated in place (same `/exec` URL) to require only a valid email, to accept the old full payload too, and to greet without a name.

## Validation

- `npm run build` passes; all `src/lib` tests pass by file.
- Headless Chrome against a mock endpoint at 1280px (en-US) and 390px (ko-KR): view and leave events and the request payload (with visitor ID) are as expected, empty submit shows the localized error, no horizontal overflow, no console errors.
- The Apps Script logic was exercised with mocked Google services before deployment.

## Follow-up (2026-11-27, later)

- Ted asked to keep the English / 한국어 language cards so it is clear which résumé the visitor gets. They are back above the email field, pre-selected to match the page language until the visitor picks one; the hint line pointing to the page switch was removed.
- Ted asked to remove the privacy notice under the form, since it surprised visitors. The form is now the language cards, the email field and the button.
