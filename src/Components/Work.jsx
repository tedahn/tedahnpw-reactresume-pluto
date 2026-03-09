import React, { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useReducedMotion } from 'framer-motion';
import SectionShapes from './SectionShapes';
const WorksScene3D = React.lazy(() =>
  import('./Scene3D').then((m) => ({ default: m.WorksScene3D }))
);

const Work = ({ data }) => {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!data) return null;

  const projects = data.projects;
  const totalCards = projects.length;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Determine active card based on scroll position
    const cardWidth = el.querySelector('.portfolio-card')?.offsetWidth || 0;
    const gap = 32; // 2rem gap
    if (cardWidth > 0) {
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, totalCards - 1));
    }
  }, [totalCards]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollToCard = useCallback((index) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelectorAll('.portfolio-card')[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, []);

  const scrollPrev = useCallback(() => {
    const next = Math.max(0, activeIndex - 1);
    scrollToCard(next);
  }, [activeIndex, scrollToCard]);

  const scrollNext = useCallback(() => {
    const next = Math.min(totalCards - 1, activeIndex + 1);
    scrollToCard(next);
  }, [activeIndex, totalCards, scrollToCard]);

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
      <SectionShapes variant="portfolio" />
      <Suspense fallback={null}><WorksScene3D /></Suspense>
      <div className="portfolio-wrapper">
        <h2 className="portfolio-watermark" aria-hidden="true">Projects</h2>

        <div className="portfolio-scroll-container">
          {canScrollLeft && (
            <button
              className="portfolio-nav-btn portfolio-nav-btn--prev"
              onClick={scrollPrev}
              aria-label="Previous project"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          <div className="portfolio-scroll-track" ref={scrollRef}>
            {projects.map((project, index) => (
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

          {canScrollRight && (
            <button
              className="portfolio-nav-btn portfolio-nav-btn--next"
              onClick={scrollNext}
              aria-label="Next project"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>

        <div className="portfolio-indicators">
          {projects.map((project, index) => (
            <button
              key={project.title}
              className={`portfolio-dot${index === activeIndex ? ' portfolio-dot--active' : ''}`}
              onClick={() => scrollToCard(index)}
              aria-label={`Go to project: ${project.title}`}
            />
          ))}
          <span className="portfolio-counter">
            {activeIndex + 1} / {totalCards}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Work;
