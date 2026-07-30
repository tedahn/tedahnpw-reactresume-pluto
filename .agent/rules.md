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
*   **Styling**: Custom **CSS Modules / Standard CSS** with **Glassmorphism** variables.
    *   **Dark Mode**: Default background `#0f172a`.
    *   **Glassmorphism**: Use `backdrop-filter: blur()` and transparent backgrounds.
    *   *Note: This specific legacy migration uses custom CSS, not Tailwind.*
*   **Typography**: Use **Google Sans / Google Sans Text** for display and body copy, with **JetBrains Mono** for technical labels.
*   **Icons**: FontAwesome via `@fortawesome/react-fontawesome`.

## 3. Design Philosophy ("Midnight Technical Editorial")
*   **Visuals**: Preserve deep navy surfaces, restrained teal/cyan accents, glass borders, schematic details, editorial-scale headings, and the current CSS token system.
*   **Composition**: Keep the first viewport focused on current professional identity. Use the timeline and project carousel to supply evidence without turning the page into a generic card grid.
*   **Interaction**: Preserve the existing navigation, scroll-spy, Framer Motion entrances, project carousel, and restrained Three.js atmosphere.
*   **Accessibility**: Preserve semantic landmarks, keyboard navigation, visible focus states, reduced-motion handling, and mobile readability.

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
