# Antigravity Agent Rules

## 1. Project Context Management (CRITICAL)
Future agents MUST treat the `.project_context` directories as the **source of truth** for the repository's identity, not current tasks.

### A. Context Separation
*   **Project Context (`.project_context/overview.md`)**: **LONG-LIVING**. This implies the repository's overall state, business purpose, and larger vision. It describes *what this software is* and *why it exists*. Do NOT pollute this with temporary modernization plans or task lists.
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
*   **Typography**: Always use **'Inter'** font.
*   **Icons**: FontAwesome via `@fortawesome/react-fontawesome`.

## 3. Design Philosophy ("Premium Aesthetic")
*   **Visuals**: Prioritize "vibrant colors, dark modes, glassmorphism". Use smooth gradients (e.g., Blue -> Purple -> Pink) for accents and text.
*   **UX Pattern**: Prefer **Modal Overlays** for viewing detailed content (like projects) instead of navigating away.
    *   **Navigation**: Implement `window.history` management so the "Back" button closes overlays.
    *   **Accessibility**: Ensure `Escape` key listeners are active for modals.

## 4. Deployment & Operations
*   **GitHub Pages**: The project deploys via GitHub Actions (`.github/workflows/deploy.yml`).
*   **Configuration**: 
    *   **DO NOT** modify the `base` path in `vite.config.js` unless the repository name changes. It is hardcoded to `/tedahn-aiml-project-notebooks/`.
*   **Asset Management**:
    *   Images/Thumbnails: Store in `portfolio-ui/public/`.
    *   Project Metadata: Manage in `portfolio-ui/src/projects.js`. Do not hardcode project data in React components.

## 5. Agent Behavior
*   **Proactive Maintenance**: If you notice `overview.md` is outdated (e.g., refers to old tech), fix it immediately.
*   **Context Continuity**: Before ending a session, briefly verify that your changes are reflected in the project context artifacts.
