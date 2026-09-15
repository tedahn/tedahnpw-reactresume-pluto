import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const ExternalLink = ({ url, children }) => <a href={url} target="_blank" rel="noopener noreferrer">{children} <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" /></a>;

export default function Work({ data }) {
  return (
    <>
      <section id="work" className="content-section" aria-labelledby="work-heading">
        <header className="section-heading"><span className="section-number" aria-hidden="true">02</span><h2 id="work-heading">Selected work</h2></header>
        <p className="section-description">{data.intro}</p>
        <div className="project-list">{data.projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-meta"><span>{project.context}</span><span>{project.status}</span></div>
            <h3>{project.title}</h3><p>{project.description}</p>
            <ul className="technology-list" aria-label="Technologies">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
            <div className="project-links"><ExternalLink url={project.url}>{project.linkLabel}</ExternalLink>{project.sourceUrl && <ExternalLink url={project.sourceUrl}>View source</ExternalLink>}</div>
            <details className="project-details"><summary>Engineering walkthrough<span className="visually-hidden">: {project.title}</span></summary>
              <div className="walkthrough">
                <p className="project-question">{project.question}</p>
                <dl>{[['My focus',project.focus],['System design',project.architecture],['The tradeoff',project.tradeoff],['Evidence & limits',project.evidence]].map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                <div className="evidence-links">{project.evidenceLinks.map(link => <ExternalLink key={link.url} url={link.url}>{link.label}</ExternalLink>)}</div>
              </div>
            </details>
          </article>
        ))}</div>
      </section>
      <section id="notes" className="content-section" aria-labelledby="notes-heading">
        <header className="section-heading"><span className="section-number" aria-hidden="true">03</span><h2 id="notes-heading">Notes & experiments</h2></header>
        <div className="notes-list">{data.fieldNotes.map(note => <article key={note.title} className="note-entry">
          <p className="eyebrow">{note.type}</p><h3>{note.title}</h3><p>{note.summary}</p>
          <div className="note-links">{note.links.map(link => <ExternalLink key={link.url} url={link.url}>{link.label}</ExternalLink>)}</div>
        </article>)}</div>
      </section>
    </>
  );
}
