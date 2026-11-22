# Resume Content Governance

This document defines the durable rules for maintaining Ted Ahn's public resume website. It is written for GPT Sol and other coding agents working in this repository.

## Audience and Purpose

The site is Ted's public professional profile for technical leaders, collaborators, and engineering peers. Ted's current employer, Capital One, actively monitors it (confirmed 2026-11-22), so it must read as an employer-friendly profile, not a job search. It should establish Ted's current professional identity in the first viewport, show clear career progression, and support claims with concise evidence.

The preferred positioning is:

- Senior software engineering
- Backend, distributed, and event-driven systems
- Cloud-native infrastructure and reliability
- Enterprise AI and AI-assisted engineering
- Technical leadership, enablement, and customer-oriented impact

## Content Source Hierarchy

Career material is maintained outside this public repository. When reconciling content, use this order:

1. The latest explicitly approved resume or CV for current titles, dates, positioning, and public claims. The current approved resume is the October 2026 revision of the 2026 technical resume.
2. The sibling career-ops repository for canonical chronology, authorship boundaries, supporting evidence, and internal interview context.
3. Direct user confirmations, including the July 2024 Capital One promotion date.
4. src/resumeData.json as the website's public presentation layer.

If authoritative sources conflict materially and a direct user decision does not resolve the conflict, stop and ask one narrow question. Never guess.

## Public-Safety Boundary

This repository is public. Do not copy internal career notes or interview material into it.

Exclude or generalize:

- Confidential company, customer, campaign, partner, or organizational information
- Proprietary platform names and implementation details that are not already public
- Internal adoption counts or operational metrics unless explicitly approved for public use
- Compensation, relocation, visa, recruiting, and application-process information
- Unsupported revenue, company-wide causality, or sole-authorship claims

Prefer defensible verbs such as “supported,” “enabled,” “helped deliver,” “contributed to,” or “co-developed” when ownership is shared. Public product pages provide context only; they are not evidence that Ted caused company-wide outcomes.

## Approved Public Narrative

Rewritten on 2026-11-22 because Capital One monitors the site. The public narrative emphasizes:

- Senior Software Engineer with 6+ years of experience
- Capital One progression from Software Engineer to Senior Software Engineer in July 2024
- Marketing platform work at Capital One: a simplified onboarding redesign, a shared marketing capability for auto dealers, digital marketing pilots built with spec-driven development, and automated failover and resilience testing
- Event-driven vehicle-data pipelines behind Auto Navigator, and modernizing dealer-data ingestion on cloud-native AWS
- US 12,748,724 B2, "Converting a data stream into files": Ted is one of six named inventors and led the design (confirmed by Ted on 2026-11-22)
- A reactive USAA communications platform processing 1M SMS messages per hour
- Distributed systems, reliability, cloud-native infrastructure, and responsible AI-assisted engineering
- UT Austin Postgraduate Certificate in Artificial Intelligence and Machine Learning, November 2025

### Employer-friendly rules (2026-11-22)

- Describe Capital One work only in general terms. Do not publish internal figures (record volumes, dealership or feed counts, tenant counts, system counts, the age of replaced systems), internal incidents, award names, pilot priority or team-formation details, or internal platform descriptions.
- Describe the patent only from its published text. Credit Ted as having "led the design" and as a co-inventor; do not tie the patent to a named production system or attach internal figures to it.
- Do not publish job-search signals: no recruiter-facing wording, role-fit recommendations, interview questions, availability notes for recruiters, or "what I want next" framing. The Markdown asset is an "AI-readable profile", not a recruiter brief.
- USAA, a former employer, keeps a light-touch description (2026-11-22): the 1M SMS/hour severe-weather alerting platform and helping modernize a critical legacy system. Do not reintroduce "USAA's first", the legacy system's age, or security-patch detail.
- Webtoon may also watch the site. Its entry stays soft (rewritten 2026-11-22): Ted was its first US software engineering intern, built an early data-analysis pipeline and an internal engagement dashboard, and explored how to help readers discover titles. Do not name internal tools (including the dashboard's internal name), describe Webtoon's data or metrics, list tools used, or claim credit for founding Webtoon's data team or internship program.

The three former About-section quotations were retired by Ted on 2026-10-14. The About section uses `main.professionalBio`; do not reintroduce the quotations without Ted's explicit request.

### Withheld by Decision

- Revenue figures and marketing-pilot partner names are excluded from the public site and from all generated assets.
- The former AI-enablement achievement and its metrics must not be reintroduced.
- Everything listed under the employer-friendly rules above stays out until Ted explicitly approves otherwise.

Do not add any of the withheld material back without Ted's explicit approval.

## Website Content Rules

- src/resumeData.json is the only source of career content.
- Never hardcode biography, employment, education, achievements, projects, links, or contact details in components.
- Adapt source material for web scanning; do not paste long resume bullets verbatim.
- Preserve chronology, authorship, metrics, and attribution.
- Keep `portfolio.projects` empty. Do not reintroduce SMILE or Glow project cards or generated resume entries unless Ted explicitly requests them.
- Showcase cards (`portfolio.showcase.work` for enterprise systems, `portfolio.showcase.home` for independent projects) follow the same public-safety rules. Work cards link to public product-context pages, which provide context, not attribution. Keep the two sections separate.
- Keep public product links contextual and retain their local static images under public/images/impact/.
- Use only Ted's real photo (`public/images/tedprofile/`), approved 2026-10-14. Never use generated portraits.
- Avoid duplicate claims across the hero, About, timeline, projects, and closing section.

## Required Validation

For career-content changes:

1. Compare each changed claim with the approved resume and supporting career-ops evidence.
2. Verify employment, promotion, project, and education chronology.
3. Search components for hardcoded career facts.
4. Check duplicate section IDs, local assets, and product URLs.
5. Run npm run build.
6. Inspect desktop and 390px-class mobile layouts, including an impact-link card.
7. Report anything intentionally withheld or unresolved.
