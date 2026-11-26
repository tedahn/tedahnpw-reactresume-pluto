# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website for Ted Ahn at [tedahn.com](https://www.tedahn.com). React 18 + Vite, deployed to GitHub Pages. All content is driven by `src/resumeData.json` — never hardcode content in components.

## Required Context

Before changing the site, read:

- .project_context/overview.md — long-lived product and design direction
- .project_context/resume-content-governance.md — career-source hierarchy, approved public narrative, and public-safety rules
- The newest relevant file in .workflow_context/ — dated implementation and validation state

For a reusable GPT Sol task brief, see docs/sol-resume-site-maintenance-prompt.md.

## Commands

```bash
npm run dev      # Start dev server (auto-opens browser, port 5173)
npm run build    # Production build → build/ directory
npm run preview  # Preview production build locally
npm test         # node --test src/lib/ (pure-logic unit tests)
```

No linter is configured.

## Architecture

**Data flow:** `src/resumeData.json` → components read JSON props → rendered sections

**Key files:**
- `src/App.jsx` — Root layout: Header, Hero, About, Experience, Professional Projects, Independent Projects, Footer
- `src/resumeData.json` — Single source of truth for all content (bio, experience, education, showcase, field notes, social links)
- `src/styles.css` — All styles in one file, CSS custom properties for theming
- `src/lib/` — Pure logic with `node --test` tests (`inlineFormat.js`, `dates.js`, `i18n.js`)
- **Korean / English**: the whole site switches language. English is the source; Korean lives in `resumeData.json` under `ko` (overlays keyed by role `company | dates`, card title, patent number and note title) plus `ui` / `ko.ui` for interface labels, and `resumeRequest.ko` for the request page. `src/lib/i18n.js` picks the language: `?lang=` link, then the saved EN / 한국어 switch choice (`localStorage.siteLang`, shared with `resume.html`), then the browser's preferred language. When you change English copy, update the Korean overlay in the same change.
- `src/Components/` — All UI components
- `src/lib/analytics.js` — First-party visit log (tested). Sends a page view and time on page to the same private Apps Script as the request form, which appends them to the Visits tab of Ted's private Sheet. No cookies, IP addresses or third-party scripts; skips bots, Do Not Track / Global Privacy Control, and devices opted out with `?notrack=1`. Only runs on tedahn.com. Inlined into `resume.html` by the generator, so keep it import-free.
- `scripts/generate-resume-assets.mjs` — Builds `public/resume.html` (the résumé request form page, styled to match the home page), `llms.txt`, `sitemap.xml`, `robots.txt` from the JSON (runs before dev/build). The résumé itself is never published on the site; it is only emailed after Ted approves a request.

**Components:**
- `Header.jsx` — Node mark, Résumé (request page) / GitHub / LinkedIn text links, and the EN / 한국어 switch
- `Hero.jsx` — Photo ring, name, monospace role line
- `About.jsx` — `main.professionalBio` paragraphs and status line
- `Experience.jsx` — Reverse-chronological roles via `src/lib/dates.js`
- `Showcase.jsx` — Card grid used for "Professional Projects" and "Independent Projects" (with field notes)
- `Inline.jsx` — Renders `**bold**` and `` `figure` `` markup from `src/lib/inlineFormat.js`
- `Reveal.jsx` — IntersectionObserver fade-in, disabled for reduced motion
- `Ornament.jsx`, `Footer.jsx`, `StructuredData.jsx`

**Responsive breakpoints:** 768px single column (`@media screen and (max-width: 768px)`); cards go 3 → 2 at 900px and → 1 at 560px.

## Design Rules ("Ink & Sea-glass")

- **Dark only**: ink `#121a26`, panels `#18212f`, cream text `#f4f0e6`, accent sea-glass teal `#6fc3b2`; use the CSS variables in `:root` of `styles.css`.
- **Typography**: Newsreader (an optical-size serif built for screen reading) for name, headings and body; JetBrains Mono for dates and figures.
- **Signature**: node-and-edge ornament between sections; metrics in teal monospace via `` `figure` `` markup.
- **Motion**: CSS-only: a slow (18s) rotating arc on the hero photo ring, section fade, and card lift; nothing animates under `prefers-reduced-motion`. No three.js, Framer Motion, or particle effects.
- **Icons**: none — use text links. No emoji.
- **Styling**: Custom CSS only (not Tailwind), in a single `styles.css`.
- **Spec**: `docs/superpowers/specs/2026-10-14-professional-redesign-design.md`.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys on push to `main` or `master`:
1. `npm ci` → `npm run build` → deploys `build/` to `gh-pages` branch

**Do not** change `base: './'` in `vite.config.js` unless the hosting setup changes.

## Project Context

`.project_context/overview.md` is the long-living project vision document. Only update it if fundamental architecture or business goals change. `.agent/rules.md` contains additional development guidelines.
