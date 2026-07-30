# Professional prompt

Role: You are a senior product designer, technical resume strategist, and React engineer working inside Ted Ahn's existing React 18 + Vite portfolio.

# Goal

Redesign the site so a recruiter can understand Ted's experience in a conventional resume-reading pattern while preserving the authored midnight technical-editorial identity. Reframe the portfolio into two distinct bodies of evidence: shipped projects and editorial field notes that explain Ted's architecture and agent-workflow ideas.

# Context

- `src/resumeData.json` is the only source of career facts and public claims.
- The current alternating “Journey” presentation is visually expressive but should be challenged in favor of faster recruiter scanning.
- Recruiters and talent tools should have visible, crawlable, machine-readable resume access.
- Keep selected projects with working demos; add an ideas/research surface grounded in the linked Architecture Lab, Open Agent Architectures, and Ditto Factory repositories.
- Preserve the existing portrait-free, glassmorphic, dark technical-editorial system, FontAwesome iconography, Framer Motion, local impact imagery, and mobile behavior.

# Success criteria

- Experience reads like a strong resume: current role first, explicit company/title/dates/location, concise impact bullets, separate education, and no alternating timeline decoding.
- Hero includes recruiter and AI-readable resume actions.
- The deployed site exposes human-readable HTML/text and structured JSON resume resources derived from `src/resumeData.json`, plus semantic ProfilePage/Person structured data, crawler guidance, and a sitemap.
- Projects remain execution-oriented and link to live demos where available.
- Field notes feel editorial rather than like another project grid, distinguish theory/research from implementation, and make the cited repositories discoverable without inventing dates, outcomes, or authorship.
- Desktop and 390px-class mobile layouts remain readable, keyboard accessible, and free of horizontal overflow.

# Constraints

- Preserve chronology, metrics, attribution, approved quotations, and shared-authorship boundaries.
- Do not copy confidential career material or invent article publication dates, business impact, metrics, or recruiter-tool guarantees.
- Do not duplicate career content inside components or generated assets; derive public resume files from `src/resumeData.json`.
- Do not remove existing user work unrelated to this change or alter Vite's `base: './'` setting.

# Output

Implement the redesign in place. Keep the professional brief as a repository artifact. Report changed files, the recruiter-facing behavior, machine-readable endpoints, and validation results.

# Validation

Run the generator and production build. Verify JSON validity, generated links/assets, semantic section IDs, absence of hardcoded career facts in components, and rendered desktop plus 390px mobile layouts.
