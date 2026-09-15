# Ted Ahn — engineering portfolio

A compact portfolio presenting backend experience, cloud reliability, and personal AI infrastructure experiments. Built with React 18 and Vite; published through the existing GitHub Pages workflow.

## Experience

- Compact profile with resume, email, GitHub, and LinkedIn actions.
- Reverse-chronological experience with product context and separate education.
- Two selected projects with expandable engineering walkthroughs and evidence limits.
- Architecture notes, evaluation research, and accessible resume formats.
- Responsive custom CSS, semantic disclosure controls, and keyboard navigation.

## Run locally

```sh
npm ci
npm run dev
```

## Validate and build

```sh
npm run check
npm run build
npm run preview
```

The check renders the React application and validates resume links, section anchors, local assets, project evidence, and structured employment data. It does not replace desktop/mobile browser review. Production output goes to `build/`.

## Content and maintenance

- `src/resumeData.json`: career content, projects, links, and resume metadata.
- `src/Components/`: presentation components.
- `src/styles.css`: design tokens and responsive styles.
- `scripts/generate-resume-assets.mjs`: printable HTML, text, JSON, and Markdown exports.
- `docs/plans/2026-09-15-minimal-portfolio.md`: implementation plan and visual review checklist.
- `AGENTS.md` and `.project_context/`: maintenance and content governance.

Career results belong to Ted; personal project evidence is labeled separately from professional experience. Review and replace personal information before adapting this portfolio.
