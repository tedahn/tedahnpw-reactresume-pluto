# Session Context Artifact: Visual Polish & Architecture Refinement
**Date**: December 11, 2025
**Session Goal**: Transform the portfolio from a functional Resume Viewer into a "Premium Digital Experience" through advanced CSS architecture, refined animations, and professional asset management.

## 1. Core Architecture Changes

### A. The "Schematic" Timeline Layout (`styles.css`)
**Problem**: The previous timeline used loose floats and inconsistent pixel-based margins, causing alignment issues on different screen widths. The "dots" were misaligned, and there was no visual connection between the card and the central line.

**Solution**:
1.  **Strict Percentage Grid**:
    *   Adopted a structured grid where **Cards** occupy exactly `45%` of the container width.
    *   The **Central Gap** is `10%` total (5% on each side of the center line).
2.  **Mathematical Precision**:
    *   To place the "Timeline Dot" exactly on the center line, we calculated the offset based on the parent container's width relative to the child.
    *   **Formula**: `(Gap / Card Width) = (5% / 45%) ≈ 11.11%`.
    *   **Implementation**: `right: calc(-11.11% - 9px)` (9px = 8px radius + 1px half-line width).
3.  **Visual Connectors**:
    *   Introduced `::before` pseudo-elements to create "Connector Arms".
    *   **Styling**: `width: 11.15%` to span the gap perfectly.
    *   **Gradient**: `linear-gradient(90deg, ...)` used to fade the line from the card to the center, creating a "schematic" or "circuit board" aesthetic.

### B. "Pill Badge" Tech Stack (`Work.jsx`)
**Problem**: Using generic FontAwesome icons (like `faBrain` or `faCode`) for specific technologies (TensorFlow, Framer Motion) was ambiguous and confusing to users.

**Solution**:
1.  **Component Redesign**: Wrappped icons in a styled `span.tech-badge` container in `Work.jsx`.
    *   **Structure**: `<Icon /> + [Space] + Tool Name`.
2.  **CSS Styling**:
    *   Created a "Glass Pill" look: `border-radius: 50px`, `background: rgba(255,255,255,0.08)`, `border: 1px solid var(--glass-border)`.
    *   This converts abstract symbols into clear, readable labels (e.g., "🧠 TensorFlow", "🎓 Education") while retaining the visual flair of the icons.

## 2. Interactive & visual Polish

### A. Achievement Gamification (`Experience.jsx`)
*   **Concept**: Shifted from "Trophy Hunter" (boastful) to "Core Memories" (highlight).
*   **Icon Swap**: Replaced `faTrophy` with `faStar` (Gold).
*   **Card Design**:
    *   Converted bullet points into distinct "Micro-Cards" inside the main timeline block.
    *   **Interaction**: Added a "springy" hover effect (`scale(1.02)`) with a localized glow (`box-shadow`), making the resume feel tactile and rewarding to explore.
    *   **Alignment**: Enforced `text-align: left` to prevent the awkward "ragged left" text that occurred on right-aligned timeline blocks.

### B. Animation Physics (`AnimatedSection.jsx`)
*   **Refinement**: The initial "Spring + Scale" animation was too chaotic for the dense list items in the timeline.
*   **Adjustment**:
    *   **Timeline**: Reverted to a smooth, reliable `easeOut` slide-up (`y: 30px` -> `0`). Removed scaling to reduce visual noise.
    *   **Grid Items**: Retained the high-energy "Spring" bounce for the `Work` portfolio grid, as the isolated cards benefit from the dynamic entrance.

## 3. Asset Optimization

### A. Image Compression
**Action**: Downscaled all project and experience assets to web-optimized dimensions.
*   **Tool**: macOS `sips` (Scriptable Image Processing System).
*   **Command**: `sips -Z 512 public/images/**/*.png`
*   **Result**: Reduced generic 1024x1024 generation outputs to **512x512**.
*   **Impact**: Estimated **75% reduction** in image bandwidth usage, significantly improving LCP (Largest Contentful Paint) scores.

## 4. Data Logic Updates

### A. `resumeData.json` Expansion
*   **Timeline Resume Project**: Updated the "Tools" list to accurately reflect the tech stack used to build *this* site:
    *   Added: `html5`, `git`, `node`, `framer-motion`.
*   **Icon Mapping (`icons.js`)**:
    *   Added brand icons: `faHtml5`, `faGit`, `faNode`.
    *   Mapped `framer-motion` to the generic `faCode` icon since a brand icon doesn't exist.

## 5. Files Touched
*   `src/styles.css`: Heavy architectural refactoring (Timeline Grid, Connector Lines, Card Styling).
*   `src/Components/Work.jsx`: Refactored map loop for "Pill Badges".
*   `src/Components/Experience.jsx`: Structure updates for Achievement Cards and Icon Badges.
*   `src/Components/AnimatedSection.jsx`: Tuned animation physics.
*   `src/App.jsx`: Fixed scroll-spy synchronization bug on mount.
*   `src/icons.js`: Expanded icon library imports.
*   `src/resumeData.json`: Data enrichment.
*   `public/images/*`: Binary asset optimization.
