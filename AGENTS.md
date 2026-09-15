# Portfolio maintenance

## Project

Ted Ahn's React 18 + Vite portfolio, deployed to GitHub Pages. `src/resumeData.json` is the source of career content, projects, and links. Never hardcode career facts in components.

Before edits, read `.project_context/overview.md`, `.project_context/resume-content-governance.md`, and the newest relevant `.workflow_context/` record. Follow `.agent/rules.md` for maintenance conventions.

## Commands

- `npm ci`: install the pinned dependency tree.
- `npm run check`: regenerate resumes and verify the rendered portfolio's core contracts.
- `npm run build`: regenerate resume assets and build into `build/`.
- `npm run dev`: development server.
- `npm run preview`: inspect the production build.

## Design

The user-requested September 2026 redesign uses a compact profile card, a restrained charcoal palette with a warm accent, and experience plus implementation evidence. It replaces the previous 3D/glass-heavy direction.

- Custom CSS and variables in `src/styles.css`; Google Sans / Google Sans Text, JetBrains Mono for metadata.
- FontAwesome icons imported by the components that use them.
- Avoid decorative canvas scenes, hidden-on-load content, and motion needed to understand the page.
- Preserve visible focus states, semantic landmarks, reduced-motion support, expandable evidence, and mobile navigation.
- Use initials unless the user supplies and approves a real portrait.

## Architecture and deployment

`App.jsx` assembles data-driven components. `scripts/generate-resume-assets.mjs` produces HTML, Markdown, text, JSON, and discovery assets from the same data. `scripts/verify-portfolio.mjs` checks actual server-rendered markup and generated resources.

GitHub Actions deploys on push to `main` or `master`. Feature PRs do not deploy. Preserve `base: './'` in `vite.config.js` unless hosting explicitly changes. The existing canonical domain remains unchanged in this redesign.

Update durable design documentation when the product direction changes; record implementation and validation status in `.workflow_context/`. Never represent source/build validation as a completed browser review.
