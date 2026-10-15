# Professional Redesign — Design Spec

**Date:** 2026-10-14 · **Status:** Approved in conversation, pending written-spec review · **Branch:** `content/resume-sync-2026-10` (content sync committed as `f034086`)

## 1. Intent

| | |
|---|---|
| **Site goal (next 12 months)** | Ted is employed and not searching, but wants to be easy to say yes to: a credible résumé in seconds, plus visible ongoing work. |
| **Brand** | *The reliable builder.* Production systems that don't break lead; personal architecture research supports. |
| **Primary readers** | Recruiters and hiring managers (fast scan), senior engineers (depth), AI recruiters (machine-readable résumé assets). |
| **Success** | Seniority and proof are clear in the first viewport, and work and personal projects are distinct. Fewer, quieter design decisions than the five previous redesigns, so this one lasts. |

**Reference:** the structure and feel of [thariq.io professional mode](https://www.thariq.io/?mode=professional), adapted into Ted's own identity. The accent colour, ornament, monospace data treatment, and all content are Ted's. Do not copy its brass palette, concentric-circle ornament, or card corner marks.
**Approved mockup:** `.superpowers/brainstorm/691-1792036861/content/ted-professional-v4.html` (local, git-ignored).

## 2. Decisions made with Ted (2026-10-14)

1. **Professional mode only.** No Personal mode and no light theme.
2. **Use a real photo of Ted** (`public/images/tedprofile/tedahnprofile.png`). This reverses the previous portrait-free rule; generated portraits remain banned.
3. **Accent is sea-glass teal** `#6fc3b2`.
4. **Retire all three About quotations.** The bio replaces them.
5. **Separate sections for work and home:** "Built at Work" (enterprise systems) and "Tinkering at Home" (personal labs), with field notes folded into the latter.
6. **Keep the LINE WEBTOON internship** in Experience (decided in the content sync).
7. **Public-safety rules from the content sync stand:** no revenue figures, pilot partner names, award proper name, or AI-enablement metrics.

## 3. Approach

Rebuild the presentation layer in place, keeping React 18 + Vite, `src/resumeData.json` as the only content source, `scripts/generate-resume-assets.mjs`, `StructuredData.jsx`, `base: './'`, and the GitHub Pages workflow.

Rejected alternatives: **Astro** (it ships less JavaScript but means a build and deploy migration for a single page); **CSS-only restyle** (it cannot produce the new layout).

## 4. Page structure

One page, max content width about 760px, centred.

| # | Section | Content | Data source |
|---|---|---|---|
| 1 | **Header** | "Ted Ahn" (left) · Résumé → `/resume.html`, GitHub, LinkedIn (right). Text links, no icons. | `main.name`, `main.resumeResources.printable`, `main.social` |
| 2 | **Hero** | Photo in a 168px teal ring · name in display serif · monospace role line: *Senior Software Engineer · **Capital One** · Dallas–Fort Worth* | `main.photo`, `main.name`, `main.roleLine` |
| 3 | **About** | Two short paragraphs with the proof bolded inline, then a muted status line. | `main.professionalBio[]`, `main.contactmessage` |
| — | ornament | | |
| 4 | **Experience** | One row per role: title · company, right-aligned monospace dates, one-line summary with figures in teal monospace. Four rows: Capital One Senior SWE, Capital One SWE, USAA, LINE WEBTOON. | `resume.work[]` + new `summary` |
| — | ornament | | |
| 5 | **Built at Work** | Three cards: Vehicle Data Pipeline (*Patented*), Severe-Weather Alerting (*In production*), Dealer Marketing (*In production*). Product images from `public/images/impact/`. Each links to its public product-context page. | `portfolio.showcase.work[]` |
| — | ornament | | |
| 6 | **Tinkering at Home** | Three cards: Per-Shot Encoding, Marketplace Engine, Ditto Factory (*Lab*), each with a small teal line drawing. Below them, a short dated "notes" list of the field-note write-ups. | `portfolio.showcase.home[]`, `portfolio.fieldNotes[]` |
| 7 | **Footer** | Email · "Résumé for AI (.md) · JSON · TXT" · © year | `main.email`, `main.resumeResources` |

Each section uses a two-column grid (150px label left, content right) that collapses to label-above-content at ≤768px. Résumé and asset links use relative paths (`resume.html`), matching Vite's `base: './'`.

## 5. Design language ("Ink & Sea-glass")

### Tokens (replace the `:root` set in `src/styles.css`)

| Token | Value | Use |
|---|---|---|
| `--ink` | `#121a26` | page background |
| `--panel` | `#18212f` | cards |
| `--cream` | `#f4f0e6` | primary text and headings |
| `--muted` | `#b4ab97` | dates, metadata, status line |
| `--body-2` | `#cfc8b8` | secondary body (summaries, card text) |
| `--rule` | `#263142` | hairlines, footer rule |
| `--acc` | `#6fc3b2` | accent: ring, ornament, figures, link hover |
| `--acc-soft` | `rgba(111,195,178,.22)` | card borders, glows |
| tag: patented | `--acc` text and border | |
| tag: production | `#86c99a` / `#4f8a62` | |
| tag: lab | `#9fb4d8` / `#56688c` | |

Contrast on `--ink`: cream ≈ 15:1, muted ≈ 7.5:1, accent ≈ 8.5:1 (all AA or better for body text).

### Typography (Google Fonts, `display=swap`, loaded from `index.html`)

| Role | Font | Size / line-height / weight |
|---|---|---|
| Name (h1) | Cormorant Garamond | 52px / 1.05 / 600, letter-spacing 1.2px (38px on mobile) |
| Section labels | Cormorant Garamond | 26px / 1.2 / 600 |
| Card titles | Cormorant Garamond | 20px / 1.15 / 600 |
| Body | EB Garamond | 20px / 1.9 / 400; bold is 600 in `#fff` (18px on mobile) |
| Secondary | EB Garamond | 15–16px / 1.5 |
| Data (dates, figures, role line, tags) | JetBrains Mono | 12–13px; role line uppercase, +0.08em tracking |

### Signature elements
- **Ornament:** a 4-node, 3-edge glyph (inline SVG in `--acc`) between 80px gradient hairlines. It is Ted's mark, used only as the section divider.
- **Figures in monospace teal:** wherever a summary contains a metric, it renders in mono `--acc`. This is how "the reliable builder" shows up visually.
- **Cards:** `--panel`, 2px `--acc-soft` border, radius 8px, soft accent shadow, image 112px high, a 1px hover lift. Three across on desktop, two at ≤900px, one at ≤560px.

### Motion
CSS only: a 300ms fade and 8px rise on section entry, triggered once by `IntersectionObserver`, and a card hover lift. All motion is disabled under `prefers-reduced-motion`. No three.js, Framer Motion, or particles.

## 6. Data model changes (`src/resumeData.json`, additive)

Existing fields stay because the generator and `StructuredData` read them. Changes:

```jsonc
"main": {
  "photo": { "src": "images/tedprofile/ted-ahn-336.jpg", "alt": "Ted Ahn" },   // new
  "roleLine": "Senior Software Engineer · **Capital One** · Dallas–Fort Worth", // new
  "professionalBio": [                                                           // new, replaces quotes on screen
    "Backend engineer building systems that have to stay up. At Capital One I designed and **patented an event-driven pipeline that moves 4M+ vehicle records a day**, and **retired 4 of the 7 legacy systems** it replaced.",
    "Before that, at USAA, I built **the alerting platform that sends 1M SMS an hour** when severe weather hits. CS at UT Dallas; AI/ML postgraduate certificate from UT Austin."
  ],
  "bio": "…"            // quotes removed; becomes a one-line plain bio for generated assets
},
"resume.work[i].summary": "Patented vehicle-data pipeline, `4M+/day`; dealer data from `17,000+` dealerships.",  // new per role
"portfolio": {
  "showcase": {                                                                  // new
    "work": [ { "title", "summary", "tag": "patented|production|lab", "image"?, "glyph"?: "curve|ring|flow", "url"?, "linkLabel"? } ],
    "home": [ … same shape … ]
  },
  "fieldNotes": [ … unchanged … ],
  "projects": []        // unchanged (kept empty)
}
```

**Inline markup:** `**bold**` renders as `<strong>`, and `` `figure` `` renders as a mono accent `<span>`. Parse with a tiny pure function `src/lib/inlineFormat.js` that returns React nodes. No `dangerouslySetInnerHTML` and no Markdown library.

**Draft copy is not final:** Ted approves the wording of every bio sentence, role summary, and card summary during implementation, and each is checked against the approved résumé and governance.

## 7. Components

| New / changed | Responsibility |
|---|---|
| `App.jsx` | Composes the sections; scroll-spy removed (the header has no in-page nav). |
| `Header.jsx` (new; replaces `Navigation.jsx`) | Name and three text links. |
| `Hero.jsx` (rewritten) | Photo ring, name, role line. |
| `About.jsx` (rewritten) | `professionalBio` paragraphs and status line. |
| `Experience.jsx` (rewritten) | Reverse-chronological role rows; education no longer interleaved. |
| `Showcase.jsx` (new; replaces `Work.jsx`) | One component used twice (`work`, `home`); renders cards, and for `home` also the notes list. |
| `Ornament.jsx` (new) | The node-and-edge divider. |
| `Footer.jsx` (new; replaces `Contact.jsx` and `Social.jsx`) | Email, résumé-asset links, copyright. |
| `Reveal.jsx` (new; replaces `AnimatedSection.jsx`) | IntersectionObserver fade with a reduced-motion bypass. |
| `StructuredData.jsx` | Unchanged except `hasPart` also includes `showcase.home` items. |
| `src/lib/inlineFormat.js` (new) | `**bold**` and `` `figure` `` parser. |
| **Deleted** | `HeroScene.jsx`, `Scene3D.jsx`, `SectionShapes.jsx`, `Navigation.jsx`, `Work.jsx`, `Contact.jsx`, `Social.jsx`, `AnimatedSection.jsx` |
| **Dependencies removed** | `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`; FontAwesome too if no icon remains in use. |

`src/styles.css` is rewritten around the new tokens, keeping the single-file custom-CSS convention and the 768px breakpoint.

## 8. Assets and performance

- **Photo:** export `tedahnprofile.png` (800², 117 KB) to `public/images/tedprofile/ted-ahn-336.jpg` (2× for 168px; target <40 KB). The original stays in place.
- **Card images:** resize `usaa-disaster.jpg` (480 KB) and `navigator-dealer.jpg` (322 KB) to 640px wide, targeting <80 KB each, with `loading="lazy"`, explicit `width`/`height`, and meaningful `alt`.
- **Budget:** the JS bundle should drop from about 1.25 MB to under 200 KB, and the large-chunk build warning should disappear.

## 9. Accessibility and responsive

- Keep the skip link, `<header>/<main>/<footer>` landmarks, one `h1`, section `h2`s (visually the Cormorant labels), and visible teal focus rings.
- Cards are links only when they have a `url`, with the whole card as one link target and the "↗" external indicator. External links get `rel="noopener"`.
- Mobile (≤768px): single column, labels stacked, h1 38px, body 18px, cards one per row at ≤560px, no horizontal overflow at 390px.

## 10. Testing and verification

- **Unit test** for `inlineFormat` covering bold, figure, mixed, unmatched markers, and empty input, using Node's built-in runner: add `"test": "node --test"` with `src/lib/inlineFormat.test.mjs`. No new dependencies.
- `npm run build` passes, the regenerated `public/resume.*` assets are unchanged except for intended differences, and the chunk-size warning is gone.
- **Public-safety leak scan** (from the content sync) over `src/`, `public/` and `build/`.
- No career facts are hardcoded in `src/Components/`, IDs are unique, and every referenced image exists.
- **Browser checks** at desktop and 390×844: every section renders, the photo loads, card links work, there are no console errors, and reduced-motion is respected.

## 11. Documentation updates

- `CLAUDE.md`, `AGENTS.md`, `.agent/rules.md`: replace the "glassmorphism mandatory / Google Sans / Midnight Technical Editorial / 3D atmosphere / portrait-free" rules with the Ink & Sea-glass rules above, and update the component list and dependencies.
- `.project_context/overview.md`: update the visual direction and core components.
- `.project_context/resume-content-governance.md`: record that the real photo is approved (generated portraits still banned) and that the three quotations were retired by Ted on 2026-10-14; update the content rules for the showcase sections.
- `.workflow_context/professional-redesign-YYYY-MM-DD.md` (dated on the day implementation finishes): implementation and validation snapshot.

## 12. Out of scope

Personal mode and a light theme; a blog or CMS; new writing; analytics; domain or hosting changes; upgrading Vite or Node (the Vite 7 Dependabot branch needs Node ≥20.19 locally).
