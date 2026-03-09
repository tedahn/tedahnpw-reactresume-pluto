# Editorial Brutalist Portfolio Redesign

## Vision
Redesign Ted Ahn's portfolio from dark glassmorphism to an editorial brutalist aesthetic — high-fashion magazine meets developer portfolio. 70/30 creative/professional balance.

## Design System

### Typography
- **Headings**: Instrument Serif (Google Fonts) — 96-160px for section titles, oversized and intentional
- **Body/UI**: JetBrains Mono — tight, technical contrast to the serif headings
- **Secondary**: DM Sans — badges, labels, small text

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0c0c0c` | Page background |
| `--bg-surface` | `#161616` | Card/section surfaces |
| `--text-primary` | `#f5f0e8` | Cream — headings, primary text |
| `--text-secondary` | `#a8a29e` | Warm gray — body, labels |
| `--accent` | `#ff4d00` | Vermillion — links, highlights, CTAs |
| `--accent-muted` | `#ff4d0033` | Accent at 20% — hover states, glows |
| `--border` | `#2a2a2a` | Subtle dividers |

### Spacing
- 120-160px vertical padding between sections
- Generous negative space is intentional

### Glass Treatment
- Minimal — only navigation gets subtle backdrop-filter
- Cards use solid dark surfaces with thin borders
- Brutalist direction favors hard edges over blur

---

## Layout & Structure

### Hero (full viewport)
- Name in massive Instrument Serif (160px), positioned off-center left
- Last name offset right and lower — staggered, not stacked
- Tagline in JetBrains Mono, small, below
- No particle background — clean negative space
- Vermillion accent line/dot as visual anchor

### About (asymmetric two-column)
- Large pull-quote on left (60% width) in serif italic
- Bio details on right in mono
- Left-aligned with generous left margin, not centered

### Experience (editorial stacked)
- Ditch alternating timeline
- Each role gets a full-width "spread"
- Company name in oversized faded background text (watermark style)
- Details overlaid on watermark
- Roles separated by thin vermillion horizontal rules

### Portfolio (horizontal scroll)
- Projects as large cards (80vw wide) sliding through
- Each card: project image with text overlaid using clip-path or blend modes
- Scroll-hijack: vertical scrolling triggers horizontal movement

### Contact (minimal)
- One line of oversized serif: "Let's talk."
- Email link in vermillion
- No form, no cards — just confidence

### Navigation (thin top bar)
- Nearly invisible, solid #0c0c0c with subtle border-bottom
- Section labels in mono, small caps
- No glass effect
- Vermillion progress line at top

---

## Interactions & Transitions

### Section Transitions (clip-path based)
- Hero → About: Diagonal clip-path wipe (top-right to bottom-left)
- About → Experience: Horizontal blinds reveal
- Experience → Portfolio: Circle expand from center
- Portfolio → Contact: Vertical slide-up

### Kinetic Typography
- Hero name: Letters animate in one-by-one with slight rotation, settle into place
- Section titles: Slide in from left edge, oversized, on scroll
- Experience company names: Scale up from 0 as watermarks when entering viewport

### Scroll-Driven Effects
- Parallax depth on background watermark text
- Progress indicator: thin vermillion line at top
- Portfolio horizontal scroll triggered by vertical scrolling

### Micro-Interactions
- Links: Underline draws in from left on hover
- Nav items: Letter-spacing expands on hover
- CTA buttons: Slight magnetic pull toward cursor

---

## What Stays vs Changes

### Keep
- React 18 + Vite
- resumeData.json data flow
- Framer Motion (for animations)
- FontAwesome icons
- AnimatedSection wrapper (enhanced)
- Mobile responsiveness (768px breakpoint)
- prefers-reduced-motion support
- Component file structure

### Change
- All visual styling
- Typography stack (add Instrument Serif)
- Layout: symmetric → asymmetric
- Color palette
- Navigation style
- Section transitions (add clip-path)
- Remove particle background
- Remove glassmorphism (except minimal nav)

### Mobile Adaptation
- Asymmetric layouts collapse to single-column
- Oversized text scales down via clamp()
- Horizontal portfolio scroll becomes vertical stack
- Clip-path transitions simplified to fade-ins for performance

---

## Implementation Plan

### Task 1: Design System Foundation
Update CSS custom properties, import Instrument Serif font, establish new color palette and typography scale in styles.css. Remove old glassmorphism variables. Update the Google Fonts import in index.html.

**Files**: `src/styles.css`, `index.html`

### Task 2: Navigation Redesign
Redesign Navigation.jsx to thin top bar with solid background, mono small-caps labels, vermillion progress line. Remove glass effect. Update mobile hamburger to match new aesthetic.

**Files**: `src/Components/Navigation.jsx`, `src/styles.css`

### Task 3: Hero Section
Rebuild Hero.jsx with staggered oversized name layout (Instrument Serif 160px), off-center positioning, letter-by-letter entrance animation with rotation, vermillion accent element. Remove particle background references from App.jsx.

**Files**: `src/Components/Hero.jsx`, `src/App.jsx`, `src/styles.css`

### Task 4: About Section
Redesign About.jsx from bento grid to asymmetric two-column layout. Pull-quote in serif italic (60% left), bio details in mono (right). Remove decorative quote icons. Left-aligned with generous margin.

**Files**: `src/Components/About.jsx`, `src/styles.css`

### Task 5: Experience Section
Rebuild Experience.jsx from alternating timeline to editorial stacked layout. Each role as full-width spread with oversized watermark company name, details overlaid, vermillion horizontal rule separators. Watermark parallax and scale-up animation.

**Files**: `src/Components/Experience.jsx`, `src/styles.css`

### Task 6: Portfolio Section (Horizontal Scroll)
Rebuild Work.jsx as horizontal scroll section. Large cards (80vw) with scroll-hijack (vertical scroll → horizontal movement). Text overlaid on project images. Keep tech badge icon mapping.

**Files**: `src/Components/Work.jsx`, `src/styles.css`

### Task 7: Contact & Footer
Redesign Contact.jsx to minimal layout — oversized serif "Let's talk." with vermillion email link. Update Social.jsx footer to match new aesthetic.

**Files**: `src/Components/Contact.jsx`, `src/Components/Social.jsx`, `src/styles.css`

### Task 8: Section Transitions
Implement clip-path based transitions between sections. Each transition is unique (diagonal wipe, blinds, circle expand, slide-up). Add scroll-triggered activation via Framer Motion or Intersection Observer. Ensure prefers-reduced-motion fallback (simple fades).

**Files**: `src/styles.css`, `src/Components/AnimatedSection.jsx` (or new transition wrapper)

### Task 9: Micro-Interactions & Polish
Add link underline draw-in animation, nav letter-spacing hover, magnetic cursor effect on CTAs. Ensure all hover states use 150-300ms transitions. Final responsive pass at 375px, 768px, 1024px, 1440px.

**Files**: `src/styles.css`, various components

### Task 10: Cleanup & Mobile QA
Remove ParticleBackground.jsx (no longer used). Remove unused CSS. Verify mobile layouts collapse correctly. Test prefers-reduced-motion. Final build verification with `npm run build`.

**Files**: `src/Components/ParticleBackground.jsx` (delete), `src/App.jsx`, `src/styles.css`
