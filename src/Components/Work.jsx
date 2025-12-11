import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Work = ({ data }) => {
  if (!data) return null;

  return (
    <section id="work" className="container">
      <div className="section-title">
        <h2>My <span>Projects</span></h2>
      </div>

      <div className="portfolio-grid">
        {data.projects.map((portfolio) => (
          <a key={portfolio.title} href={portfolio.url} className="portfolio-card" target="_blank" rel="noopener noreferrer">
            <div className="card-image">
              <img alt={portfolio.title} src={portfolio.image} />
            </div>
            <div className="card-content">
              <h5>{portfolio.title}</h5>
              <p>{portfolio.description}</p>
              <div className="tech-stack">
                {portfolio.tools && portfolio.tools.map(tool => {
                  // Basic mapping for non-brand icons if needed, or fallback
                  const prefix = ['chart-line', 'code', 'database'].includes(tool) ? 'fas' : 'fab';
                  return (
                    <span key={tool} title={tool}>
                      {/* Wrap in span to avoid direct crash if FA fails */}
                      <FontAwesomeIcon icon={[prefix, tool]} className="tech-icon" />
                    </span>
                  );
                })}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Work;
