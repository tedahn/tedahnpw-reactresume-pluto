import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useReducedMotion } from 'framer-motion';

const Work = ({ data }) => {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef(null);

  if (!data) return null;

  const getToolIcon = (tool) => {
    let iconName = tool;
    let prefix = 'fab';

    const specialIcons = {
      'pandas': { icon: 'chart-line', prefix: 'fas' },
      'sklearn': { icon: 'brain', prefix: 'fas' },
      'tensorflow': { icon: 'brain', prefix: 'fas' },
      'nlp': { icon: 'robot', prefix: 'fas' },
      'genai': { icon: 'robot', prefix: 'fas' },
      'vision': { icon: 'eye', prefix: 'fas' },
      'data': { icon: 'database', prefix: 'fas' },
      'code': { icon: 'code', prefix: 'fas' },
      'framer-motion': { icon: 'code', prefix: 'fas' }
    };

    if (specialIcons[tool]) {
      iconName = specialIcons[tool].icon;
      prefix = specialIcons[tool].prefix;
    } else if (['chart-line', 'database', 'eye', 'brain', 'robot'].includes(tool)) {
      prefix = 'fas';
    }

    return [prefix, iconName];
  };

  return (
    <section id="work">
      <div className="portfolio-wrapper">
        <h2 className="portfolio-watermark" aria-hidden="true">Projects</h2>

        <div className="portfolio-scroll-track" ref={scrollRef}>
          {data.projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.url}
              className="portfolio-card"
              target="_blank"
              rel="noopener noreferrer"
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.3 }}
              transition={prefersReducedMotion ? undefined : { duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
            >
              <div className="portfolio-card-image">
                <img alt={project.title} src={project.image} />
              </div>
              <div className="portfolio-card-overlay" />
              <div className="portfolio-card-content">
                <h3 className="portfolio-card-title">{project.title}</h3>
                <p className="portfolio-card-desc">{project.description}</p>
                <div className="portfolio-card-tools">
                  {project.tools && project.tools.map((tool, i) => (
                    <React.Fragment key={tool}>
                      <span className="portfolio-tool">
                        <FontAwesomeIcon icon={getToolIcon(tool)} className="portfolio-tool-icon" />
                        {tool}
                      </span>
                      {i < project.tools.length - 1 && (
                        <span className="portfolio-tool-sep">&middot;</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <span className="portfolio-card-link">
                  View Project <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="portfolio-scroll-hint" aria-hidden="true">
          Scroll <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </section>
  );
};

export default Work;
