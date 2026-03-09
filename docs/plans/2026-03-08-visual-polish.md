# Visual Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Polish the existing light-minimal editorial portfolio — fix readability, accessibility, and add a hero geometric element — without changing the visual identity.

**Architecture:** CSS-only changes for visual fixes, JSX attribute additions for accessibility, one new CSS-drawn geometric element in Hero, data migration for "The Next Chapter" into resumeData.json.

**Tech Stack:** React 18, Framer Motion, CSS custom properties, FontAwesome

**Note:** No test runner is configured. Verify each task visually via `npm run dev` (localhost:5173) and `npm run build`.

---

### Task 1: Typography — Replace Google Sans with Inter

Google Sans is a proprietary font that 404s from Google Fonts API. Inter is already the fallback and matches the editorial feel.

**Files:**
- Modify: `src/styles.css:4-10`

**Step 1: Replace font import and CSS variables**

Replace line 4:
```css
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Text:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
```
With:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

Replace lines 8-10:
```css
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds, no font-loading errors in browser console.

**Step 3: Commit**

```bash
git add src/styles.css
git commit -m "fix: replace Google Sans with Inter (was 404ing)"
```

---

### Task 2: Watermark Readability

Lighten all watermark colors and ensure content z-index stays above.

**Files:**
- Modify: `src/styles.css` — lines referencing `#e5e7eb` in watermark classes

**Step 1: Update watermark colors**

Change all watermark `color` values from `#e5e7eb` to `#f0f1f3`:
- `.about-watermark` (line 359)
- `.exp-section-watermark` (line 506)
- `.exp-watermark` (line 541)
- `.portfolio-watermark` (line 729)

Also change `.exp-future .exp-watermark` color from `#f0f1f3` to `#f5f6f8` (line 683) to maintain the lighter distinction.

**Step 2: Verify**

Open localhost:5173, scroll through all sections. Watermarks should be visible but not interfere with body text, especially in the Experience section where company names overlap with labels.

**Step 3: Commit**

```bash
git add src/styles.css
git commit -m "fix: lighten watermark colors for better content readability"
```

---

### Task 3: Portfolio Card Overlay

Reduce the gradient opacity so project screenshots are visible.

**Files:**
- Modify: `src/styles.css:828-840` (`.portfolio-card-overlay`)
- Modify: `src/styles.css:789-796` (`.portfolio-card:hover .portfolio-card-overlay`)

**Step 1: Update default overlay gradient**

Replace the `.portfolio-card-overlay` background:
```css
background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.92) 30%,
    rgba(255, 255, 255, 0.4) 60%,
    transparent 100%
);
```

**Step 2: Update hover overlay gradient**

Replace the `.portfolio-card:hover .portfolio-card-overlay` background:
```css
background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.95) 35%,
    rgba(255, 255, 255, 0.5) 65%,
    transparent 100%
);
```

**Step 3: Verify**

Open the Works section. Project screenshots should be clearly visible in the upper portion of the card. Text at the bottom should still be readable.

**Step 4: Commit**

```bash
git add src/styles.css
git commit -m "fix: reduce portfolio card overlay so project images are visible"
```

---

### Task 4: Hero Geometric Element

Add a subtle intersecting-lines geometric composition on the right side of the hero section, using CSS only (pseudo-elements + borders).

**Files:**
- Modify: `src/styles.css` — add new rules after `.hero-status` (after line 341)
- Modify: `src/Components/Hero.jsx:58-97` — add geometric element div

**Step 1: Add geometric element to Hero.jsx**

After line 95 (before `</div>` closing hero-content's parent), add a sibling div:

```jsx
{/* Geometric accent */}
<div className="hero-geometric" aria-hidden="true">
  <div className="hero-geo-line hero-geo-line-1" />
  <div className="hero-geo-line hero-geo-line-2" />
  <div className="hero-geo-line hero-geo-line-3" />
  <div className="hero-geo-circle" />
</div>
```

This should be placed inside the `<section>` but outside and after `<div className="hero-content">`.

**Step 2: Add CSS for geometric element**

After the `.hero-status` block (after line 341), add:

```css
/* Hero geometric accent */
.hero-geometric {
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 400px;
  opacity: 0.12;
  pointer-events: none;
}

.hero-geo-line {
  position: absolute;
  background: var(--accent);
}

.hero-geo-line-1 {
  width: 1px;
  height: 100%;
  right: 40%;
  top: 0;
}

.hero-geo-line-2 {
  width: 100%;
  height: 1px;
  top: 35%;
  left: 0;
}

.hero-geo-line-3 {
  width: 1px;
  height: 60%;
  right: 10%;
  top: 20%;
  transform: rotate(30deg);
  transform-origin: top center;
}

.hero-geo-circle {
  position: absolute;
  width: 120px;
  height: 120px;
  border: 1px solid var(--accent);
  border-radius: 50%;
  top: 25%;
  right: 20%;
}

@media (max-width: 768px) {
  .hero-geometric {
    display: none;
  }
}
```

**Step 3: Verify**

Open hero section. Subtle intersecting lines and a circle should appear on the right side at low opacity. Should be invisible on mobile.

**Step 4: Commit**

```bash
git add src/styles.css src/Components/Hero.jsx
git commit -m "feat: add subtle geometric accent to hero section"
```

---

### Task 5: Accessibility — Watermark aria-hidden

Add `aria-hidden="true"` to all decorative watermark elements so screen readers skip them.

**Files:**
- Modify: `src/Components/About.jsx:15`
- Modify: `src/Components/Experience.jsx:28-29,32-39,164`
- Modify: `src/Components/Work.jsx:41`

**Step 1: About.jsx — watermark**

Line 15, change:
```jsx
<h2 className="about-watermark">About</h2>
```
To:
```jsx
<h2 className="about-watermark" aria-hidden="true">About</h2>
```

**Step 2: Experience.jsx — section watermark**

Line 164, change:
```jsx
<h2 className="exp-section-watermark">Journey</h2>
```
To:
```jsx
<h2 className="exp-section-watermark" aria-hidden="true">Journey</h2>
```

**Step 3: Experience.jsx — entry watermarks**

Line 28, change:
```jsx
<div className="exp-watermark">
```
To:
```jsx
<div className="exp-watermark" aria-hidden="true">
```

Line 32-33, change:
```jsx
<motion.div
  className="exp-watermark"
```
To:
```jsx
<motion.div
  className="exp-watermark"
  aria-hidden="true"
```

**Step 4: Work.jsx — watermark**

Line 41, change:
```jsx
<h2 className="portfolio-watermark">Projects</h2>
```
To:
```jsx
<h2 className="portfolio-watermark" aria-hidden="true">Projects</h2>
```

**Step 5: Work.jsx — scroll hint**

Line 84, change:
```jsx
<div className="portfolio-scroll-hint">
```
To:
```jsx
<div className="portfolio-scroll-hint" aria-hidden="true">
```

**Step 6: Commit**

```bash
git add src/Components/About.jsx src/Components/Experience.jsx src/Components/Work.jsx
git commit -m "a11y: add aria-hidden to decorative watermark elements"
```

---

### Task 6: Accessibility — Hero h1, Navigation, Skip Link

Fix the fragmented screen reader output on the hero h1, add mobile menu aria attributes, and add a skip-to-content link.

**Files:**
- Modify: `src/Components/Hero.jsx:60-61`
- Modify: `src/Components/Navigation.jsx:36-38`
- Modify: `src/App.jsx:44`
- Modify: `src/styles.css` — add skip link styles

**Step 1: Hero.jsx — aria-label on h1**

Line 60-61, change:
```jsx
<motion.h1
  className="hero-name"
```
To:
```jsx
<motion.h1
  className="hero-name"
  aria-label={data.name}
```

**Step 2: Navigation.jsx — mobile menu button**

Line 36, change:
```jsx
<div className="mobile-menu-btn" onClick={toggleMenu}>
```
To:
```jsx
<button
  className="mobile-menu-btn"
  onClick={toggleMenu}
  aria-label="Menu"
  aria-expanded={isMobileMenuOpen}
>
```

Line 38, change the closing `</div>` to `</button>`.

**Step 3: Navigation.jsx — backdrop**

Line 56-59, change:
```jsx
<div
  className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
  onClick={() => setIsMobileMenuOpen(false)}
/>
```
To:
```jsx
<div
  className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
  onClick={() => setIsMobileMenuOpen(false)}
  aria-hidden="true"
/>
```

**Step 4: App.jsx — skip link**

Line 44, after `<div className="App">`, add:
```jsx
<a href="#about" className="skip-link">Skip to content</a>
```

**Step 5: styles.css — skip link styles**

After the reset section (after line 36), add:
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  z-index: 10000;
  border-radius: 4px;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 0.5rem;
}
```

**Step 6: Commit**

```bash
git add src/Components/Hero.jsx src/Components/Navigation.jsx src/App.jsx src/styles.css
git commit -m "a11y: add skip link, hero aria-label, mobile menu button semantics"
```

---

### Task 7: Data Cleanup — "The Next Chapter" + Phone Link

Move the hardcoded future entry to resumeData.json and make the phone number a tel: link.

**Files:**
- Modify: `src/resumeData.json` — add `future` object
- Modify: `src/Components/Experience.jsx:149-159` — read from data instead of hardcoding
- Modify: `src/Components/About.jsx:55-57` — phone as tel: link

**Step 1: Add future entry to resumeData.json**

Add a new top-level key `"future"` after the `"portfolio"` section:
```json
"future": {
  "title": "The Next Chapter",
  "date": "2025 & Beyond",
  "description": "It's most likely that I'm still running around and about. I hope to one day work with you too to make valuable change and meaningful experiences!"
}
```

**Step 2: Experience.jsx — read future from props**

Change the component signature (line 95):
```jsx
const Experience = ({ work, education, future }) => {
```

Replace lines 149-159 (hardcoded push) with:
```jsx
if (future) {
  timelineItems.push({
    type: 'future',
    sortDate: new Date(),
    displayDate: future.date,
    status: "What's next?",
    primary: future.title,
    secondary: '',
    location: '',
    details: future.description,
    achievements: []
  });
}
```

**Step 3: App.jsx — pass future prop**

Line 53-54, change:
```jsx
<Experience work={resumeData.resume.work} education={resumeData.resume.education} />
```
To:
```jsx
<Experience work={resumeData.resume.work} education={resumeData.resume.education} future={resumeData.future} />
```

**Step 4: About.jsx — phone as tel: link**

Lines 55-57, change:
```jsx
<li>
  <FontAwesomeIcon icon="phone" className="about-contact-icon" />
  <span>{phone}</span>
</li>
```
To:
```jsx
<li>
  <FontAwesomeIcon icon="phone" className="about-contact-icon" />
  <a href={`tel:${phone}`}>{phone}</a>
</li>
```

**Step 5: Verify**

- "The Next Chapter" should still render at the bottom of Experience
- Phone number should be tappable on mobile
- Run: `npm run build` — should succeed

**Step 6: Commit**

```bash
git add src/resumeData.json src/Components/Experience.jsx src/App.jsx src/Components/About.jsx
git commit -m "refactor: move future entry to resumeData.json, phone as tel: link"
```

---

### Task 8: Final Verification

**Step 1: Build check**
Run: `npm run build`
Expected: Clean build, no warnings

**Step 2: Visual check**
Open localhost:5173 and verify:
- [ ] Hero: geometric lines visible on right, hidden on mobile
- [ ] About: watermark is lighter, doesn't compete
- [ ] Experience: watermarks lighter, content readable
- [ ] Projects: screenshots clearly visible through overlay
- [ ] Contact + Footer: unchanged
- [ ] Skip link appears on Tab key press
- [ ] Inter font loads correctly (no FOUT)

**Step 3: Accessibility check**
Tab through the entire page:
- [ ] Skip link appears first and jumps to #about
- [ ] All nav links focusable with visible rings
- [ ] Mobile menu button announces "Menu"
