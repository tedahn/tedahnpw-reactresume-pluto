import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const WatermarkEntry = ({ item, index }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const isFuture = item.type === 'future';

  return (
    <div
      ref={ref}
      className={`exp-entry ${item.type}${isFuture ? ' exp-future' : ''}`}
    >
      {/* Vermillion rule separator (not on first item or future) */}
      {index > 0 && !isFuture && (
        <div className="exp-rule" />
      )}
      {isFuture && index > 0 && (
        <div className="exp-rule exp-rule-dashed" />
      )}

      <div className="exp-entry-inner">
        {/* Watermark company/school name */}
        {prefersReducedMotion ? (
          <div className="exp-watermark" aria-hidden="true">
            {item.primary}
          </div>
        ) : (
          <motion.div
            className="exp-watermark"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {item.primary}
          </motion.div>
        )}

        {/* Content overlay */}
        <div className="exp-content">
          <div className="exp-meta">
            {item.type !== 'future' && (
              <span className="exp-type-label">
                {item.type === 'work' ? 'WORK' : 'EDUCATION'}
              </span>
            )}
            <span className="exp-dates">{item.displayDate}</span>
          </div>

          <h3 className={`exp-title${isFuture ? ' exp-title-italic' : ''}`}>
            {item.secondary || item.primary}
          </h3>

          {item.secondary && item.type !== 'future' && (
            <p className="exp-company">{item.primary}</p>
          )}

          {item.location && (
            <p className="exp-location">{item.location}</p>
          )}

          {item.details && (
            <p className={`exp-description${isFuture ? ' exp-description-italic' : ''}`}>
              {item.details}
            </p>
          )}

          {/* Achievements */}
          {item.achievements.length > 0 && (
            <div className="exp-achievements">
              {item.achievements.map((achievement, i) => (
                <div key={i} className="exp-achievement">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Timeline image */}
        {item.timelineImage && (
          <div className="exp-image">
            <img src={item.timelineImage} alt={`${item.primary} moment`} />
          </div>
        )}
      </div>
    </div>
  );
};

const Experience = ({ work, education }) => {
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
    type: 'work',
    sortDate: parseDate(item.dates),
    displayDate: item.dates,
    status: item.status,
    timelineImage: item.timelineImage,
    primary: item.company,
    secondary: item.title,
    location: item.location,
    details: item.description,
    achievements: item.achievements || []
  }));

  const eduItems = education.map(item => ({
    ...item,
    type: 'education',
    sortDate: parseDate(item.graduated),
    displayDate: item.graduated,
    status: item.status || 'Graduated',
    timelineImage: item.timelineImage,
    primary: item.school,
    secondary: item.degree,
    location: '',
    details: item.description,
    achievements: []
  }));

  const timelineItems = [...workItems, ...eduItems].sort((a, b) => a.sortDate - b.sortDate);

  timelineItems.push({
    type: 'future',
    sortDate: new Date(),
    displayDate: '2025 & Beyond',
    status: "What's next?",
    primary: "The Next Chapter",
    secondary: '',
    location: '',
    details: "It's most likely that I'm still running around and about. I hope to one day work with you too to make valuable change and meaningful experiences!",
    achievements: []
  });

  return (
    <section id="experience">
      <div className="exp-wrapper">
        <h2 className="exp-section-watermark" aria-hidden="true">Journey</h2>

        <div className="exp-list">
          {timelineItems.map((item, index) => (
            <AnimatedSection key={`${item.type}-${index}`}>
              <WatermarkEntry item={item} index={index} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
