# Resume Content Governance

This document defines the durable rules for maintaining Ted Ahn's public resume website. It is written for GPT Sol and other coding agents working in this repository.

## Audience and Purpose

The site is a public, recruiter-facing portfolio for hiring managers, technical leaders, collaborators, and engineering peers. It should establish Ted's current professional identity in the first viewport, show clear career progression, and support claims with concise evidence.

The preferred positioning is:

- Senior software engineering
- Backend, distributed, and event-driven systems
- Cloud-native infrastructure and reliability
- Enterprise AI and AI-assisted engineering
- Technical leadership, enablement, and customer-oriented impact

## Content Source Hierarchy

Career material is maintained outside this public repository. When reconciling content, use this order:

1. The latest explicitly approved resume or CV for current titles, dates, positioning, and public claims.
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

The current public narrative emphasizes:

- Senior Software Engineer with 6+ years of experience
- Capital One progression from Software Engineer to Senior Software Engineer in July 2024
- A patented event-driven Auto Navigator data integration processing 3M+ vehicle records daily
- A reactive USAA communications platform processing 1M SMS messages per hour
- Distributed systems, reliability, cloud-native infrastructure, and responsible AI-assisted engineering
- UT Austin Postgraduate Certificate in Artificial Intelligence and Machine Learning, November 2025

Preserve these About-section quotations unless Ted explicitly requests a change:

1. “Programming is both my profession and my passion.”
2. “My goal is to build connections in dynamic, interprofessional environments.”
3. “To me, being 'Customer-Oriented' means my work ethic is passion-driven and my engineering is people-driven.”

## Website Content Rules

- src/resumeData.json is the only source of career content.
- Never hardcode biography, employment, education, achievements, projects, links, or contact details in components.
- Adapt source material for web scanning; do not paste long resume bullets verbatim.
- Preserve chronology, authorship, metrics, and attribution.
- Keep the public project showcase omitted. Do not reintroduce SMILE or Glow project cards or generated resume entries unless Ted explicitly requests them.
- Keep public product links contextual and retain their local static images under public/images/impact/.
- Do not reintroduce generated portraits. The current design is intentionally portrait-free.
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
