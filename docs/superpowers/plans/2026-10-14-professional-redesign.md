# Professional Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the glass/3D "midnight technical editorial" site with the approved "Ink & Sea-glass" professional page: photo, serif editorial type, teal accent, and separate Built at Work and Tinkering at Home sections.

**Architecture:** Same React 18 + Vite app and the same `src/resumeData.json` single source. Pure logic (inline-markup parsing, date ranges, role ordering) lives in `src/lib/*.js` with Node built-in tests. Presentation is a set of small section components plus one rewritten `styles.css`. three.js, Framer Motion and FontAwesome are removed.

**Tech Stack:** React 18, Vite 5, plain CSS, Google Fonts (Cormorant Garamond, EB Garamond, JetBrains Mono), `node --test` (Node 18).

**Spec:** `docs/superpowers/specs/2026-10-14-professional-redesign-design.md`

## Global Constraints

- All career content comes from `src/resumeData.json`; components contain only UI labels ("About", "Experience", "Built at Work", "Tinkering at Home", "Résumé").
- Existing JSON fields stay (the generator and `StructuredData` read them); changes are additive except `main.bio` (quotes retired) and `main.contactmessage`.
- Public safety: no revenue figures, pilot partner names, award proper name, or AI-enablement metrics anywhere.
- `vite.config.js` `base: './'` is unchanged; asset and résumé links are relative (no leading `/`).
- Tokens: `--ink #121a26`, `--panel #18212f`, `--cream #f4f0e6`, `--muted #b4ab97`, `--body-2 #cfc8b8`, `--rule #263142`, `--acc #6fc3b2`, `--acc-soft rgba(111,195,178,.22)`.
- Type: Cormorant Garamond (name 52px/600 with +1.2px tracking; labels 26px/600; card titles 20px/600), EB Garamond body 20px/1.9, JetBrains Mono for data 12–13px. Mobile (≤768px): h1 38px, body 18px.
- Breakpoints: 768px (single column), 900px (two cards), 560px (one card).
- No new npm dependencies.

## Review Focus

1. **Copy with a stray `**` or a backtick** (for example "C++ ** note"): it must render literally, never swallow text. Covered in Task 1 by the `unmatched markers` test.
2. **A role whose dates are "Present", same-year, or unparseable**: it must show a sensible label and never crash or reorder others. Covered in Task 1 by the `yearRange` and `byStartDesc` tests.
3. **A visitor with reduced motion, or a browser without IntersectionObserver**: all content is visible with no fade. Covered in Task 3 by the reduced-motion browser check.
4. **A showcase item with no `image`, `glyph` or `url`**: it renders a default glyph as a non-link card. Covered in Task 3 by the no-url and no-glyph browser check.
5. **A 390px phone**: no horizontal overflow, the header fits, and the role dates wrap below the title instead of colliding. Covered in Task 3 by the mobile check.

---

### Task 1: Pure logic (inline markup and dates) with tests

**Files:**
- Create: `src/lib/inlineFormat.js`, `src/lib/inlineFormat.test.mjs`, `src/lib/dates.js`, `src/lib/dates.test.mjs`
- Modify: `package.json` (add a `test` script)

**Interfaces:**
- Produces: `tokenize(text: string|undefined) → Array<{type:'text'|'strong'|'figure', value:string}>`; `yearRange(dates: string) → string`; `byStartDesc(roles: Array<{dates:string}>) → new sorted array`; `parseMonthYear(value: string) → Date|null`.

- [ ] **Step 1: Add the test script.** In `package.json` `"scripts"`, add `"test": "node --test src/lib/"`.

- [ ] **Step 2: Write the failing tests** in `src/lib/inlineFormat.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize } from './inlineFormat.js';

test('plain text is a single text token', () => {
  assert.deepEqual(tokenize('hello'), [{ type: 'text', value: 'hello' }]);
});

test('empty and missing input produce no tokens', () => {
  assert.deepEqual(tokenize(''), []);
  assert.deepEqual(tokenize(undefined), []);
});

test('**bold** becomes a strong token', () => {
  assert.deepEqual(tokenize('I **patented** it'), [
    { type: 'text', value: 'I ' },
    { type: 'strong', value: 'patented' },
    { type: 'text', value: ' it' },
  ]);
});

test('`figure` becomes a figure token', () => {
  assert.deepEqual(tokenize('at `4M+/day`.'), [
    { type: 'text', value: 'at ' },
    { type: 'figure', value: '4M+/day' },
    { type: 'text', value: '.' },
  ]);
});

test('adjacent markers are both parsed', () => {
  assert.deepEqual(tokenize('**a**`b`'), [
    { type: 'strong', value: 'a' },
    { type: 'figure', value: 'b' },
  ]);
});

test('unmatched markers stay literal', () => {
  assert.deepEqual(tokenize('C++ ** note and `tick'), [
    { type: 'text', value: 'C++ ** note and `tick' },
  ]);
});
```

and `src/lib/dates.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { byStartDesc, parseMonthYear, yearRange } from './dates.js';

test('parseMonthYear reads short and long month names', () => {
  assert.equal(parseMonthYear('May 2022').toISOString(), '2022-05-01T00:00:00.000Z');
  assert.equal(parseMonthYear('September 2019').getUTCMonth(), 8);
  assert.equal(parseMonthYear('Present'), null);
  assert.equal(parseMonthYear(''), null);
});

test('yearRange formats current, multi-year and same-year roles', () => {
  assert.equal(yearRange('Jul 2024 - Present'), '2024 — now');
  assert.equal(yearRange('May 2022 - Jul 2024'), '2022 — 2024');
  assert.equal(yearRange('May 2017 - Dec 2017'), '2017');
});

test('yearRange falls back to the raw string when it cannot parse', () => {
  assert.equal(yearRange('Summer internship'), 'Summer internship');
  assert.equal(yearRange(undefined), '');
});

test('byStartDesc orders newest first without mutating input', () => {
  const roles = [
    { id: 'webtoon', dates: 'May 2017 - Dec 2017' },
    { id: 'usaa', dates: 'Sep 2019 - May 2022' },
    { id: 'c1-swe', dates: 'May 2022 - Jul 2024' },
    { id: 'c1-senior', dates: 'Jul 2024 - Present' },
  ];
  assert.deepEqual(byStartDesc(roles).map((r) => r.id), ['c1-senior', 'c1-swe', 'usaa', 'webtoon']);
  assert.equal(roles[0].id, 'webtoon');
});

test('byStartDesc keeps unparseable dates last in original order', () => {
  const roles = [{ id: 'x', dates: '???' }, { id: 'a', dates: 'Jan 2020 - Present' }, { id: 'y', dates: '' }];
  assert.deepEqual(byStartDesc(roles).map((r) => r.id), ['a', 'x', 'y']);
});
```

- [ ] **Step 3: Run the tests to confirm they fail.** Run `npm test`. Expected: FAIL with "Cannot find module ... inlineFormat.js" and "... dates.js".

- [ ] **Step 4: Implement** `src/lib/inlineFormat.js`:

```js
// Splits copy into text, **strong**, and `figure` tokens. Unmatched markers stay literal.
const PATTERN = /\*\*(.+?)\*\*|`([^`]+)`/g;

export function tokenize(text) {
  if (!text) return [];
  const tokens = [];
  let last = 0;
  for (const match of text.matchAll(PATTERN)) {
    if (match.index > last) tokens.push({ type: 'text', value: text.slice(last, match.index) });
    tokens.push(match[1] !== undefined
      ? { type: 'strong', value: match[1] }
      : { type: 'figure', value: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) tokens.push({ type: 'text', value: text.slice(last) });
  return tokens;
}
```

and `src/lib/dates.js`:

```js
const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

// "May 2022" or "September 2019" -> UTC Date for the first of the month; anything else -> null.
export function parseMonthYear(value) {
  const match = /^\s*([A-Za-z]{3})[a-z]*\.?\s+(\d{4})\s*$/.exec(value || '');
  if (!match) return null;
  const month = MONTHS[match[1].toLowerCase()];
  return month === undefined ? null : new Date(Date.UTC(Number(match[2]), month, 1));
}

function splitRange(dates) {
  const [start = '', end = ''] = (dates || '').split(/\s+[-–—]\s+/);
  return [start.trim(), end.trim()];
}

// "Jul 2024 - Present" -> "2024 — now"; "May 2017 - Dec 2017" -> "2017".
export function yearRange(dates) {
  const [start, end] = splitRange(dates);
  const startYear = parseMonthYear(start)?.getUTCFullYear();
  if (!startYear) return dates || '';
  if (!end || /^present$/i.test(end)) return `${startYear} — now`;
  const endYear = parseMonthYear(end)?.getUTCFullYear();
  if (!endYear || endYear === startYear) return `${startYear}`;
  return `${startYear} — ${endYear}`;
}

// Newest role first by start month; unparseable dates sink to the end in original order.
export function byStartDesc(roles) {
  const start = (role) => parseMonthYear(splitRange(role.dates)[0])?.getTime() ?? -Infinity;
  return [...roles].sort((a, b) => {
    const diff = start(b) - start(a);
    return Number.isNaN(diff) ? 0 : diff;
  });
}
```

- [ ] **Step 5: Run the tests to confirm they pass.** Run `npm test`. Expected: all 11 tests pass.

- [ ] **Step 6: Commit.** `git add package.json src/lib` then `git commit -m "feat: add inline-markup and date helpers with tests"`.

---

### Task 2: Content data and image assets

**Files:**
- Modify: `src/resumeData.json` (targeted edits; do not reformat the file)
- Create: `public/images/tedprofile/ted-ahn-336.jpg`, `public/images/impact/usaa-disaster-640.jpg`, `public/images/impact/navigator-dealer-640.jpg`

**Interfaces:**
- Produces: `main.photo {src, alt}`, `main.roleLine`, `main.professionalBio: string[]`, `main.social[].label`, `resume.work[].summary`, `portfolio.fieldNotes[].year`, and `portfolio.showcase.{work,home}: Array<{title, summary, tag?, image?, imageAlt?, glyph?, url?}>`.

- [ ] **Step 1: Resize the images** (PowerShell, from the repo root):

```powershell
Add-Type -AssemblyName System.Drawing
function Save-Resized($src, $dst, $width, $square) {
  $img = [System.Drawing.Image]::FromFile((Resolve-Path $src))
  $w = $width; $h = if ($square) { $width } else { [int]($img.Height * $width / $img.Width) }
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, 0, 0, $w, $h)
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 82L
  $bmp.Save((Join-Path (Get-Location) $dst), $codec, $ep); $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}
Save-Resized public/images/tedprofile/tedahnprofile.png public/images/tedprofile/ted-ahn-336.jpg 336 $true
Save-Resized public/images/impact/usaa-disaster.jpg public/images/impact/usaa-disaster-640.jpg 640 $false
Save-Resized public/images/impact/navigator-dealer.jpg public/images/impact/navigator-dealer-640.jpg 640 $false
Get-Item public/images/tedprofile/ted-ahn-336.jpg, public/images/impact/*-640.jpg | Select-Object Name, Length
```

Expected: the photo is under 40 KB and each card image is under 80 KB. The originals stay, because the context links still reference them.

- [ ] **Step 2: Edit `main`.**
  - After `"description"`, insert:

```json
    "roleLine": "Senior Software Engineer · **Capital One** · Dallas–Fort Worth",
    "photo": { "src": "images/tedprofile/ted-ahn-336.jpg", "alt": "Ted Ahn" },
    "professionalBio": [
      "Backend engineer building systems that have to stay up. At Capital One I designed and **patented an event-driven pipeline that moves 4M+ vehicle records a day**, and **retired 4 of the 7 legacy systems** it replaced.",
      "Before that, at USAA, I built **the alerting platform that sends 1M SMS an hour** when severe weather hits. CS at UT Dallas; AI/ML postgraduate certificate from UT Austin."
    ],
```

  - Replace the `"bio"` value (the three quotes) with `"Senior software engineer building event-driven backend systems that have to stay up."`
  - Replace the `"contactmessage"` value with `"Not looking for a new role, but always happy to talk systems."`
  - Add `"label"` to each `social` entry: `"Email"`, `"LinkedIn"`, `"GitHub"`.

- [ ] **Step 3: Add a `"summary"` to each `resume.work` entry**, placed after `"location"`:
  - LINE WEBTOON: `"Spring MVC and Apache Spark batch job to test a recommendation concept."`
  - USAA: ``"Reactive alerting platform at `1M SMS/hr`; kept a 35-year-old system running while building its replacement."``
  - Capital One SWE: ``"Patented vehicle-data pipeline at `4M+/day`; consolidated dealer data from `17,000+` dealerships."``
  - Capital One Senior: ``"Onboarding redesign for an internal marketing platform with `100+` tenants; failover testing that rides through AWS outages."``

- [ ] **Step 4: Add `"year": "2026"` to both `portfolio.fieldNotes` entries**, and add `showcase` after `"projects": [],`:

```json
    "showcase": {
      "work": [
        {
          "title": "Vehicle Data Pipeline",
          "summary": "Event-driven ingest behind Auto Navigator that replaced a 15-year-old system.",
          "tag": "patented",
          "image": "images/impact/auto-navigator.jpg",
          "imageAlt": "A selection of vehicles available through Auto Navigator",
          "url": "https://www.capitalone.com/cars/how-auto-navigator-works"
        },
        {
          "title": "Severe-Weather Alerting",
          "summary": "USAA's first reactive messaging platform, built for 1M SMS an hour.",
          "tag": "production",
          "image": "images/impact/usaa-disaster-640.jpg",
          "imageAlt": "A home and vehicle damaged by severe weather",
          "url": "https://www.usaa.com/support/insurance/claims/natural-disaster/"
        },
        {
          "title": "Dealer Marketing",
          "summary": "Shared marketing capability and pilots now serving auto dealers nationally.",
          "tag": "production",
          "image": "images/impact/navigator-dealer-640.jpg",
          "imageAlt": "Customers exploring a vehicle with a dealer",
          "url": "https://www.capitalone.com/cars/auto-financing/dealer"
        }
      ],
      "home": [
        {
          "title": "Per-Shot Encoding",
          "summary": "Rebuilding Netflix's quality-per-bit encoding optimizer with real VMAF.",
          "tag": "lab",
          "glyph": "curve",
          "url": "https://tedahn.github.io/architecture-lab-netflix-per-shot-encoding/"
        },
        {
          "title": "Marketplace Engine",
          "summary": "A Steam-style matching engine with ring buffers, a write-ahead log and failover.",
          "tag": "lab",
          "glyph": "ring",
          "url": "https://tedahn.github.io/architecture-lab-steam-marketplace/"
        },
        {
          "title": "Ditto Factory",
          "summary": "A Kubernetes-native platform for isolated, traceable agent workflows.",
          "tag": "lab",
          "glyph": "flow",
          "url": "https://github.com/tedahn/ditto-factory"
        }
      ]
    },
```

- [ ] **Step 5: Verify.** `node -e "const d=JSON.parse(require('fs').readFileSync('src/resumeData.json','utf8'));console.log(d.main.professionalBio.length, d.resume.work.every(w=>w.summary), d.portfolio.showcase.work.length, d.portfolio.showcase.home.length)"`. Expected: `2 true 3 3`. Then `npm run generate:resume` must succeed, and `git diff --stat public/` should show only the intended changes.

- [ ] **Step 6: Commit.** `git add src/resumeData.json public/images public/resume.* public/llms.txt` then `git commit -m "content: add redesign data and resized images"`.

---

### Task 3: New presentation layer

**Files:**
- Create: `src/Components/Inline.jsx`, `Ornament.jsx`, `Reveal.jsx`, `Header.jsx`, `Showcase.jsx`, `Footer.jsx`
- Rewrite: `src/Components/Hero.jsx`, `About.jsx`, `Experience.jsx`, `src/App.jsx`, `src/styles.css`
- Modify: `src/main.jsx` (drop the icons import), `src/Components/StructuredData.jsx` (`hasPart` adds `showcase.home`), `index.html` (fonts and theme colour), `public/manifest.json` (colours)
- Delete: `src/Components/HeroScene.jsx`, `Scene3D.jsx`, `SectionShapes.jsx`, `Navigation.jsx`, `Work.jsx`, `Contact.jsx`, `Social.jsx`, `AnimatedSection.jsx`, `src/icons.js`
- Uninstall: `three @react-three/fiber @react-three/drei framer-motion @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome`

**Interfaces:**
- Consumes: `tokenize`, `yearRange`, `byStartDesc` (Task 1); the data fields listed in Task 2.

- [ ] **Step 1: Write the shared primitives.**

`src/Components/Inline.jsx`:
```jsx
import React from 'react';
import { tokenize } from '../lib/inlineFormat';

// Renders copy containing **bold** and `figure` markers.
const Inline = ({ text }) =>
  tokenize(text).map((token, index) => {
    if (token.type === 'strong') return <strong key={index}>{token.value}</strong>;
    if (token.type === 'figure') return <span key={index} className="figure">{token.value}</span>;
    return <React.Fragment key={index}>{token.value}</React.Fragment>;
  });

export default Inline;
```

`src/Components/Ornament.jsx`:
```jsx
import React from 'react';

const NODES = [[5, 9], [17, 4], [29, 9], [17, 14]];

// Section divider: a small node-and-edge mark between two hairlines.
const Ornament = () => (
  <div className="ornament" aria-hidden="true">
    <span className="ornament-rule" />
    <svg width="34" height="18" viewBox="0 0 34 18">
      <path d="M5 9 L17 4 L29 9 M17 4 L17 14" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {NODES.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill="currentColor" />)}
    </svg>
    <span className="ornament-rule" />
  </div>
);

export default Ornament;
```

`src/Components/Reveal.jsx`:
```jsx
import React, { useEffect, useRef, useState } from 'react';

// Fades a section in once it scrolls into view. Content stays visible when
// IntersectionObserver is unavailable or the visitor prefers reduced motion.
const Reveal = ({ as: Tag = 'section', className = '', children, ...rest }) => {
  const ref = useRef(null);
  const [state, setState] = useState('static');

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window) || !ref.current) return undefined;
    setState('hidden');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setState('shown');
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`${className} reveal reveal-${state}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
```

- [ ] **Step 2: Write the section components.**

`src/Components/Header.jsx`:
```jsx
import React from 'react';

const PROFILE_NETWORKS = ['github', 'linkedin'];

const Header = ({ main }) => {
  const resumeHref = (main.resumeResources?.printable || 'resume.html').replace(/^\//, '');
  const profiles = main.social.filter((network) => PROFILE_NETWORKS.includes(network.name));

  return (
    <header className="site-header">
      <a className="site-name" href="#top">{main.name}</a>
      <nav aria-label="Résumé and profiles">
        <a href={resumeHref}>Résumé</a>
        {profiles.map((network) => (
          <a key={network.name} href={network.url} target="_blank" rel="noopener noreferrer">
            {network.label || network.name}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
```

`src/Components/Hero.jsx`:
```jsx
import React from 'react';
import Inline from './Inline';

const Hero = ({ main }) => (
  <section className="hero" id="top" aria-label="Introduction">
    {main.photo && (
      <div className="hero-ring">
        <img src={main.photo.src} alt={main.photo.alt} width="168" height="168" />
      </div>
    )}
    <h1>{main.name}</h1>
    <p className="role-line"><Inline text={main.roleLine || main.occupation} /></p>
  </section>
);

export default Hero;
```

`src/Components/About.jsx`:
```jsx
import React from 'react';
import Inline from './Inline';
import Reveal from './Reveal';

const About = ({ main }) => (
  <Reveal className="section" id="about" aria-labelledby="about-title">
    <h2 id="about-title" className="section-label">About</h2>
    <div className="section-body prose">
      {(main.professionalBio || []).map((paragraph) => (
        <p key={paragraph}><Inline text={paragraph} /></p>
      ))}
      {main.contactmessage && <p className="status-line">{main.contactmessage}</p>}
    </div>
  </Reveal>
);

export default About;
```

`src/Components/Experience.jsx`:
```jsx
import React from 'react';
import Inline from './Inline';
import Reveal from './Reveal';
import { byStartDesc, yearRange } from '../lib/dates';

const Experience = ({ work = [] }) => (
  <Reveal className="section" id="experience" aria-labelledby="experience-title">
    <h2 id="experience-title" className="section-label">Experience</h2>
    <ol className="section-body roles">
      {byStartDesc(work).map((role) => (
        <li className="role" key={`${role.company}-${role.dates}`}>
          <div className="role-head">
            <h3 className="role-title">
              {role.title} <span className="role-company">· {role.company}</span>
            </h3>
            <span className="role-dates">{yearRange(role.dates)}</span>
          </div>
          {role.summary && <p className="role-summary"><Inline text={role.summary} /></p>}
        </li>
      ))}
    </ol>
  </Reveal>
);

export default Experience;
```

`src/Components/Showcase.jsx`:
```jsx
import React from 'react';
import Inline from './Inline';
import Reveal from './Reveal';

const TAG_LABELS = { patented: 'Patented', production: 'In production', lab: 'Lab' };

const GLYPHS = {
  curve: (
    <svg width="120" height="70" viewBox="0 0 120 70">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 60 Q30 10 60 30 T112 12" />
        <path d="M8 60 L112 60 M8 60 L8 8" opacity=".35" />
      </g>
      <g fill="currentColor"><circle cx="34" cy="26" r="2.5" /><circle cx="60" cy="30" r="2.5" /><circle cx="86" cy="24" r="2.5" /></g>
    </svg>
  ),
  ring: (
    <svg width="120" height="70" viewBox="0 0 120 70">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="60" cy="35" r="22" />
        <circle cx="60" cy="35" r="12" opacity=".5" />
      </g>
      <g fill="currentColor"><circle cx="60" cy="13" r="2.5" /><circle cx="82" cy="35" r="2.5" /><circle cx="60" cy="57" r="2.5" /><circle cx="38" cy="35" r="2.5" /></g>
    </svg>
  ),
  flow: (
    <svg width="120" height="70" viewBox="0 0 120 70">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="10" y="26" width="22" height="18" rx="3" />
        <rect x="49" y="10" width="22" height="18" rx="3" />
        <rect x="49" y="42" width="22" height="18" rx="3" />
        <rect x="88" y="26" width="22" height="18" rx="3" />
        <path d="M32 35 L49 19 M32 35 L49 51 M71 19 L88 35 M71 51 L88 35" />
      </g>
    </svg>
  ),
};

const CardMedia = ({ item }) =>
  item.image ? (
    <img className="card-media" src={item.image} alt={item.imageAlt || ''} loading="lazy" width="640" height="360" />
  ) : (
    <div className="card-media card-glyph" aria-hidden="true">{GLYPHS[item.glyph] || GLYPHS.flow}</div>
  );

const Card = ({ item }) => {
  const content = (
    <>
      <CardMedia item={item} />
      <div className="card-body">
        <h3 className="card-title">
          {item.title}
          {item.url && <span className="card-arrow" aria-hidden="true"> ↗</span>}
        </h3>
        <p className="card-summary"><Inline text={item.summary} /></p>
        {item.tag && <span className={`tag tag-${item.tag}`}>{TAG_LABELS[item.tag] || item.tag}</span>}
      </div>
    </>
  );

  return item.url ? (
    <a className="card" href={item.url} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <div className="card">{content}</div>
  );
};

const Showcase = ({ id, title, items = [], notes = [] }) => {
  if (!items.length && !notes.length) return null;

  return (
    <Reveal className="section" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section-label">{title}</h2>
      <div className="section-body">
        {items.length > 0 && (
          <div className="cards">
            {items.map((item) => <Card key={item.title} item={item} />)}
          </div>
        )}
        {notes.length > 0 && (
          <ul className="notes" aria-label="Notes">
            {notes.map((note) => (
              <li key={note.title}>
                <span>
                  <a href={note.links?.[0]?.url} target="_blank" rel="noopener noreferrer">{note.title}</a>
                  {note.type && <span className="note-type"> · {note.type.split(' / ')[0]}</span>}
                </span>
                {note.year && <span className="note-year">{note.year}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
};

export default Showcase;
```

`src/Components/Footer.jsx`:
```jsx
import React from 'react';

const relative = (path) => (path || '').replace(/^\//, '');

const Footer = ({ main }) => {
  const resources = main.resumeResources || {};

  return (
    <footer className="site-footer">
      <a href={`mailto:${main.email}`}>{main.email}</a>
      <nav aria-label="Résumé formats">
        <a href={relative(resources.ai)}>Résumé for AI (.md)</a>
        <a href={relative(resources.structured)}>JSON</a>
        <a href={relative(resources.text)}>TXT</a>
      </nav>
      <span>© {new Date().getFullYear()} {main.name}</span>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 3: Rewrite `src/App.jsx`:**

```jsx
import React from 'react';
import Header from './Components/Header';
import Hero from './Components/Hero';
import About from './Components/About';
import Experience from './Components/Experience';
import Showcase from './Components/Showcase';
import Ornament from './Components/Ornament';
import Footer from './Components/Footer';
import StructuredData from './Components/StructuredData';
import resumeData from './resumeData.json';

function App() {
  const { main, resume, portfolio = {} } = resumeData;
  const showcase = portfolio.showcase || {};

  return (
    <div className="page">
      <StructuredData data={resumeData} />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header main={main} />
      <main id="main-content">
        <Hero main={main} />
        <About main={main} />
        <Ornament />
        <Experience work={resume.work} />
        <Ornament />
        <Showcase id="work" title="Built at Work" items={showcase.work} />
        <Ornament />
        <Showcase id="home" title="Tinkering at Home" items={showcase.home} notes={portfolio.fieldNotes} />
      </main>
      <Footer main={main} />
    </div>
  );
}

export default App;
```

  - In `src/main.jsx`, delete the line `import './icons'; // Initialize icons`.
  - In `StructuredData.jsx`, change the `hasPart` source array to `[...(portfolio?.projects || []), ...(portfolio?.showcase?.home || []), ...(portfolio?.fieldNotes || [])]`.

- [ ] **Step 4: Replace `src/styles.css` in full:**

```css
/* Ink & Sea-glass: see docs/superpowers/specs/2026-10-14-professional-redesign-design.md */
:root {
  --ink: #121a26;
  --panel: #18212f;
  --cream: #f4f0e6;
  --muted: #b4ab97;
  --body-2: #cfc8b8;
  --rule: #263142;
  --acc: #6fc3b2;
  --acc-soft: rgba(111, 195, 178, 0.22);
  --tag-production: #86c99a;
  --tag-production-line: #4f8a62;
  --tag-lab: #9fb4d8;
  --tag-lab-line: #56688c;
  --font-display: 'Cormorant Garamond', 'EB Garamond', Georgia, serif;
  --font-body: 'EB Garamond', Georgia, serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --page-width: 760px;
  --label-col: 150px;
}

*, *::before, *::after { box-sizing: border-box; }
html { background: var(--ink); scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--ink);
  color: var(--cream);
  font-family: var(--font-body);
  font-size: 20px;
  line-height: 1.9;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; transition: color 0.2s ease; }
a:hover { color: var(--acc); }
:focus-visible { outline: 2px solid var(--acc); outline-offset: 3px; border-radius: 4px; }
img { display: block; max-width: 100%; }

.skip-link {
  position: absolute; left: 16px; top: -60px; z-index: 10;
  padding: 8px 14px; border-radius: 6px;
  background: var(--acc); color: var(--ink); font-size: 16px; line-height: 1.4;
}
.skip-link:focus { top: 16px; color: var(--ink); }

.page { max-width: var(--page-width); margin: 0 auto; padding: 26px 32px 46px; }

/* Header */
.site-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; font-size: 17px; line-height: 1.4; }
.site-header nav { display: flex; gap: 22px; color: var(--muted); font-size: 16px; }

/* Hero */
.hero { margin-top: 34px; text-align: center; }
.hero-ring {
  width: 168px; height: 168px; margin: 0 auto; padding: 5px; border-radius: 50%;
  border: 2px solid var(--acc-soft);
  box-shadow: inset 0 0 0 1px rgba(244, 240, 230, 0.12), 0 10px 40px -10px var(--acc-soft);
}
.hero-ring img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; background: var(--panel); }
.hero h1 {
  margin: 18px 0 6px;
  font-family: var(--font-display); font-weight: 600; font-size: 52px; line-height: 1.05; letter-spacing: 1.2px;
}
.role-line {
  margin: 0; color: var(--muted);
  font-family: var(--font-mono); font-size: 12px; line-height: 1.6; letter-spacing: 0.08em; text-transform: uppercase;
}
.role-line strong { color: var(--acc); font-weight: 500; }

/* Sections */
.section { display: grid; grid-template-columns: var(--label-col) minmax(0, 1fr); gap: 28px; margin-top: 44px; }
.section-label { margin: 0; font-family: var(--font-display); font-weight: 600; font-size: 26px; line-height: 1.2; }
.prose p { max-width: 480px; margin: 0 0 16px; }
.prose strong { color: #fff; font-weight: 600; }
.status-line { color: var(--muted); font-size: 18px; }
.figure { color: var(--acc); font-family: var(--font-mono); font-size: 0.82em; white-space: nowrap; }

/* Ornament */
.ornament { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 40px; color: var(--acc); }
.ornament-rule { width: 80px; height: 1px; background: linear-gradient(90deg, transparent, var(--acc)); }
.ornament-rule:last-child { background: linear-gradient(90deg, var(--acc), transparent); }

/* Experience */
.roles { display: grid; gap: 16px; margin: 0; padding: 0; list-style: none; }
.role-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; }
.role-title { margin: 0; font-size: 19px; font-weight: 500; line-height: 1.4; }
.role-company { color: var(--muted); font-weight: 400; }
.role-dates { color: var(--muted); font-family: var(--font-mono); font-size: 12px; white-space: nowrap; }
.role-summary { margin: 2px 0 0; color: var(--body-2); font-size: 16px; line-height: 1.55; }

/* Showcase cards */
.cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.card {
  display: flex; flex-direction: column; overflow: hidden;
  background: var(--panel); color: var(--cream);
  border: 2px solid var(--acc-soft); border-radius: 8px;
  box-shadow: 0 4px 20px -6px var(--acc-soft);
  transition: transform 0.2s ease, border-color 0.2s ease;
}
a.card:hover { transform: translateY(-3px); border-color: var(--acc); color: var(--cream); }
.card-media { width: 100%; height: 112px; border-bottom: 1px solid var(--acc-soft); object-fit: cover; }
.card-glyph { display: flex; align-items: center; justify-content: center; background: #0d131c; color: var(--acc); }
.card-body { display: flex; flex: 1; flex-direction: column; gap: 6px; padding: 12px 13px 14px; }
.card-title { margin: 0; font-family: var(--font-display); font-weight: 600; font-size: 20px; line-height: 1.15; }
.card-arrow { color: var(--acc); font-size: 0.8em; }
.card-summary { margin: 0; color: var(--body-2); font-size: 15px; line-height: 1.45; }
.tag {
  align-self: flex-start; margin-top: auto; padding: 2px 8px;
  border: 1px solid; border-radius: 99px;
  font-family: var(--font-mono); font-size: 10.5px; line-height: 1.6;
}
.tag-patented { color: var(--acc); border-color: var(--acc); }
.tag-production { color: var(--tag-production); border-color: var(--tag-production-line); }
.tag-lab { color: var(--tag-lab); border-color: var(--tag-lab-line); }

/* Notes */
.notes { margin: 22px 0 0; padding: 0; list-style: none; }
.notes li { display: flex; justify-content: space-between; gap: 16px; padding: 6px 0; font-size: 18.5px; line-height: 1.5; }
.note-type { color: var(--muted); font-size: 13px; }
.note-year { padding-top: 5px; color: var(--muted); font-family: var(--font-mono); font-size: 12px; white-space: nowrap; }

/* Footer */
.site-footer {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 24px;
  margin-top: 56px; padding-top: 18px; border-top: 1px solid var(--rule);
  color: var(--muted); font-size: 15px; line-height: 1.5;
}
.site-footer nav { display: flex; flex-wrap: wrap; gap: 16px; }

/* Entrance motion */
.reveal { transition: opacity 0.3s ease, transform 0.3s ease; }
.reveal-hidden { opacity: 0; transform: translateY(8px); }

@media (max-width: 900px) {
  .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media screen and (max-width: 768px) {
  body { font-size: 18px; }
  .page { padding: 20px 16px 40px; }
  .site-header nav { gap: 16px; }
  .hero h1 { font-size: 38px; }
  .section { grid-template-columns: minmax(0, 1fr); gap: 12px; margin-top: 36px; }
}

@media (max-width: 560px) {
  .cards { grid-template-columns: minmax(0, 1fr); }
  .card-media { height: 150px; }
  .role-head { flex-wrap: wrap; gap: 0 12px; }
  .notes li { flex-wrap: wrap; gap: 0 12px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal, .card, a { transition: none; }
  .reveal-hidden { opacity: 1; transform: none; }
  a.card:hover { transform: none; }
}
```

- [ ] **Step 5: Update `index.html`.** After the two `preconnect` lines, add:

```html
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" />
```

  Then change `theme-color` to `#121a26`. In `public/manifest.json`, set any `theme_color` or `background_color` to `#121a26`.

- [ ] **Step 6: Delete the old components and dependencies:**

```bash
git rm src/Components/HeroScene.jsx src/Components/Scene3D.jsx src/Components/SectionShapes.jsx src/Components/Navigation.jsx src/Components/Work.jsx src/Components/Contact.jsx src/Components/Social.jsx src/Components/AnimatedSection.jsx src/icons.js
npm uninstall three @react-three/fiber @react-three/drei framer-motion @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

  (On this machine npm needs `NODE_EXTRA_CA_CERTS=C:\ProgramData\Norton\Antivirus\wscert.pem`, which is already set in the user environment.)

- [ ] **Step 7: Build and test.**
  - Run `npm test`: 11 pass.
  - Run `npm run build`: it passes with no chunk-size warning, and the total JS is under 200 KB.
  - `grep -rnE "framer-motion|three|fortawesome" src` must return nothing.

- [ ] **Step 8: Browser checks** (production preview via `.claude/launch.json` "preview" on port 4173). Run both the desktop and the 390×844 checks:
  - **Review Focus 3 (motion):** with reduced-motion emulated, every `.reveal` is visible (opacity 1).
  - **Review Focus 4 (fallbacks):** in DevTools, temporarily remove `url` and `glyph` from one home item in memory (or check that the `GLYPHS.flow` fallback and the `div.card` branch exist in the code). A card without a `url` must not render as an `<a>`.
  - **Review Focus 5 (phone):** no horizontal overflow at 390px; the header fits on one line; the role dates wrap below the title.
  - The photo loads; all six cards render; the three work cards link to their context pages; the notes link to their lab pages; there are no console errors.

- [ ] **Step 9: Commit.** `git add -A src index.html public/manifest.json package.json package-lock.json` then `git commit -m "feat: Ink & Sea-glass professional redesign"`.

---

### Task 4: Documentation, governance, and final validation

**Files:**
- Modify: `CLAUDE.md`, `AGENTS.md`, `.agent/rules.md`, `.project_context/overview.md`, `.project_context/resume-content-governance.md`
- Create: `.workflow_context/professional-redesign-2026-10-14.md`

- [ ] **Step 1: In `CLAUDE.md` and `AGENTS.md`, replace the Components list and Design Rules** with:

```markdown
**Components:**
- `Header.jsx` — Name plus Résumé / GitHub / LinkedIn text links
- `Hero.jsx` — Photo ring, name, monospace role line
- `About.jsx` — `main.professionalBio` paragraphs and status line
- `Experience.jsx` — Reverse-chronological roles via `src/lib/dates.js`
- `Showcase.jsx` — Card grid used for "Built at Work" and "Tinkering at Home" (with field notes)
- `Inline.jsx` — Renders `**bold**` and `` `figure` `` markup from `src/lib/inlineFormat.js`
- `Reveal.jsx` — IntersectionObserver fade-in, disabled for reduced motion
- `Ornament.jsx`, `Footer.jsx`, `StructuredData.jsx`

**Tests:** `npm test` runs `node --test src/lib/`.

## Design Rules ("Ink & Sea-glass")

- **Dark only**: ink `#121a26`, panels `#18212f`, cream text `#f4f0e6`, accent sea-glass teal `#6fc3b2`; use the CSS variables in `src/styles.css`.
- **Typography**: Cormorant Garamond (name, section labels, card titles), EB Garamond (body), JetBrains Mono (dates, figures, tags).
- **Signature**: node-and-edge ornament between sections; metrics in teal monospace via `` `figure` `` markup.
- **Motion**: CSS-only fade and card lift; nothing animates under `prefers-reduced-motion`. No three.js, Framer Motion, or particle effects.
- **Icons**: none; use text links. No emoji.
- **Styling**: custom CSS only (not Tailwind), a single `styles.css`.
```

  Also replace the "Testing: no test runner" line with the `npm test` note.

- [ ] **Step 2: In `.agent/rules.md`, replace sections 2–3** (the Tech Stack styling and typography bullets and "Design Philosophy") with the same Ink & Sea-glass rules, and drop the "project carousel" and "Three.js atmosphere" references.

- [ ] **Step 3: In `.project_context/overview.md`, update "Midnight Technical Editorial", "Core Components", and "Current Experience Direction"** to describe the professional page: photo hero, About bio, Experience, Built at Work, Tinkering at Home with notes, footer résumé formats, Ink & Sea-glass, and no 3D.

- [ ] **Step 4: In `.project_context/resume-content-governance.md`:**
  - Replace the "Preserve these About-section quotations…" block with: "The three former About quotations were retired by Ted on 2026-10-14; the About section now uses `main.professionalBio`."
  - Replace "Do not reintroduce generated portraits. The current design is intentionally portrait-free." with: "Use only Ted's real photo (`public/images/tedprofile/`), approved 2026-10-14. Never use generated portraits."
  - Add: "Showcase cards (`portfolio.showcase.work` / `.home`) follow the same public-safety rules; work cards link to public product-context pages, which provide context, not attribution."

- [ ] **Step 5: Write `.workflow_context/professional-redesign-2026-10-14.md`** with `## Direction`, `## Implementation`, and `## Validation` sections, recording the real results of Task 3 Steps 7–8 and Step 6 below.

- [ ] **Step 6: Final validation.**
  - Repeat the public-safety leak scan from the content sync over `src/resumeData.json`, `public`, `build/index.html`, and the docs. It should find no revenue figures, partner names, award name, AI-enablement metrics, or `tedahn.pw`.
  - `grep -rnE "Capital One|USAA|WEBTOON|4M|17,000" src/Components` must return nothing.
  - No quotation text remains in `src/` or `public/`.

- [ ] **Step 7: Commit.** `git add CLAUDE.md AGENTS.md .agent/rules.md .project_context .workflow_context` then `git commit -m "docs: document Ink & Sea-glass design system"`.
