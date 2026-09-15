# Minimal engineering portfolio implementation

## Goal

Make Ted's experience and implementation work easy to evaluate. The requested redesign takes its compact profile-card structure from the supplied visual reference while retaining the approved career narrative.

## Implementation

1. **Profile and navigation:** compact identity card, initials instead of a generated portrait, direct printable resume and email actions, GitHub/LinkedIn links, responsive navigation.
2. **Experience:** reverse-chronological Capital One progression and USAA accomplishments; expandable earlier experience and education; retain product-context links and assets.
3. **Selected work:** Ditto Factory and the Marketplace Matching Engine, each with an implementation link and an expandable walkthrough of the question, focus, design, tradeoff, and evidence limits.
4. **Supporting material:** concise architecture and agent-evaluation notes, approved About quotations, technical toolkit, contact, and secondary resume formats.
5. **Presentation:** charcoal surfaces, restrained warm accent, one-column mobile flow, sticky desktop profile when viewport height permits, readable typography and keyboard focus. Remove 3D canvases, scroll reveal wrappers, and global icon registration.
6. **Content integrity:** keep career chronology and existing approved metrics unchanged. All content remains in `src/resumeData.json`; generated resume formats carry project limitations. Correct structured data so only current employment appears in `worksFor`.
7. **Regression checks:** render the actual React application on the server; verify resume targets, anchors, IDs, local assets, employment metadata, and project evidence. Run the production build.
8. **Review:** open a feature-branch PR. Desktop and 390px mobile interaction checks remain a review gate if the browser connection cannot complete them.

## Boundaries

No deployment, domain change, invented employment results, generated portrait, or revival of the removed SMILE/Glow projects. The original dependency versions and lockfile are preserved. The GitHub profile README is proposed separately because it lives in a different repository.

## Visual review checklist

- Desktop: profile and experience align; profile actions remain reachable at short viewport heights.
- Mobile (390px and 320px): no horizontal overflow; navigation opens, closes, and supports Escape; text and controls remain readable.
- Keyboard: skip link, resume action, navigation, details, and external links are reachable.
- Expand a project walkthrough and a product-context card.
- Open the resume and use its print/save-PDF action.
- Check reduced motion and text enlargement.
