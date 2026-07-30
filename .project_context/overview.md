# Project Overview

## Identity & Purpose

**Repository**: `tedahnpw-reactresume-pluto`
**Product**: Ted Ahn's Personal Portfolio Website
**Domain**: [tedahn.pw](https://tedahn.pw)

This project is the public professional home of **Ted Ahn**, a Senior Software Engineer. Its primary purpose is to present a concise, recruiter-facing account of Ted's career progression, technical impact, leadership, and working philosophy to hiring managers, technical leaders, and collaborators.

## Vision & Philosophy

The website is a living, public-safe reflection of Ted's professional journey:

* **Customer-Oriented Engineering**: Passion-driven work and people-driven engineering.
* **Senior Technical Positioning**: Backend, distributed and event-driven systems, cloud infrastructure, reliability, enterprise AI, and AI-assisted engineering.
* **Evidence-Led Storytelling**: Clear chronology, defensible metrics, shared-authorship boundaries, and public product context without overstating causality.
* **Midnight Technical Editorial**: Deep navy surfaces, restrained teal/cyan accents, schematic spatial details, glass materials, editorial typography, and purposeful motion.
* **Technical Excellence**: React 18, Vite, responsive layouts, semantic content structure, and locally managed visual assets.

Career-content governance lives in [resume-content-governance.md](resume-content-governance.md).

## Core Components

* **Hero**: Current professional identity, positioning statement, and primary calls to action.
* **About**: Ted's approved quotations, skills, and contact details without portrait imagery.
* **Recruiter Resume**: A conventional reverse-chronological experience read with separate education, concise impact bullets, and public product-context cards.
* **Work + Ideas**: Selected, inspectable software projects followed by editorial field notes about architecture research and agent workflows.
* **Contact**: Direct professional outreach and social profiles.

## Technical Architecture

* **Frontend**: React 18 functional components and hooks.
* **Content Architecture**: src/resumeData.json is the only source of career content; components render data passed through the application.
* **Build System**: Vite 5 with base ./ and output in build/.
* **Styling**: A single custom CSS system in src/styles.css using CSS variables, Grid/Flexbox, glass materials, and a 768px responsive breakpoint.
* **Motion and Atmosphere**: Framer Motion plus React Three Fiber/Three.js scenes.
* **Iconography**: FontAwesome.
* **Deployment**: GitHub Pages through the repository workflow on main or master.

## Current Experience Direction (July 2026)

* **First Viewport**: Establish Ted's senior-engineering identity immediately rather than opening with a generic biography.
* **Recruiter Read**: Present current experience first in a conventional resume hierarchy; make company, title, dates, location, scope, and measurable impact scannable without decoding a timeline.
* **Resume Access**: Keep an approved recruiter PDF, a detailed Markdown brief for AI recruiters, and secondary HTML, plain-text, and JSON versions derived from the canonical site data.
* **Impact in Context**: Pair selected experience entries with concise “Product link” cards and locally stored imagery.
* **Work and Field Notes**: Preserve live project evidence while giving architecture research, theories, and agent-workflow experiments a distinct editorial reading surface.
* **About**: Preserve Ted's three approved quotations and the intentionally portrait-free layout.
* **Motion**: Retain scroll-triggered entrances, navigation behavior, project interactions, and restrained 3D atmospheric scenes.
* **Mobile**: Preserve the hamburger navigation, readable single-column timeline, full-width cards, and no horizontal overflow.
