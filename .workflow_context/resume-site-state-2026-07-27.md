# Resume Website State — 2026-07-27

This is a dated handoff snapshot. Use .project_context/resume-content-governance.md for durable rules and update or replace this file when the working state materially changes.

## Current Direction

The site uses a midnight technical-editorial visual language: deep navy surfaces, restrained teal/cyan accents, Google Sans typography, JetBrains Mono labels, glass borders, schematic background details, and editorial-scale headings.

The experience should feel authored and technical rather than like a generic SaaS portfolio. The first viewport establishes Ted as a Senior Software Engineer working across backend systems, infrastructure, and enterprise AI. The timeline then demonstrates progression and measurable impact.

## Current Content State

- The About section contains Ted's three approved quotations.
- Capital One is split into Software Engineer (May 2022 - Jul 2024) and Senior Software Engineer (Jul 2024 - Present).
- USAA remains Sep 2019 - May 2022.
- US LINE WEBTOON remains May 2017 - Dec 2017.
- SMILE is dated May 2026.
- Education chronology is UTD Computer Science in May 2019 and UT Austin AI/ML certificate in November 2025.
- Product-context links exist for USAA natural-disaster support, Auto Navigator, and the Capital One dealer platform.
- Product images are static local assets in public/images/impact/.
- Generated portraits and their stale data references have been removed.
- Internal campaign, partner, platform-count, adoption-count, and proof-of-concept validation details are intentionally absent from the public site.

## Source Reconciliation Completed

The canonical career-ops CV and supporting profile material were reconciled with Ted's approved 2026 technical resume during this session. The website received a shorter, more conservative public subset rather than a verbatim copy.

The resume PDF compresses Capital One into one Senior Software Engineer entry beginning in May 2022. Ted directly confirmed that the promotion occurred in July 2024, so the canonical CV and website intentionally preserve two roles with that promotion boundary. No source conflict remains open.

## Current Technical State

- React 18 and Vite 5
- Custom CSS in src/styles.css; no Tailwind
- Content flow: src/resumeData.json → section components
- Framer Motion for section transitions
- React Three Fiber/Three.js for atmospheric hero and section scenes
- FontAwesome for icons
- Responsive breakpoint: 768px
- Vite base: ./
- Build output: build/
- GitHub Pages deploys from main or master

## Verified on 2026-07-27

- npm run build passed.
- The three public product URLs returned HTTP 200.
- No career facts were detected outside src/resumeData.json.
- No duplicate literal section IDs were detected.
- No referenced local images were missing.
- Desktop and 390 × 844 mobile layouts were visually inspected.
- Mobile showed no horizontal overflow; impact imagery rendered correctly.

Known non-blocking warnings:

- Vite reports a large React Three Fiber bundle chunk.
- Three.js reports that THREE.Clock is deprecated in favor of THREE.Timer.
- No test runner or linter is configured.

## Repository Hygiene

The redesign and content work may be present as uncommitted changes. Preserve existing edits and inspect git status and git diff before changing files. Do not restore deleted portrait assets.

The external career-ops user-layer CV/profile files are intentionally ignored by that repository. Its updater reported a newer release during this session; updating the tool was deliberately left out of scope.

## Next-Agent Checklist

1. Read AGENTS.md, .project_context/overview.md, and .project_context/resume-content-governance.md.
2. Read this snapshot and inspect the current worktree.
3. Use the external approved resume and career-ops only when a task requires career reconciliation.
4. Keep career edits in src/resumeData.json.
5. Preserve the quotes, product links, local imagery, portrait-free direction, and midnight technical-editorial system unless Ted explicitly changes direction.
6. Run the required validation before handing off.
