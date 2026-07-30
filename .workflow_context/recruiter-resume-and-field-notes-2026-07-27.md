# Recruiter Resume + Field Notes — 2026-07-27

## Direction

The portfolio now separates fast recruiter scanning from deeper technical exploration. Experience uses a reverse-chronological resume layout instead of the previous watermark timeline. Work is split into inspectable projects and an editorial field-notes index for architecture and agent research.

## Implementation

- `src/resumeData.json` remains the canonical source for career facts, projects, resume resource paths, and field-note metadata.
- `scripts/generate-resume-assets.mjs` derives `resume.md`, `resume.html`, `resume.txt`, `resume.json`, `llms.txt`, `robots.txt`, and `sitemap.xml` into `public/` before development and production builds.
- `StructuredData.jsx` renders Google-compatible `ProfilePage` and `Person` JSON-LD from the same data.
- The hero links to the approved recruiter PDF and an evidence-first Markdown brief for AI recruiters; JSON remains a secondary structured resource.
- The Markdown brief includes YAML frontmatter with source hierarchy, inference rules, role fit, and detailed annotations for every linked page. Its body provides career evidence, explicit authorship boundaries, project summaries, non-claims, and interview probes so URLs are optional supporting material rather than required reading.
- The work section includes live Architecture Lab explainers and editorial links to the source repositories, Open Agent Architectures, and Ditto Factory.
- Architecture Lab now lives exclusively in the dev-log section; the project grid contains SMILE and the private Glow skincare sample.
- Glow is positioned from its private repository evidence as an applied-AI skincare journey: the live prototype is the current demonstration, while the longitudinal connection among condition history, routines, owned products, and catalog-backed recommendations is identified as the broader product thesis.
- The printable HTML resume now includes selected projects from the same canonical project data used by the portfolio, Markdown, plain-text, and JSON outputs.
- A site-wide Humanizer pass replaced abstract framing, participle-heavy resume bullets, self-explanatory phrases, and long capability lists with shorter first-person project notes and direct technical descriptions. Approved About quotations, metrics, attribution, chronology, and evidence boundaries were preserved.

## Validation

- `npm run build` passes and regenerates all resume assets.
- Generated text artifacts are written explicitly as UTF-8, normalized to LF line endings, and required to end with a newline.
- `resume.md` is ASCII-safe for encoding-agnostic AI ingestion, begins YAML frontmatter at byte zero, excludes a BOM, and fails generation when known mojibake markers are present.
- Glow's concise project summary appears in Markdown, HTML, plain-text, and JSON outputs; its deeper implementation and claim boundaries appear in the AI-recruiter Markdown evidence record.
- Visible website copy and generated recruiter assets contain no em dashes, en dashes, or prose-style double dashes. The generated AI brief still has 13 annotated evidence records and retains its ASCII-safe encoding contract.
- The humanized project cards were inspected at 1440px and 390px widths. Both layouts remain readable with no horizontal overflow. The only browser messages were the existing Three.js `THREE.Clock` deprecation warnings.
- Generated record counts match `src/resumeData.json`: 4 roles, 2 education entries, 2 projects, and 2 field notes.
- No organization or school names are hardcoded in React components.
- No duplicate literal section IDs or missing referenced local images were found.
- All four live project/demo URLs responded successfully on 2026-07-27.
- `git diff --check` passes.

## Remaining Visual Check

Automated desktop and 390px screenshots were not captured because the required `agent-browser` CLI is not installed. The source includes dedicated 900px, 768px, and 430px responsive rules; run the `test-browser` skill after installing `agent-browser` to complete the visual pass.
