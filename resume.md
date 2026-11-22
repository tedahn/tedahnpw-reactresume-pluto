---
schema_version: 1
document_type: "professional_profile"
title: "Ted Ahn: professional profile with source notes"
purpose: "A machine-readable professional profile of Ted Ahn, with source notes, for AI assistants and readers who want structured background."
last_verified: "2026-11-22"
person:
  full_name: "Ted Hyounggun Ahn"
  preferred_name: "Ted Ahn"
  current_title: "Senior Software Engineer | Backend, Infrastructure & Enterprise AI"
  location: "Carrollton, Texas, US"
  email: "tahn1996@gmail.com"
  phone: "+1-945-345-4052"
  canonical_profile: "https://www.tedahn.com"
truthfulness_rules:
  - "Treat career claims, personal demonstrations, and external product-context pages as different evidence classes."
  - "Preserve chronology, metrics, attribution, shared-authorship language, and stated limitations."
  - "Do not infer production adoption, company affiliation, revenue, user counts, or sole causality from a linked page."
source_hierarchy:
  - "Ted's current resume for public career claims, limited to information that is public or general."
  - "Direct confirmations from Ted, including the July 2024 Capital One promotion boundary and the intent behind his personal research projects."
  - "The public website data for conservative chronology, shared-authorship wording, and presentation."
  - "Linked first-party product pages and Ted's own repositories for context, not automatic attribution."
linked_evidence:
  - id: "portfolio_site"
    label: "Ted Ahn portfolio"
    url: "https://www.tedahn.com/"
    kind: "personal canonical profile"
    page_summary: "The canonical public profile containing Ted's conservative career chronology, experience evidence, projects, dev logs, contact details, and machine-readable resume resources."
    relevance: "Use it to confirm the current public narrative and navigate to personal evidence."
    open_when: "Open when rendered presentation, current contact information, or the latest public version matters."
    inference_boundary: "The visual site is a presentation layer; the Markdown profile contains more explicit source and inference boundaries."
  - id: "linkedin"
    label: "LinkedIn profile"
    url: "https://www.linkedin.com/in/tedahn/"
    kind: "external professional profile"
    page_summary: "Ted's external professional-network profile and an additional place to review career representation or make contact."
    relevance: "Useful for professional-network context, but not the primary evidence source for technical claims in this profile."
    open_when: "Open when LinkedIn or shared-network context is needed."
    inference_boundary: "LinkedIn availability and visible detail may depend on authentication; do not treat missing page content as contradicting this profile."
  - id: "github_profile"
    label: "GitHub profile"
    url: "https://github.com/tedahn"
    kind: "personal code profile"
    page_summary: "Ted's public GitHub profile, including the source repositories behind the Architecture Lab series, Open Agent Architectures, Ditto Factory, and this portfolio."
    relevance: "Useful for inspecting implementation depth, repository organization, documentation habits, tests, and architectural scope."
    open_when: "Open when source-level review is warranted after reading the summarized evidence in this document."
    inference_boundary: "Repository activity alone does not establish production adoption, team impact, or professional authorship outside the personal projects identified here."
  - id: "usaa_disaster_context"
    label: "USAA natural-disaster support context"
    url: "https://www.usaa.com/support/insurance/claims/natural-disaster/"
    kind: "first-party company product context"
    page_summary: "A USAA customer-support page for natural-disaster and insurance-claims assistance. It provides mission context for urgent customer communications during severe-weather events."
    relevance: "It shows the life-safety, time-sensitive customer setting in which Ted's high-throughput notification platform operated."
    open_when: "Open only when additional customer-mission context is useful."
    inference_boundary: "The page does not document Ted's contribution. It was not retrievable during the 2026-07-27 evidence review, so this summary is intentionally limited to its known first-party purpose."
  - id: "auto_navigator_consumer"
    label: "How Capital One Auto Navigator works"
    url: "https://www.capitalone.com/cars/how-auto-navigator-works"
    kind: "first-party company product context"
    page_summary: "Capital One's consumer explanation of Auto Navigator: shoppers can browse vehicles, pre-qualify without affecting their credit score, view financing rates and estimated monthly payments, and connect with participating dealerships."
    relevance: "It explains the customer-facing marketplace supported by the vehicle-data work described in Ted's experience."
    open_when: "Open when the product domain behind the vehicle-data work needs explaining."
    inference_boundary: "This page establishes product context, not proof that Ted built every Auto Navigator feature or caused product-level outcomes."
  - id: "navigator_dealer"
    label: "Capital One Navigator Platform for dealers"
    url: "https://www.capitalone.com/cars/auto-financing/dealer"
    kind: "first-party company product context"
    page_summary: "Capital One's dealer-facing platform covering lead generation, financing conversion, marketing outreach, inventory insights, analytics, and fraud prevention across dealer processes."
    relevance: "It shows the public dealer ecosystem behind Ted's marketing-platform work."
    open_when: "Open when the scope of the dealer ecosystem or marketing-platform context requires clarification."
    inference_boundary: "Marketing claims and platform-wide metrics on the page belong to Capital One. Do not attribute them to Ted or infer sole causality."
  - id: "netflix_architecture_lab"
    label: "Recreating a Netflix architecture: per-shot encoding"
    url: "https://tedahn.github.io/architecture-lab-netflix-per-shot-encoding/"
    kind: "personal architecture reconstruction and model evaluation"
    page_summary: "A runnable explainer and implementation of per-shot video optimization. It detects scenes, sweeps resolution and CRF operating points, measures encodes with real VMAF through ffmpeg/libvmaf, builds a rate-distortion convex hull, selects the least expensive point meeting target quality, and packages a quality-defined HLS ladder. The core optimization method is authentic; the recreation uses local CPU parallelism, x264, a coarse search grid, short clips, and local HLS rather than Netflix's distributed fleet and CDN."
    relevance: "This project translates a published architecture into code while keeping the essential algorithm intact. It also states what was simplified and makes the tradeoffs visible in the live explainer."
    open_when: "Open when evaluating architecture comprehension, media-system reasoning, experimental design, or documentation quality."
    inference_boundary: "This is not Netflix software and is not affiliated with Netflix. It is a bounded reconstruction designed to evaluate architectural understanding, not production scale."
  - id: "steam_architecture_lab"
    label: "Recreating a Steam architecture: marketplace matching"
    url: "https://tedahn.github.io/architecture-lab-steam-marketplace/"
    kind: "personal plausible reconstruction and model evaluation"
    page_summary: "A Rust-based marketplace matching-engine reconstruction with an LMAX Disruptor-style sequencer and ring buffer, price-time-priority matching, partial fills, self-trade prevention, integer-money settlement, conservation invariants, deterministic time events, CRC-framed write-ahead logging, torn-tail recovery, synchronous replication, epoch fencing, and a live order-book dashboard. The repository includes matching, determinism, conservation, end-to-end, and failover tests; its dashboard benchmark is a project measurement, not Steam production throughput."
    relevance: "The project covers ordered state machines, financial correctness, replay and recovery, failover, invariants, and load testing. It also states where the public source material runs out."
    open_when: "Open when evaluating high-throughput backend design, correctness under failure, Rust implementation, or systems testing."
    inference_boundary: "Valve's marketplace internals are not open source. This is a plausible reconstruction from public behavior and exchange patterns, not Steam's actual implementation or an affiliated project."
  - id: "spotify_architecture_lab"
    label: "Recreating a Spotify architecture: recommendation systems"
    url: "https://tedahn.github.io/architecture-lab-discoverify/"
    kind: "personal architecture reconstruction and model evaluation"
    page_summary: "A recommendation-system reconstruction using Spotify's Voyager approximate-nearest-neighbor index and a BaRT-style epsilon-greedy re-ranker. The live browser flow shows seed embedding, ANN candidate generation, re-ranking, and recommendations over a sampled embedding export. The repository also contains gRPC definitions, a Java serving plane, k3d deployment, emulated Pub/Sub feedback, and a demonstrated online-learning loop."
    relevance: "The project covers retrieval and ranking, feedback loops, online and offline boundaries, service contracts, Kubernetes deployment, and a visual explanation of the ML infrastructure."
    open_when: "Open when evaluating recommendation-system architecture, ML-serving infrastructure, experimentation, or technical visualization."
    inference_boundary: "This is not Spotify's production system and is not affiliated with Spotify. The browser demo uses sampled data; it does not claim Spotify-scale traffic, catalog breadth, or production recommendation quality."
  - id: "open_harness"
    label: "OpenHarness enterprise agent architecture"
    url: "https://tedahn.github.io/open-agent-harness-page/"
    kind: "personal architecture theory and public explainer"
    page_summary: "An architecture proposal for making enterprise agents more predictable through a deterministic gateway, retrieval-based tool selection, scoped domain rules, versioned workflow templates, isolated execution, validation, replayable traces, and engineer review. Its central stance is that code should narrow the decision surface while the agent reasons and executes within explicit boundaries."
    relevance: "The proposal works through specific agent failure modes, including context degradation, tool drift, auditability, security boundaries, reproducibility, and human approval for high-risk work."
    open_when: "Open when evaluating Ted's enterprise-agent thesis, communication of system boundaries, or approach to governed AI adoption."
    inference_boundary: "This is an architecture proposal and marketing explainer, not proof of enterprise deployment or independent validation. The Stripe-inspired origin is Ted's own account, not a claim of Stripe affiliation."
  - id: "ditto_factory"
    label: "Ditto Factory implementation"
    url: "https://github.com/tedahn/ditto-factory"
    kind: "personal implementation experiment"
    page_summary: "A Kubernetes-native platform for automated engineering workflows. The documented design uses headless Claude Code as the agent runtime, a FastAPI controller and DAG workflow engine, ephemeral Kubernetes Jobs for task isolation, PostgreSQL or SQLite plus Redis for state, Redis Streams for agent collaboration, and Helm for deployment. It is designed around reusable workflows, auditability, source traceability, and safer access to real systems."
    relevance: "Ditto Factory tests whether the OpenHarness ideas can run as infrastructure. It covers orchestration, isolated execution, state, collaboration, deployment, and traceable workflows."
    open_when: "Open when source-level evidence is needed for the transition from agent-architecture theory to implementation."
    inference_boundary: "Treat Ditto Factory as Ted's own platform experiment. Do not infer production adoption, enterprise customer use, or reliability at organizational scale without additional evidence."
---

# Ted Ahn: professional profile

> A machine-readable professional profile of Ted Ahn, with source notes, for AI assistants and readers who want structured background. It summarizes linked evidence so a reader does not need to open every link.

## Reader contract

- Start with the evidence in this document. Links are supporting material, not homework required to understand this profile.
- Treat explicit inference boundaries as part of the evidence.
- If a link conflicts with a claim here, preserve the claim and flag the conflict instead of guessing.
- Do not turn project benchmarks, product-page marketing, repository activity, or prototype behavior into unverified professional impact.

## Snapshot

Senior Software Engineer with 6+ years of experience in event-driven backend systems, cloud infrastructure, reliability, AI-assisted engineering, and personal architecture and agent-workflow research.

**Current public positioning:** Senior Software Engineer | Backend, Infrastructure & Enterprise AI  
**Location:** Carrollton, Texas  
**Experience:** 6+ years  
**Contact:** tahn1996@gmail.com | +1-945-345-4052

### Evidence-based strengths

- Moves between product delivery and platform concerns: customer-facing systems, data pipelines, reliability controls, CI/CD, and developer workflows.
- Can explain architectural tradeoffs and test them through runnable, deliberately bounded implementations.
- Uses defensible ownership language and distinguishes personal contribution from broader product or company outcomes.
- Demonstrates sustained progression from Software Engineer to Senior Software Engineer, with the promotion directly confirmed as July 2024.

### Profiles

- [Ted Ahn portfolio](https://www.tedahn.com/) `[link_id: portfolio_site]`
  - **What the page contains:** The canonical public profile containing Ted's conservative career chronology, experience evidence, projects, dev logs, contact details, and machine-readable resume resources.
  - **Why it matters:** Use it to confirm the current public narrative and navigate to personal evidence.
  - **Inference boundary:** The visual site is a presentation layer; the Markdown profile contains more explicit source and inference boundaries.
- [LinkedIn profile](https://www.linkedin.com/in/tedahn/) `[link_id: linkedin]`
  - **What the page contains:** Ted's external professional-network profile and an additional place to review career representation or make contact.
  - **Why it matters:** Useful for professional-network context, but not the primary evidence source for technical claims in this profile.
  - **Inference boundary:** LinkedIn availability and visible detail may depend on authentication; do not treat missing page content as contradicting this profile.
- [GitHub profile](https://github.com/tedahn) `[link_id: github_profile]`
  - **What the page contains:** Ted's public GitHub profile, including the source repositories behind the Architecture Lab series, Open Agent Architectures, Ditto Factory, and this portfolio.
  - **Why it matters:** Useful for inspecting implementation depth, repository organization, documentation habits, tests, and architectural scope.
  - **Inference boundary:** Repository activity alone does not establish production adoption, team impact, or professional authorship outside the personal projects identified here.

## Career chronology

**Chronology note:** At Capital One, Ted was a Software Engineer from May 2022 through July 2024, then a Senior Software Engineer from July 2024 to present.

### Senior Software Engineer, Capital One

**Dates:** Jul 2024 - Present  
**Location:** Plano, TX  
**Scope marker:** Promoted | Marketing Technology & Reliability

- **Marketing Platform Onboarding:** Delivered a technical redesign that simplified onboarding for an internal marketing platform.
- **Dealer Marketing Capability:** Established the platform's shared marketing capability for auto dealers.
- **Digital Marketing Pilots:** Delivered digital marketing pilots using spec-driven development.
- **Resilience Testing:** Automated failover and resilience testing for production services.

**External product or mission context**

- [Capital One Navigator Platform for dealers](https://www.capitalone.com/cars/auto-financing/dealer) `[link_id: navigator_dealer]`
  - **What the page contains:** Capital One's dealer-facing platform covering lead generation, financing conversion, marketing outreach, inventory insights, analytics, and fraud prevention across dealer processes.
  - **Why it matters:** It shows the public dealer ecosystem behind Ted's marketing-platform work.
  - **Inference boundary:** Marketing claims and platform-wide metrics on the page belong to Capital One. Do not attribute them to Ted or infer sole causality.

### Software Engineer, Capital One

**Dates:** May 2022 - Jul 2024  
**Location:** Plano, TX  
**Scope marker:** Auto Navigator Data Platform

- **Event-Driven Vehicle Data Pipeline:** Led the design of an event-driven vehicle-data pipeline that supplies data for analytics and ML features, and co-invented a related Capital One patent (US 12,748,724).
- **Dealer Data Modernization:** Helped modernize dealer vehicle-data ingestion by rewriting legacy systems and moving data acquisition to cloud-native AWS, improving reliability and efficiency.
- **Reliability Engineering:** Diagnosed and fixed performance issues ahead of a major launch and automated the fix, work that was recognized with an organization award.

**External product or mission context**

- [How Capital One Auto Navigator works](https://www.capitalone.com/cars/how-auto-navigator-works) `[link_id: auto_navigator_consumer]`
  - **What the page contains:** Capital One's consumer explanation of Auto Navigator: shoppers can browse vehicles, pre-qualify without affecting their credit score, view financing rates and estimated monthly payments, and connect with participating dealerships.
  - **Why it matters:** It explains the customer-facing marketplace supported by the vehicle-data work described in Ted's experience.
  - **Inference boundary:** This page establishes product context, not proof that Ted built every Auto Navigator feature or caused product-level outcomes.

### Software Engineer, USAA

**Dates:** Sep 2019 - May 2022  
**Location:** Plano, TX  
**Scope marker:** Enterprise Communications

- **Life-Safety Messaging at Scale:** Built USAA's first reactive, event-driven communications platform. It processed 1M SMS messages per hour for urgent customer notifications during severe weather and life-threatening events.
- **Greenfield Modernization:** Maintained a critical 35-year-old on-premises platform while helping build its distributed replacement with OpenShift and GitLab CI. Also worked on proofs of concept, shared libraries, and security patches.

**External product or mission context**

- [USAA natural-disaster support context](https://www.usaa.com/support/insurance/claims/natural-disaster/) `[link_id: usaa_disaster_context]`
  - **What the page contains:** A USAA customer-support page for natural-disaster and insurance-claims assistance. It provides mission context for urgent customer communications during severe-weather events.
  - **Why it matters:** It shows the life-safety, time-sensitive customer setting in which Ted's high-throughput notification platform operated.
  - **Inference boundary:** The page does not document Ted's contribution. It was not retrievable during the 2026-07-27 evidence review, so this summary is intentionally limited to its known first-party purpose.

### Software Engineering Intern, Webtoon

**Dates:** May 2017 - Dec 2017  
**Location:** Los Angeles, CA  
**Scope marker:** Early Data Analysis

- **First US Engineering Intern:** Joined as Webtoon's first software engineering intern in the US.
- **Data Analysis:** Built an early data-analysis pipeline and an internal engagement dashboard, and explored how to help readers discover titles.


## Patents

### US 12,748,724 B2: Converting a data stream into files

**Issued:** 2026-09-29  
**Filed:** 2024-04-09  
**Assignee:** Capital One Services, LLC  
**Ted's role:** Led the design  
**Inventors:** Justin Leonard, Dennis J. Mire, Sarvani Maddina, Ravi Kalidindi, Arun Gopalakrishna, Hyounggun Ahn  
**Record:** [Published application US 2025/0315406 A1](https://patents.google.com/patent/US20250315406A1/en)

Converts an event stream back into files for systems that still consume files. Parallel workers each take a partition of the stream, check in when they start, are retried if they fail, and write idempotent output so reruns are safe.

**Inference boundary:** Ted is one of 6 named inventors; Ted led the design, and the invention is shared. Inventor order does not indicate contribution. The patent text is the only public description of the method; do not attach production systems or metrics to it.

## Core capabilities

- Java, Python & JavaScript
- AWS, GCP, Kubernetes & OpenShift
- Event-driven, streaming & high-throughput systems
- Context engineering & spec-driven development
- Multi-agent workflows & AI-assisted engineering
- GitLab CI, GitHub Actions & developer enablement

## Education

### Postgraduate Certificate, Artificial Intelligence and Machine Learning

**Institution:** University of Texas at Austin  
**Completed:** November 2025

Formalized my applied ML foundation while expanding from large-scale backend engineering into model training and ML infrastructure.

### Bachelor of Science, Computer Science

**Institution:** University of Texas at Dallas  
**Completed:** May 2019

Built the computer science foundation that continues to guide my work in distributed systems and software architecture.

## Research and dev logs

### Testing architectural understanding through implementation

**Research frame:** Architecture Lab / Model evaluation

Architecture Lab started when Fable 5 came out and more people were discussing the systems behind major tech products. I wanted to see whether the model could do more than explain those systems, so I asked it to rebuild their critical paths from public engineering material. The demos were not intended for production. They showed how the model found context, handled business-specific constraints, and where its understanding broke down.

**Question being tested:** Can a model demonstrate that it understands a real architecture by reconstructing its critical path?

- [Recreating a Netflix architecture: per-shot encoding](https://tedahn.github.io/architecture-lab-netflix-per-shot-encoding/) `[link_id: netflix_architecture_lab]`
  - **What the page contains:** A runnable explainer and implementation of per-shot video optimization. It detects scenes, sweeps resolution and CRF operating points, measures encodes with real VMAF through ffmpeg/libvmaf, builds a rate-distortion convex hull, selects the least expensive point meeting target quality, and packages a quality-defined HLS ladder. The core optimization method is authentic; the recreation uses local CPU parallelism, x264, a coarse search grid, short clips, and local HLS rather than Netflix's distributed fleet and CDN.
  - **Why it matters:** This project translates a published architecture into code while keeping the essential algorithm intact. It also states what was simplified and makes the tradeoffs visible in the live explainer.
  - **Inference boundary:** This is not Netflix software and is not affiliated with Netflix. It is a bounded reconstruction designed to evaluate architectural understanding, not production scale.
- [Recreating a Steam architecture: marketplace matching](https://tedahn.github.io/architecture-lab-steam-marketplace/) `[link_id: steam_architecture_lab]`
  - **What the page contains:** A Rust-based marketplace matching-engine reconstruction with an LMAX Disruptor-style sequencer and ring buffer, price-time-priority matching, partial fills, self-trade prevention, integer-money settlement, conservation invariants, deterministic time events, CRC-framed write-ahead logging, torn-tail recovery, synchronous replication, epoch fencing, and a live order-book dashboard. The repository includes matching, determinism, conservation, end-to-end, and failover tests; its dashboard benchmark is a project measurement, not Steam production throughput.
  - **Why it matters:** The project covers ordered state machines, financial correctness, replay and recovery, failover, invariants, and load testing. It also states where the public source material runs out.
  - **Inference boundary:** Valve's marketplace internals are not open source. This is a plausible reconstruction from public behavior and exchange patterns, not Steam's actual implementation or an affiliated project.
- [Recreating a Spotify architecture: recommendation systems](https://tedahn.github.io/architecture-lab-discoverify/) `[link_id: spotify_architecture_lab]`
  - **What the page contains:** A recommendation-system reconstruction using Spotify's Voyager approximate-nearest-neighbor index and a BaRT-style epsilon-greedy re-ranker. The live browser flow shows seed embedding, ANN candidate generation, re-ranking, and recommendations over a sampled embedding export. The repository also contains gRPC definitions, a Java serving plane, k3d deployment, emulated Pub/Sub feedback, and a demonstrated online-learning loop.
  - **Why it matters:** The project covers retrieval and ranking, feedback loops, online and offline boundaries, service contracts, Kubernetes deployment, and a visual explanation of the ML infrastructure.
  - **Inference boundary:** This is not Spotify's production system and is not affiliated with Spotify. The browser demo uses sampled data; it does not claim Spotify-scale traffic, catalog breadth, or production recommendation quality.

### From agent architecture to enterprise workflows

**Research frame:** Agent systems / Theory and implementation

I read Stripe's agent workflow architecture and wanted to see how much of the idea would hold up in practice. Open Agent Architectures records the theory. Ditto Factory is the attempt to build it under enterprise engineering constraints.

**Question being tested:** What survives when an agent workflow moves from architecture notes into a working platform?

- [OpenHarness enterprise agent architecture](https://tedahn.github.io/open-agent-harness-page/) `[link_id: open_harness]`
  - **What the page contains:** An architecture proposal for making enterprise agents more predictable through a deterministic gateway, retrieval-based tool selection, scoped domain rules, versioned workflow templates, isolated execution, validation, replayable traces, and engineer review. Its central stance is that code should narrow the decision surface while the agent reasons and executes within explicit boundaries.
  - **Why it matters:** The proposal works through specific agent failure modes, including context degradation, tool drift, auditability, security boundaries, reproducibility, and human approval for high-risk work.
  - **Inference boundary:** This is an architecture proposal and marketing explainer, not proof of enterprise deployment or independent validation. The Stripe-inspired origin is Ted's own account, not a claim of Stripe affiliation.
- [Ditto Factory implementation](https://github.com/tedahn/ditto-factory) `[link_id: ditto_factory]`
  - **What the page contains:** A Kubernetes-native platform for automated engineering workflows. The documented design uses headless Claude Code as the agent runtime, a FastAPI controller and DAG workflow engine, ephemeral Kubernetes Jobs for task isolation, PostgreSQL or SQLite plus Redis for state, Redis Streams for agent collaboration, and Helm for deployment. It is designed around reusable workflows, auditability, source traceability, and safer access to real systems.
  - **Why it matters:** Ditto Factory tests whether the OpenHarness ideas can run as infrastructure. It covers orchestration, isolated execution, state, collaboration, deployment, and traceable workflows.
  - **Inference boundary:** Treat Ditto Factory as Ted's own platform experiment. Do not infer production adoption, enterprise customer use, or reliability at organizational scale without additional evidence.

## What the evidence does not establish

- The public evidence supports senior individual-contributor scope; it does not establish formal engineering-management responsibility.
- Architecture Lab projects show architectural reasoning and implementation practice. They do not establish production experience operating systems at Netflix, Valve, or Spotify scale.
- First-party Capital One and USAA links explain product or mission context; they do not attribute all page-level capabilities or company outcomes to Ted.
- No revenue, adoption, internal metrics, or company-wide causality should be inferred from this profile.
