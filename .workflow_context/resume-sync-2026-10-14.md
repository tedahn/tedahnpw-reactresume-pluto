# Resume Content Sync — 2026-10-14

## Direction

The public portfolio is synced to Ted's October 2026 resume. This is step 1 of 2: content first, with a visual and UX redesign to follow as a separate effort.

## Implementation

- The Capital One Senior Software Engineer entry is relabelled “Marketing Platform & Reliability” and carries four achievements: Marketing Platform Redesign, Dealer Marketing Capability, Digital Marketing Pilots, and Architecture and SRE Leadership.
- The Capital One Software Engineer entry gains a Dealer Data Consolidation achievement, and the patented Auto Navigator pipeline figure moves to 4M+ vehicle records per day.
- The AI-assisted-engineering achievement is removed, along with its AI-brief supplement and interview probe.
- The AI brief is bumped to version 2026-10-14 with new supplements and probes, and the marketing-pilot partner name is removed from it.
- The canonical domain moves to `www.tedahn.com` across `src/resumeData.json`, `index.html`, `CLAUDE.md`, `AGENTS.md`, `.project_context/overview.md`, and the generated `llms.txt`, `sitemap.xml`, and `robots.txt`.
- `.project_context/resume-content-governance.md` names the October 2026 resume as the approved source, updates the approved public narrative, and records the withheld-by-decision rules.

## Validation

- `src/resumeData.json` parses, and `npm run build` passes and regenerates the public assets.
- No 3M+ figures, `tedahn.pw` references, revenue figures, pilot partner names, award proper names, or AI-enablement metrics remain in `src/resumeData.json`, `public/`, `index.html`, or the production build. The governance note's deliberate 3M/4M discrepancy record is the only 3M+ mention.
- All four generated `resume.*` assets contain 4M+, Dealer Data Consolidation, and Marketing Platform Redesign; `sitemap.xml` and `robots.txt` use `https://www.tedahn.com`.
- No career facts are hardcoded in `src/Components/`, and section IDs remain unique.
- Desktop and 390px mobile browser checks of the production preview show the new achievements and the Navigator dealer impact card, with no horizontal overflow and no console errors.

The production build retains the known non-blocking large Three.js chunk warning.
