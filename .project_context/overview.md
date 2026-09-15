# Project overview

Ted Ahn's public professional portfolio: React 18, Vite, and GitHub Pages. The current canonical URL in the source is `https://tedahn.pw`; this redesign does not change hosting or domains.

## Purpose

Give hiring managers and engineering peers a concise account of Ted's senior backend experience, reliability work, and exploration of AI infrastructure. Preserve approved metrics, promotion boundaries, and the distinction between professional experience and personal experiments.

## September 2026 design direction

The user explicitly requested a simple, minimal redesign using a compact profile-card reference and the preceding portfolio recommendations.

- Compact identity card with initials, a small warm gradient banner, resume/email actions, and professional links.
- Desktop: profile card beside the main content, sticky only when viewport height permits. Mobile: stacked layout and disclosure navigation.
- Experience comes first; Ditto Factory and the Marketplace Matching Engine provide two implementation walkthroughs.
- Earlier experience, education, product context, project details, and skills remain available through semantic disclosure controls.
- Research notes, approved About quotations, contact, and alternate resume formats support the main narrative.
- Charcoal surfaces, warm accent, Google Sans typography, minimal decoration, visible content on initial load.
- No Three.js scenes, canvas effects, or animated scroll entrances. Reduced-motion preference disables smooth scrolling.

## Architecture

`src/resumeData.json` is the only source of career and project content. Components use data passed from `App.jsx`. CSS lives in `src/styles.css`; icons are imported explicitly.

`scripts/generate-resume-assets.mjs` generates printable HTML and machine-readable resume formats. Project evidence limits travel with those exports. `scripts/verify-portfolio.mjs` checks rendered links, IDs, resources, and current-employment metadata.

Keep the existing GitHub Pages workflow and `base: './'`. Dependency versions remain pinned by the current lockfile; unused graphics dependencies can be evaluated independently.

Career-source hierarchy, approved claims, and public-safety rules remain in `resume-content-governance.md`.
