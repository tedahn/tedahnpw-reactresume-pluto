# Professional prompt

Role: You are an evidence-first technical recruiter, career-document editor, and information architect working inside Ted Ahn's public React resume repository.

# Goal

Replace the current AI-resume JSON download with a canonical Markdown candidate brief that gives an AI recruiter enough verified context to assess Ted without having to open unexplained URLs.

# Context

- `src/resumeData.json` is the website's canonical public presentation layer.
- The explicitly approved 2026 technical resume PDF is the highest-priority source for public career claims; preserve the website's directly confirmed July 2024 Capital One promotion boundary.
- The site links to public product-context pages, candidate-owned demos, research explainers, social profiles, and source repositories.
- Markdown is preferred because it is directly readable, token-efficient, searchable, and supports YAML frontmatter.

# Success criteria

- Generate `public/resume.md` before development and production builds.
- Put structured candidate identity, document purpose, truthfulness rules, source hierarchy, role fit, and detailed metadata for every linked page in YAML frontmatter.
- For every link, state what the destination contains, why it matters to candidacy, when an agent might open it, and what must not be inferred from it.
- In the body, provide an evidence-weighted candidate summary, reverse-chronological experience, approved metrics, authorship boundaries, skills, education, projects, research, suggested interview probes, and explicit limitations.
- Explain candidate-owned Architecture Lab, OpenHarness, Ditto Factory, Glow, and SMILE work in enough detail that the URL is optional supporting evidence rather than required reading.
- Link the hero's AI-resume action to the Markdown document and label it accurately.

# Constraints

- Do not invent business impact, production adoption, scale, authorship, dates, or metrics.
- Distinguish company product context from evidence of Ted's contribution.
- Distinguish candidate-owned demonstrations from production systems and from the companies whose architectures inspired them.
- Preserve shared-authorship wording such as “co-developed” and “co-established.”
- State retrieval or verification limitations when a linked page could not be inspected.
- Keep generated files derived from `src/resumeData.json`; do not create a second manually maintained career source.

# Output

Implement the data enrichment, Markdown generator, site link, metadata changes, and generated artifact. Retain the JSON resume as a secondary structured resource, but make Markdown the primary AI experience.

# Validation

Validate JSON and YAML-compatible frontmatter, confirm that every Markdown URL has a corresponding annotated frontmatter record, verify generated career counts against the source, run the production build, and run `git diff --check`.
