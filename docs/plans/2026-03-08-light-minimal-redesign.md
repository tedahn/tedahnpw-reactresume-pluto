# Light Minimal Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Swap the dark vermillion visual identity to a light minimal aesthetic (white bg, Inter font, slate blue accent) — CSS-only, no component changes.

**Architecture:** All changes happen in `src/styles.css`. Replace the Google Fonts import, update CSS custom properties, and adjust any hardcoded color values throughout the file. One file, one commit.

**Tech Stack:** CSS custom properties, Google Fonts (Inter, JetBrains Mono)

**Design doc:** `docs/plans/2026-03-08-light-minimal-redesign-design.md`

---

### Task 1: Update font import and CSS custom properties

**Files:**
- Modify: `src/styles.css:1-29` (font import + `:root` block)

**Step 1: Replace the Google Fonts import**

Change line 4 from:
```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

To:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

**Step 2: Replace the `:root` custom properties**

Replace the entire `:root` block with:
```css
:root {
  /* Typography */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Colors — Light Minimal */
  --bg-primary: #ffffff;
  --bg-surface: #f9fafb;
  --text-primary: #1a1a2e;
  --text-secondary: #6b7280;
  --accent: #64748B;
  --accent-muted: #64748b33;
  --border: #e5e7eb;

  /* Layout */
  --nav-height: 48px;
  --section-padding: clamp(80px, 12vw, 160px);
  --border-radius: 8px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}
```

**Step 3: Verify dev server renders**

Run: `npm run dev`
Expected: Site loads with white background, Inter font, slate blue accents. Most colors update automatically via custom properties.

---

### Task 2: Fix scrollbar and body colors

**Files:**
- Modify: `src/styles.css:40-41` (scrollbar-color)
- Modify: `src/styles.css:60-75` (webkit scrollbar styles)

**Step 1: Update scrollbar colors**

Change `scrollbar-color` in `html`:
```css
scrollbar-color: #e5e7eb var(--bg-primary);
```

**Step 2: Update webkit scrollbar thumb hover**

The `&:hover` inside `::-webkit-scrollbar-thumb` references `--accent` which is already updated. No change needed — but verify the thumb default `background: var(--border)` looks right on white.

---

### Task 3: Fix heading typography for Inter

**Files:**
- Modify: `src/styles.css:100-113` (heading styles)

**Step 1: Add font-weight 700 to headings**

Headings currently use `font-weight: 400` which was correct for Instrument Serif but Inter needs bold weight. Change:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.15;
  letter-spacing: -0.03em;
  text-wrap: balance;
}
```

---

### Task 4: Fix experience watermark opacity for light background

**Files:**
- Modify: `src/styles.css:533-546` (`.exp-watermark`)
- Modify: `src/styles.css:505-512` (`.exp-section-watermark`)
- Modify: `src/styles.css:355-365` (`.about-watermark`)
- Modify: `src/styles.css:724-742` (`.portfolio-watermark`)

**Step 1: Reduce all watermark opacities**

Watermarks at `opacity: 0.1` and `0.06` were designed for dark backgrounds. On white, they'll be too visible. Update:

- `.about-watermark`: `opacity: 0.06` (was 0.1)
- `.exp-section-watermark`: `opacity: 0.06` (was 0.1)
- `.exp-watermark`: `opacity: 0.04` (was 0.06)
- `.exp-future .exp-watermark`: `opacity: 0.02` (was 0.04)
- `.portfolio-watermark`: `opacity: 0.06` (was 0.1)

---

### Task 5: Fix mobile backdrop and nav for light theme

**Files:**
- Modify: `src/styles.css:257-269` (`.mobile-backdrop`)

**Step 1: Lighten mobile backdrop**

Change backdrop background:
```css
.mobile-backdrop {
  background: rgba(0, 0, 0, 0.3);
}
```

The nav background already uses `var(--bg-primary)` so it will be white automatically.

---

### Task 6: Fix portfolio card overlay gradients

**Files:**
- Modify: `src/styles.css:825-836` (`.portfolio-card-overlay`)
- Modify: `src/styles.css:786-792` (hover overlay)

**Step 1: Keep dark overlays on portfolio cards**

The portfolio cards use dark gradient overlays on images so text is readable. These should stay dark since the text on the cards is light. Verify these still look good — the `rgba(12, 12, 12, ...)` values are hardcoded (not using CSS vars) so they'll remain unchanged. No modification needed.

---

### Task 7: Fix about-quote for Inter

**Files:**
- Modify: `src/styles.css:399-410` (`.about-quote-inner p`)

**Step 1: Update quote styling for Inter**

The quote currently uses `font-family: var(--font-heading)` with `font-style: italic`. Inter italic will look different from Instrument Serif italic. Update:
```css
.about-quote-inner p {
  font-family: var(--font-heading);
  font-style: normal;
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 1.5rem;
}
```

---

### Task 8: Visual verification and commit

**Step 1: Run dev server and verify each section**

Run: `npm run dev`

Check:
- [ ] Nav: white background, slate blue active link
- [ ] Hero: Inter bold name, slate accent line
- [ ] About: slate blue left border, photo renders cleanly on white
- [ ] Experience: watermarks subtle, achievements readable
- [ ] Portfolio: card overlays still readable, tools/links in slate
- [ ] Contact: large heading, slate email link
- [ ] Footer: subtle top border, slate icons
- [ ] Mobile (resize to 375px): all sections responsive

**Step 2: Commit**

```bash
git add src/styles.css
git commit -m "feat: redesign visual identity to light minimal theme

Replace dark vermillion theme with light minimal aesthetic:
- White background, Inter typography, slate blue accent
- Adjusted watermark opacities for light background
- Updated heading weights for sans-serif
- Maintained all layout structure and component logic"
```
