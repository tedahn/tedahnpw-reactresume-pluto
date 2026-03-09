# Light Minimal Redesign — Design Document

## Summary

Fresh visual identity for tedahn.pw. Same sections and structure, new skin: light minimal aesthetic inspired by Linear/Apple. Typography-driven, generous whitespace, barely-there UI.

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#ffffff` | Page background |
| `--bg-surface` | `#f9fafb` | Subtle alternation (optional) |
| `--text-primary` | `#1a1a2e` | Headings, body text |
| `--text-secondary` | `#6b7280` | Metadata, labels, muted text |
| `--accent` | `#64748B` | Links, active states, borders |
| `--accent-hover` | `#475569` | Hover states |
| `--accent-muted` | `#64748b33` | Achievement borders, subtle highlights |
| `--border` | `#e5e7eb` | Dividers, nav border, card borders |

### Typography

| Token | Value |
|-------|-------|
| `--font-heading` | `'Inter', sans-serif` (weight 700) |
| `--font-body` | `'Inter', sans-serif` (weight 400/500) |
| `--font-mono` | `'JetBrains Mono', monospace` |

Replace Instrument Serif + DM Sans with Inter across the board.

### Layout

- `--nav-height`: 48px
- `--section-padding`: `clamp(80px, 12vw, 160px)` (unchanged)
- `--border-radius`: 8px (photos only)
- `--transition-fast`: 150ms ease
- `--transition-normal`: 250ms ease

### Interactions

- Color/opacity transitions only — no scale transforms
- Links: underline animation on hover
- Nav items: color shift to accent on active/hover
- All clickable elements: `cursor: pointer`

## Section Specs

### Navigation

- White background, `border-bottom: 1px solid var(--border)`
- Logo: Inter mono, dark text
- Links: JetBrains Mono uppercase, `--text-secondary` default, `--accent` on active
- Mobile: same slide-in panel, white background

### Hero

- Large "Ted / Ahn" in Inter bold (weight 700), `--text-primary`
- Tagline: JetBrains Mono uppercase, `--text-secondary`
- Accent line: `--accent` (slate blue, 2px)
- Status line: JetBrains Mono, `--text-secondary` at 0.6 opacity

### About

- Same asymmetric two-column (3fr / 2fr)
- Pull quote: left border `--accent`, Inter italic headings
- Photo: 8px border-radius, no border
- Labels/skills: JetBrains Mono, `--text-secondary`
- Contact links: `--accent` color

### Experience

- Same editorial stacked layout
- Watermark company names: `opacity: 0.04` (lighter for white bg)
- Achievement borders: `--accent-muted`
- Dates/meta: JetBrains Mono, `--text-secondary`
- Rule separators: `--accent`

### Portfolio

- Same horizontal scroll cards
- Dark gradient overlays on images preserved (content on image)
- Tool labels: JetBrains Mono, `--text-secondary`
- Links: `--accent`

### Contact

- Large heading in Inter bold
- Dot accent: `--accent`
- Email: `--accent` with underline animation
- Location: JetBrains Mono muted

### Social Footer

- `border-top: 1px solid var(--border)`
- Icons: `--text-secondary`, hover to `--accent`
- Copyright: JetBrains Mono, muted

## What Changes

1. `styles.css` — Update CSS custom properties, swap font import, adjust colors throughout
2. No component logic changes — purely CSS
3. Font import: replace Instrument Serif + DM Sans with Inter

## What Stays

- All component files unchanged (no JSX changes)
- `resumeData.json` unchanged
- Section structure and layout unchanged
- Framer Motion animations unchanged
- Responsive breakpoint (768px) unchanged
- `prefers-reduced-motion` support unchanged
