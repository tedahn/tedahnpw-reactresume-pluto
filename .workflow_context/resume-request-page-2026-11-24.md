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

## Whole site in Korean (2026-11-24, later)

- Ted asked for the language switch to cover the whole site. `src/lib/i18n.js` (tested) detects the language and applies the Korean overlay; `App.jsx` holds the language in state and passes interface labels to each section. The header has the EN / 한국어 switch; the choice is saved as `localStorage.siteLang` and shared with `resume.html`.
- Korean copy is a direct translation of the current public English. Company and product names, people's names and the `1M SMS/hr` figure stay in English. Dates read `2024 — 현재`.
- `index.html` metadata and structured data stay English for search engines; `document.title` and `<html lang>` change at runtime.
- Tested: ko-KR and en-US browsers at 390px and 1280px (all section labels, dates, no overflow, no console errors), switching on the home page carries over to the résumé page and back.

## Korean copy review (2026-11-24, later)

Reviewed every Korean string against the English for meaning, natural phrasing and a Korean professional audience. Changes: bio restructured into natural Korean ("…를 개발하는 백엔드 엔지니어입니다"), the patent line says the technology was co-invented and registered as a Capital One patent (a patent is not itself "invented"), UT Austin reads as a completed course (수료), Webtoon reads "미국 법인 첫 소프트웨어 엔지니어" (not "America's first"), consent uses the standard Korean "개인정보 수집·이용에 동의합니다" with "제3자에게 제공되지 않습니다", the request intro's subject is fixed, and product/tech terms follow Korean developer usage (Kubernetes, WAL(Write-Ahead Log), Steam 마켓 방식). No claims, figures or names were added.

## Korean audience context (2026-11-24, later)

Ted approved adding context that Korean recruiters lack. Korean only: one-line company descriptions under the most recent role at Capital One (미국 대형 은행지주회사 · 신용카드·오토론·리테일뱅킹) and USAA (미군과 가족을 위한 미국 은행·보험 금융그룹), rendered by a new optional `context` field in `Experience.jsx` (shown once per company); Auto Navigator explained as 차량 검색·오토론 사전심사·딜러 연결 서비스; severe-weather alerts framed as emergency alerts to members during storms and disasters; schools as 텍사스대학교 댈러스/오스틴; location as 미국 텍사스 댈러스; and a 미국 금융권 7년+ framing line in the bio. Webtoon is shown as 네이버웹툰 미국 법인 at Ted's request. Company and product descriptions were checked against public sources (Capital One and Apple App Store for Auto Navigator; Korea Times and Naver for WEBTOON Entertainment as Naver Webtoon's US headquarters). Governance now allows this kind of public context in Korean only; no internal figures or new claims.

## Korean name (2026-11-24, later)

At Ted's suggestion the Korean site uses his Korean name: the hero shows 안형근 with "Ted Ahn" underneath (`ko.main.name` / `ko.main.nameSecondary`), and the footer, page titles and the résumé page's privacy line use 안형근. Structured data now lists 안형근 as an alternate name. English is unchanged.

## Korean copy tightened (2026-11-25)

Ted asked whether the Korean read as over-translated or wordy. It did in the places where Korean-audience context was added: the bio and two role summaries were as long as or longer than the English, although Korean normally runs about 60% of English character length. Tightened: the bio (no repeated Capital One, patent phrased as "특허의 공동 발명자", school names without doubled English), USAA and Auto Navigator summaries, the vehicle and alerting cards (severe-weather alerting now "재난 알림"), and the patent summary. Company descriptor lines are unchanged.
