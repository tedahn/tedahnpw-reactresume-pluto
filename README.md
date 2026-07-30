# Pluto: Modern React Portfolio 🪐

The public portfolio of **Ted Ahn**, presenting senior software engineering work across backend systems, cloud infrastructure, distributed systems, and enterprise AI.

> **Live Site**: [tedahn.com](https://www.tedahn.com/)

## 🚀 Tech Stack

*   **Core**: React 18, JavaScript (ES6+)
*   **Build Tool**: [Vite](https://vitejs.dev/) (Fast HMR & Bundling)
*   **Styling**: Custom CSS3, CSS Variables, Glassmorphism UI
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Atmosphere**: React Three Fiber / Three.js
*   **Icons**: FontAwesome

## 🛠️ Usage

This project uses `npm` and `vite`.

### Setup
```bash
npm install
```

### Development
Start the local dev server:
```bash
npm run dev
```

### Production Build
Build the project for deployment:
```bash
npm run build
```
The output is written to the `build` directory.

## 📂 Project Structure

*   `src/Components`: Reusable UI components (Experience, Work, Contact, etc.)
*   `src/resumeData.json`: **Single Source of Truth** for all content (text, links, timeline).
*   `src/styles.css`: Global styles, variables, and responsive layout.
*   `public/images/impact`: Local imagery for public product-context links.
*   `.project_context`: Long-lived product direction and resume-content governance.
*   `.workflow_context`: Dated implementation and validation handoffs.

## Agent and GPT Sol Context

Start with:

1. `AGENTS.md`
2. `.project_context/overview.md`
3. `.project_context/resume-content-governance.md`
4. The newest relevant file in `.workflow_context/`

A reusable maintenance brief is available at `docs/sol-resume-site-maintenance-prompt.md`.

## 📜 License & Credits

*   Designed & Developed by Ted Ahn.
*   Original conceptual references: React FullpageJS, React Waypoint (Legacy).
*   Feel free to fork for your own portfolio! Verification of personal data removal is recommended.
