# Project Overview

## Identity & Purpose

**Repository**: `tedahnpw-reactresume-pluto`
**Product**: Ted Ahn's Personal Portfolio Website
**Domain**: [tedahn.com](https://www.tedahn.com)

This project is the public professional home of **Ted Ahn**, a Senior Software Engineer. Its primary purpose is to present a concise, employer-friendly account of Ted's career progression, technical impact, leadership, and working philosophy to hiring managers, technical leaders, and collaborators.

## Vision & Philosophy

The website is a living, public-safe reflection of Ted's professional journey:

* **Customer-Oriented Engineering**: Passion-driven work and people-driven engineering.
* **Senior Technical Positioning**: Backend, distributed and event-driven systems, cloud infrastructure, reliability, enterprise AI, and AI-assisted engineering.
* **Evidence-Led Storytelling**: Clear chronology, defensible metrics, shared-authorship boundaries, and public product context without overstating causality.
* **Ink & Sea-glass**: Ink-navy surfaces, cream serif typography (Newsreader), a sea-glass teal accent, JetBrains Mono for data, a node-and-edge ornament, and restrained motion. Spec: `docs/superpowers/specs/2026-10-14-professional-redesign-design.md`.
* **Technical Excellence**: React 18, Vite, responsive layouts, semantic content structure, and locally managed visual assets.

Career-content governance lives in [resume-content-governance.md](resume-content-governance.md).

## Core Components

* **Header**: Name plus Résumé, GitHub, and LinkedIn links.
* **Hero**: Ted's real photo in a teal ring, his name, and a monospace role line.
* **About**: A short professional bio with the proof bolded inline, plus an availability status line.
* **Experience**: Reverse-chronological roles with dates and a one-line summary whose metrics render in teal monospace.
* **Professional Projects**: Enterprise systems as cards linking to public product-context pages.
* **Independent Projects**: Personal projects as cards, followed by field notes.
* **Footer**: Email and a link to the résumé request page.
* **Résumé request page** (`resume.html`): a standalone page in the same Ink & Sea-glass style with only a request form. It is generated from `resumeRequest` in `src/resumeData.json`. It shows in Korean or English: a `?lang=ko`/`?lang=en` link wins, then the visitor's saved choice from the EN / 한국어 switch, then the browser's preferred language (Korean only when `ko` is preferred; everything else is English). The résumé language is pre-selected to match until the visitor picks one.

## Technical Architecture

* **Frontend**: React 18 functional components and hooks.
* **Content Architecture**: src/resumeData.json is the only source of career content; components render data passed through the application.
* **Build System**: Vite 5 with base ./ and output in build/.
* **Styling**: A single custom CSS system in src/styles.css using CSS variables, Grid/Flexbox, and a 768px responsive breakpoint.
* **Pure logic**: `src/lib/` (inline markup, date ranges) with `node --test` unit tests (`npm test`).
* **Motion**: CSS-only slow rotating arc on the hero photo ring, section fade and card lift; none under reduced motion. No three.js, Framer Motion, or icon libraries.
* **Deployment**: GitHub Pages through the repository workflow on main or master.

## Current Experience Direction (October 2026)

* **Site goal**: Ted is employed and not searching, but easy to say yes to: a credible résumé in seconds, plus visible ongoing work.
* **Brand**: *The reliable builder.* Production systems that don't break lead; personal architecture research supports.
* **First Viewport**: Photo, name, and role line, then a bio whose bolded claims carry the proof.
* **Work vs. independent projects**: Enterprise systems and personal projects are deliberately separate sections.
* **Resume Access (changed 2026-11-24)**: The résumé is available only by request. Visitors fill in the form on `resume.html`, and Ted reviews each request and emails a PDF. The site no longer publishes résumé files (the former `resume.md`, `resume.json` and `resume.txt` were removed).
* **Languages (2026-11-24)**: The whole site, including the résumé request page, shows in Korean or English. English is the source; the Korean overlay in `resumeData.json` must say the same things and follow the same public-safety rules. Language order: `?lang=` link, then the visitor's saved switch choice, then the browser's preferred language.
* **Mobile**: Single column with labels above content, one card per row at ≤560px, and no horizontal overflow at 390px.
