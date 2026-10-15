# Professional Redesign — 2026-10-14

## Direction

Step 2 of 2 after the October 2026 content sync. The site moves from the glass/3D "Midnight Technical Editorial" look to **Ink & Sea-glass**, a quiet professional page modelled on the structure of thariq.io's professional mode but in Ted's own identity. Spec: `docs/superpowers/specs/2026-10-14-professional-redesign-design.md`. Plan: `docs/superpowers/plans/2026-10-14-professional-redesign.md`.

Decisions Ted made: professional mode only; a real photo (reverses the portrait-free rule); sea-glass teal accent; the three About quotations retired; Built at Work and Tinkering at Home as separate sections; LINE WEBTOON kept.

## Implementation

- `src/lib/inlineFormat.js` (`**bold**` / `` `figure` `` tokens) and `src/lib/dates.js` (`yearRange`, `byStartDesc`), with 11 `node --test` tests (`npm test`).
- `resumeData.json` additions: `main.photo`, `roleLine`, `professionalBio`, social `label`s, `work[].summary`, `portfolio.showcase.{work,home}`, and `fieldNotes[].year`. `main.bio` is now one line; `contactmessage` is the availability line.
- New components: Header, Hero, About, Experience, Showcase, Inline, Reveal, Ornament, Footer. Deleted: HeroScene, Scene3D, SectionShapes, Navigation, Work, Contact, Social, AnimatedSection, icons.js.
- Removed three.js, React Three Fiber, drei, Framer Motion, and FontAwesome; the runtime dependencies are now `react` and `react-dom`.
- Resized assets: `ted-ahn-336.jpg` (21 KB), `usaa-disaster-640.jpg` (72 KB), `navigator-dealer-640.jpg` (67 KB).
- The rule docs (CLAUDE.md, AGENTS.md, .agent/rules.md, overview.md, governance) now describe Ink & Sea-glass, the photo approval, and the retired quotations.

## Validation

- `npm test`: 11/11 pass. `npm run build` passes; JS is 180.11 kB (about 1.25 MB before) with no chunk-size warning.
- Production preview, desktop: 4 sections; 6 cards, all linked, with correct tags; roles newest-first (`2024 — now`, `2022 — 2024`, `2019 — 2022`, `2017`); Cormorant, EB Garamond, and JetBrains Mono loaded; no broken images, no duplicate IDs, no console errors.
- 390×844: no horizontal overflow, the header fits on one line, role dates wrap without overlapping titles, and cards are one per row.
- Reduced motion could not be emulated in the browser pane. Instead, verified that every `.reveal` ends visible after scrolling and that the reduced-motion override ships in the built CSS.
- Leak scan: no revenue figures, partner names, award name, AI-enablement metrics, `tedahn.pw`, or retired quotations in `src/`, `public/`, `build/`, or the rule docs (the governance note recording the 3M/4M discrepancy is intentional). No career facts are hardcoded in components.
