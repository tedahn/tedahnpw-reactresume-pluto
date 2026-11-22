# Patent Section — 2026-11-22

## Direction

Ted asked for the details of US 12,748,724 to appear on the site. The patent is public record, so its title, number, dates, assignee and inventor list sit within the public-safety boundary.

## Source verification

- USPTO Official Gazette patentee index (issue of September 29, 2026): patent 12748724, class G06F 16/116, inventors Justin Leonard, Dennis J. Mire, Sarvani Maddina, Ravi Kalidindi, Arun Gopalakrishna and Hyounggun Ahn.
- Justia Patents (Capital One Services, LLC assignee listing): title "Converting a data stream into files", filed April 9, 2024, date of patent September 29, 2026, plus the abstract.
- Google Patents: pre-grant publication US20250315406A1 (priority date 2024-04-09, published 2025-10-09) under the same title, which makes the grant a B2.

## Implementation

- `resume.patents` in `src/resumeData.json` holds the record; `src/Components/Patents.jsx` renders it after Experience, reusing the role styles plus `.patent-meta`. Ted's own name is filtered out of the co-inventor line via `main.legalname`.
- `scripts/generate-resume-assets.mjs` adds a Patents block to `resume.txt`, `resume.html`, `resume.md` (with a shared-invention inference boundary) and a `patents` array to `resume.json`.
- The AI-brief supplement for the vehicle-data platform now cites the patent and notes six named inventors.

## Validation

- `npm test` and `npm run build` pass; all four generated `resume.*` assets contain US 12,748,724.
- Desktop (1280px) and 390px mobile previews show the section with no horizontal overflow, no duplicate IDs and no console errors.

## Link

As of 2026-11-22 Google Patents returns 404 for US12748724B2 and USPTO's image server refuses automated browsers. The entry links to the published application US20250315406A1 (same application 18/630,398, title and inventors) via `url` and `urlLabel`. Switch `url` to the B2 page once Google Patents indexes the grant.

## Summary wording

At Ted's request the patent summary leads with his design role and the design intent: keeping the event stream's guarantees for file-based legacy consumers through key-based partitioning, horizontal scale-out and self-healing (check-in files, retries, idempotent reruns). Each point maps to the published application (paragraphs [0016]-[0017], [0023], [0026], [0043]-[0048]). "Infinitely scalable" was deliberately avoided because the partition count is preconfigured.

## Attribution decision

Ted confirmed that he was the principal designer and architect of the patented method. The site now shows "Principal designer and architect" beside the co-inventor credit, and the existing "designed and patented" wording stands. The AI brief credits the design to Ted and the invention as shared; inventor order on the patent does not indicate contribution.
