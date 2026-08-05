import React, { Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useReducedMotion } from 'framer-motion';
import SectionShapes from './SectionShapes';

const WorksScene3D = React.lazy(() =>
  import('./Scene3D').then((module) => ({ default: module.WorksScene3D }))
);

const getToolIcon = (tool) => {
  const specialIcons = {
    pandas: { icon: 'chart-line', prefix: 'fas' },
    sklearn: { icon: 'brain', prefix: 'fas' },
    tensorflow: { icon: 'brain', prefix: 'fas' },
    nlp: { icon: 'robot', prefix: 'fas' },
    genai: { icon: 'robot', prefix: 'fas' },
    vision: { icon: 'eye', prefix: 'fas' },
    data: { icon: 'database', prefix: 'fas' },
    database: { icon: 'database', prefix: 'fas' },
    code: { icon: 'code', prefix: 'fas' },
    'framer-motion': { icon: 'code', prefix: 'fas' },
  };

  if (specialIcons[tool]) {
    return [specialIcons[tool].prefix, specialIcons[tool].icon];
  }

  return ['fab', tool];
};

const ProjectCard = ({ project, index, prefersReducedMotion }) => {
  const Card = project.url ? motion.a : motion.article;
  const linkProps = project.url
    ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Card
      {...linkProps}
      className={`project-proof-card${project.featured ? ' project-proof-card--featured' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: Math.min(index * 0.07, 0.2) }}
    >
      {project.image && (
        <div className="project-proof-image">
          <img src={project.image} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      <div className="project-proof-content">
        {project.context && <p className="project-proof-context">{project.context}</p>}
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.tools?.length > 0 && (
          <ul className="project-tools" aria-label="Technologies">
            {project.tools.map((tool) => (
              <li key={tool}>
                <FontAwesomeIcon icon={getToolIcon(tool)} aria-hidden="true" />
                {tool}
              </li>
            ))}
          </ul>
        )}
        {project.url && (
          <span className="project-proof-link">
            {project.linkLabel || 'View project'} <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </span>
        )}
      </div>
    </Card>
  );
};

const FieldNote = ({ note, index, prefersReducedMotion }) => (
  <motion.article
    className="field-note"
    initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
    whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.4, ease: 'easeOut', delay: Math.min(index * 0.08, 0.2) }}
  >
    <div className="field-note-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
    <div className="field-note-body">
      <p className="field-note-type">{note.type}</p>
      <h3>{note.title}</h3>
      <p>{note.summary}</p>
      <p className="field-note-question"><strong>Question:</strong> {note.question}</p>
      <div className="field-note-links">
        {note.links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.label} <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  </motion.article>
);

const Work = ({ data }) => {
  const prefersReducedMotion = useReducedMotion();
  const projects = data?.projects || [];
  const fieldNotes = data?.fieldNotes || [];
  const fieldNotesHeadingId = 'field-notes-heading';

  if (!projects.length && !fieldNotes.length) return null;

  return (
    <section id="work">
      <SectionShapes variant="portfolio" />
      <Suspense fallback={null}><WorksScene3D /></Suspense>
      <div className="work-wrapper">
        <header className="section-intro work-section-intro">
          <p className="section-eyebrow">{projects.length ? 'Work' : 'Short reads'}</p>
          <h2 id={projects.length ? undefined : fieldNotesHeadingId}>
            {projects.length ? 'Projects' : 'Personal dev logs'}
          </h2>
          {projects.length > 0 && <p>Here are some things I&apos;ve worked on.</p>}
        </header>

        {projects.length > 0 && (
          <section className="project-proof-section" aria-labelledby="project-proof-heading">
            <h3 id="project-proof-heading" className="visually-hidden">Projects</h3>
            <div className="project-proof-grid">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </section>
        )}

        {fieldNotes.length > 0 && (
          <section
            className={`field-notes-section${projects.length ? '' : ' field-notes-section--standalone'}`}
            aria-labelledby={fieldNotesHeadingId}
          >
            {projects.length > 0 ? (
              <div className="work-subhead">
                <p>Short reads</p>
                <h3 id={fieldNotesHeadingId}>Personal dev logs</h3>
              </div>
            ) : null}
            <div className="field-notes-list">
              {fieldNotes.map((note, index) => (
                <FieldNote
                  key={note.title}
                  note={note}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default Work;
