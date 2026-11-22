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

## Webtoon entry (same day)

Ted asked to add his Webtoon contributions softly, since Webtoon may also watch the site. The entry now reads: first US software engineering intern; built an early data-analysis pipeline and an internal engagement dashboard, and explored how to help readers discover titles (folded into the data-analysis bullet rather than a separate recommendation-prototype item). The internal dashboard name, data details, tool names and any claims about founding the data team or internship program are deliberately left out. USAA is unchanged.

Main page versus resume: the main-page Experience line shows only `summary` ("First US software engineering intern; early data-analysis work."); the generated resume files carry both achievement bullets.

## USAA light touch (same day)

The USAA entry keeps the 1M SMS/hour figure but drops "USAA's first", the 35-year-old system and the proofs-of-concept and security-patch detail. Main page: Experience line and project card updated; the About bio is unchanged. Resume files: "Life-Safety Messaging at Scale" and "Legacy Modernization".

## Webtoon correction (same day)

Ted clarified that he was Webtoon's first intern of any kind and its first software engineer in the US. The main-page line now reads "First US intern and first US software engineer; early data-analysis work." and the first bullet is "First US Intern and Engineer".
