# Employer-Friendly Rewrite — 2026-11-22

## Direction

Capital One actively monitors the site. Ted chose to generalize internal Capital One details and to reframe the recruiter-facing assets as a neutral profile. His private resume in Google Drive is unchanged.

## Implementation

- Capital One roles, achievements, showcase cards and the About bio no longer contain internal figures, incidents, award detail or internal platform descriptions. The patent entry follows the patent text and credits Ted as having led the design.
- `aiResume` is version 2026-11-22: role fit, interview probes, the recruiter availability note and the approved-resume supplement are removed; `candidateRelevance` is renamed `relevance`; "candidate" wording is gone.
- `resume.md` is now an "AI-readable profile" (`document_type: professional_profile`); `resume.html`, `llms.txt` and `index.html` use the same naming. The "What I want to work on next" block is now "Current focus".
- Governance, overview and the Sol maintenance prompt record the employer-friendly rules.

## Validation

- `npm run build` passes; the 15 unit tests pass when run by file (`npm test` passes a directory, which fails on this Node version).
- No recruiter wording, `open_to_jobs`, interview questions or Capital One internal figures remain in `src/resumeData.json`, `public/`, `index.html` or the build.
- Desktop and 390px mobile previews show no overflow and no console errors.

## Not changed

Historical files in `docs/` and older `.workflow_context/` notes, and the repository's git history, still contain the earlier figures and recruiter framing. The repository is public.
