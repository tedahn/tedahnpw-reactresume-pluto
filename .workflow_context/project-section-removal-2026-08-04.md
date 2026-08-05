# Project Section Removal — 2026-08-04

## Direction

The public portfolio no longer includes the SMILE and Glow project showcase. The separate architecture and agent-workflow field notes remain and are presented as “Ideas” / “Personal dev logs.”

## Implementation

- `src/resumeData.json` keeps `portfolio.projects` empty and no longer includes SMILE or Glow evidence annotations.
- The work component omits empty project markup and uses standalone field-note spacing and headings.
- Navigation labels the section “Ideas” while the project collection is empty.
- Generated HTML, Markdown, text, JSON, and `llms.txt` assets omit the project entries and empty “Selected projects” headings.

## Validation

- `npm run build` passes and regenerates the public assets.
- No SMILE, Glow, or “Selected projects” text remains in `src/`, `public/`, or the production build.
- Canonical and generated project arrays are empty.
- Referenced local images exist, literal section IDs remain unique, and `git diff --check` passes.
- Desktop and mobile browser inspection was not run because the required `agent-browser` CLI is not installed.

The production build retains the known non-blocking large Three.js chunk warning.
