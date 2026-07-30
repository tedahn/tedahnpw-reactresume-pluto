import React, { Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionShapes from './SectionShapes';
const ExperienceScene3D = React.lazy(() =>
  import('./Scene3D').then((m) => ({ default: m.ExperienceScene3D }))
);

const ResumeEntry = ({ item, index }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="resume-entry"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: Math.min(index * 0.06, 0.2) }}
    >
      <header className="resume-entry-header">
        <div>
          <p className="resume-entry-kicker">{item.status}</p>
          <h3>{item.title}</h3>
          <p className="resume-entry-organization">{item.organization}</p>
        </div>
        <div className="resume-entry-meta">
          <time>{item.date}</time>
          {item.location && <span>{item.location}</span>}
        </div>
      </header>

      {item.description && <p className="resume-entry-summary">{item.description}</p>}

      {item.achievements.length > 0 && (
        <ul className="resume-impact-list">
          {item.achievements.map((achievement) => (
            <li key={achievement.title}>
              <strong>{achievement.title}.</strong> {achievement.desc}
            </li>
          ))}
        </ul>
      )}

      {item.contextLinks?.length > 0 && (
        <div className="resume-context-links">
          {item.contextLinks.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
              {link.image && (
                <img src={link.image} alt={link.imageAlt || ''} loading="lazy" decoding="async" />
              )}
              <span>
                <small>Product context</small>
                <strong>{link.label}</strong>
                <span>{link.context}</span>
              </span>
              <FontAwesomeIcon icon="arrow-right" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
};

const Experience = ({ work, education, future }) => {
  if (!work || !education) return null;

  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    const startDatePart = dateStr.split('-')[0].trim();
    const parts = startDatePart.split(' ');
    if (parts.length < 2) return new Date(startDatePart);

    const monthName = parts[0].substring(0, 3).toLowerCase();
    const year = parseInt(parts[1], 10);

    const months = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };

    if (months[monthName] !== undefined && !isNaN(year)) {
      return new Date(year, months[monthName], 1);
    }

    return new Date(0);
  };

  const workItems = work.map(item => ({
    ...item,
    sortDate: parseDate(item.dates),
    organization: item.company,
    date: item.dates,
    achievements: item.achievements || []
  })).sort((a, b) => b.sortDate - a.sortDate);

  const eduItems = education.map(item => ({
    ...item,
    sortDate: parseDate(item.graduated),
    organization: item.school,
    title: item.degree,
    date: item.graduated,
    location: '',
    achievements: []
  })).sort((a, b) => b.sortDate - a.sortDate);

  return (
    <section id="experience">
      <SectionShapes variant="experience" />
      <Suspense fallback={null}><ExperienceScene3D /></Suspense>
      <div className="resume-wrapper">
        <header className="section-intro resume-section-intro">
          <p className="section-eyebrow">Resume</p>
          <h2>Experience</h2>
        </header>

        <div className="resume-layout">
          <div className="resume-main">
            <div className="resume-entry-list">
              {workItems.map((item, index) => (
                <ResumeEntry key={`${item.company}-${item.dates}`} item={item} index={index} />
              ))}
            </div>
            {future && (
              <div className="resume-focus-card resume-focus-card--experience">
                <p className="resume-entry-kicker">{future.date}</p>
                <h3>{future.title}</h3>
                <p>{future.description}</p>
              </div>
            )}
          </div>

          <aside className="resume-sidebar" aria-label="Education and current focus">
            <h3 className="resume-group-heading">Education</h3>
            <div className="resume-education-list">
              {eduItems.map((item, index) => (
                <ResumeEntry key={`${item.school}-${item.graduated}`} item={item} index={index} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Experience;
