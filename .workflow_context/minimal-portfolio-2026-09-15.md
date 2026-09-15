# Minimal portfolio redesign — 2026-09-15

## Implemented

- Compact profile-card layout and responsive navigation; initials preserve the portrait-free content boundary.
- Experience first, with existing career data and approved quotations preserved exactly.
- Ditto Factory and Marketplace Matching Engine walkthroughs with explicit personal-project and reconstruction limits.
- Concise research notes, accessible disclosure controls, direct resume/contact actions, secondary resume formats.
- Removed decorative 3D components, animated section wrappers, and global icon registration.
- Fixed the resume action to use the existing printable resource; relative resume resource links preserve hosted base paths.
- Current-employment structured data and safely serialized JSON-LD.
- Regenerated HTML, Markdown, text, JSON, and discovery assets; included project evidence limits in resume exports.
- Added rendered-markup regression checks and a pull-request validation workflow; production deployment workflow unchanged.

## Validation

- `npm run check`: passed; actual React output verified, 14 unique IDs and 33 links, local images, resume resources, current employer, and project evidence.
- `npm run build`: passed; output JavaScript 246.35 kB / 78.91 kB gzip; CSS 11.97 kB / 3.33 kB gzip. No Three.js chunk emitted.
- Compared canonical career data with base commit: work, education, skills, quotations, and availability unchanged.
- `git diff --check`: passed.
- Browser verification: incomplete. The browser navigation connection stalled on two attempts. No desktop/mobile screenshots, interaction result, visual approval, or performance score is claimed.

Keep the website PR in draft until the desktop, 390px mobile, keyboard, disclosure, resume print, and reduced-motion checklist in the implementation plan has been reviewed. No production deployment or merge was performed.
