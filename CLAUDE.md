# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website for Ted Ahn at [tedahn.pw](https://tedahn.pw). React 18 + Vite, deployed to GitHub Pages. All content is driven by `src/resumeData.json` — never hardcode content in components.

## Commands

```bash
npm run dev      # Start dev server (auto-opens browser, port 5173)
npm run build    # Production build → build/ directory
npm run preview  # Preview production build locally
```

No test runner is configured. No linter is configured.

## Architecture

**Data flow:** `src/resumeData.json` → components read JSON props → rendered sections

**Key files:**
- `src/App.jsx` — Root layout, scroll-spy logic for active nav section
- `src/resumeData.json` — Single source of truth for all content (bio, experience, education, projects, social links)
- `src/styles.css` — All styles in one file, CSS custom properties for theming
- `src/icons.js` — FontAwesome library initialization (import icons here)
- `src/Components/` — All UI components

**Components:**
- `Experience.jsx` — Merges work + education arrays, sorts chronologically via custom date parser (handles iOS date quirks). Alternating left/right timeline on desktop, linear on mobile.
- `Work.jsx` — Portfolio grid with dynamic icon mapping for tech tools (special cases for ML tools like pandas → chart-line, tensorflow → brain)
- `ParticleBackground.jsx` — Canvas-based animated particle effect
- `AnimatedSection.jsx` — Framer Motion wrapper (useInView, triggers at 10% visibility, once)
- `Navigation.jsx` — Fixed glassmorphic header, hamburger menu on mobile

**Responsive breakpoint:** 768px (`@media screen and (max-width: 768px)`)

## Design Rules

- **Glassmorphism** is mandatory: `backdrop-filter: blur()`, transparent backgrounds, glass borders
- **Dark mode only**: background `#0f172a`, use CSS variables defined in `:root` of `styles.css`
- **Typography**: Always use 'Google Sans' / 'Google Sans Text' fonts
- **Icons**: FontAwesome via `@fortawesome/react-fontawesome` — no emoji, no other icon libraries
- **Styling**: Custom CSS only (not Tailwind). Maintain the existing CSS custom property system.
- **Animations**: Framer Motion for scroll-triggered entrance animations

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys on push to `main` or `master`:
1. `npm ci` → `npm run build` → deploys `build/` to `gh-pages` branch

**Do not** change `base: './'` in `vite.config.js` unless the hosting setup changes.

## Project Context

`.project_context/overview.md` is the long-living project vision document. Only update it if fundamental architecture or business goals change. `.agent/rules.md` contains additional development guidelines.
