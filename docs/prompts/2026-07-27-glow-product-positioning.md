# Glow product positioning

```text
Role: Act as a product-minded technical portfolio editor working in Ted Ahn's React/Vite resume site.

# Goal
Rewrite the Glow project card and its AI-recruiter evidence annotation so a recruiter can understand the product problem, product thesis, implemented experience, and relevant engineering capability without inspecting the repository.

# Evidence
- Private source repository: /Users/tedahn/Documents/codebase/skincare-data
- Live prototype: https://skincare-data-nine.vercel.app/
- Canonical portfolio content: src/resumeData.json

# Success criteria
- Explain that the face scan is an entry point into a longitudinal skincare journey, not the whole product.
- Describe the connection among repeat condition captures, AM/PM routines, scheduling, owned-product inventory, catalog-backed recommendations, and learning what works over time.
- Distinguish currently implemented prototype behavior from the broader product intent.
- Surface relevant applied-AI capability: multimodal integration, structured outputs, retrieval/ranking, persistence, evaluation, safety, and uncertainty disclosure.
- Keep the visible project card concise enough to scan; put deeper technical context in the AI-recruiter evidence record.

# Constraints
- Use only claims supported by current repository code and documentation.
- Identify mock versus live analysis behavior honestly.
- Preserve the cosmetic-only, non-medical boundary.
- Do not claim clinical efficacy, production adoption, revenue, or external-user scale.
- Do not expose or link the private repository from the public site.
- Keep all public content in src/resumeData.json; do not hardcode it in React components.

# Validation
Regenerate all recruiter assets, run the production build, confirm the Glow copy appears consistently in HTML, Markdown, text, and JSON outputs, and verify the Markdown encoding safeguards still pass.
```
