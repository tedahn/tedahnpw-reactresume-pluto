# Repository Agent Rules

## 1. Project Context Management (CRITICAL)
Future agents MUST treat the `.project_context` directories as the **source of truth** for the repository's identity, not current tasks.

### A. Context Separation
*   **Project Context (`.project_context/overview.md`)**: **LONG-LIVING**. This defines the repository's identity, business purpose, architecture, and design direction.
*   **Resume Governance (`.project_context/resume-content-governance.md`)**: **LONG-LIVING**. This defines career-source priority, public-safety boundaries, approved public narrative, and validation.
*   **Workflow Context (`.workflow_context/`)**: **SHORT-LIVED**. This contains the specific task definitions, active sprints, or immediate goals (e.g., "Modernization Sprint 2025").

### B. Living Documentation Cycle
1.  **Reference**: Always check `.project_context` for the "Vision" and "Architecture".
2.  **Execution**: Drive daily work via `.workflow_context`.
3.  **Updates**: Only update `.project_context` if the fundamental architecture or business goals change.

## 2. Tech Stack Requirements
*   **Framework**: Use **React** (v18+) with **Vite**.
*   **Styling**: Standard custom CSS in a single `src/styles.css`, driven by the `:root` token set (not Tailwind).
    *   **Dark only**: ink `#121a26`, panels `#18212f`, cream text `#f4f0e6`, sea-glass teal accent `#6fc3b2`.
*   **Typography**: **Cormorant Garamond** for the name, section labels and card titles; **EB Garamond** for body copy; **JetBrains Mono** for dates and figures.
*   **Icons**: None; use text links. No emoji.
*   **Dependencies**: Runtime dependencies are `react` and `react-dom` only. Do not reintroduce three.js, Framer Motion or icon libraries without an approved spec.

## 3. Design Philosophy ("Ink & Sea-glass")
*   **Visuals**: A quiet, editorial professional page: Ted's real photo in a teal ring, serif typography, the node-and-edge ornament between sections, and metrics in teal monospace. Spec: `docs/superpowers/specs/2026-10-14-professional-redesign-design.md`.
*   **Composition**: The first viewport establishes identity (photo, name, role). Evidence follows in Experience, **Professional Projects** (enterprise systems) and **Independent Projects** (personal projects and field notes), kept as separate sections.
*   **Interaction**: Restrained: a CSS fade on section entry and a card lift on hover, both disabled under `prefers-reduced-motion`.
*   **Accessibility**: Preserve semantic landmarks, the skip link, keyboard navigation, visible focus states, reduced-motion handling, and mobile readability.

## 4. Deployment & Operations
*   **GitHub Pages**: The project deploys via GitHub Actions (`.github/workflows/deploy.yml`).
*   **Configuration**:
    *   **DO NOT** modify the `base: './'` setting in `vite.config.js` unless hosting changes.
*   **Asset Management**:
    *   Store public images under `public/`; experience-context images currently live in `public/images/impact/`.
    *   Manage all career content and project metadata in `src/resumeData.json`. Do not hardcode career facts in React components.

## 5. Agent Behavior
*   **Proactive Maintenance**: If you notice `overview.md` is outdated (e.g., refers to old tech), fix it immediately.
*   **Context Continuity**: Before ending a session, update long-lived project context only for durable changes and write dated implementation state to `.workflow_context/`.
*   **Public Safety**: Treat the repository as public. Do not copy internal career notes, confidential details, or recruiting-only information into it.
