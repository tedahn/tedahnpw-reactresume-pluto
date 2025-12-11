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
                  let iconName = tool;
                  let prefix = 'fab'; // Default to brand icons

                  // Custom Mappings
                  const specialIcons = {
                    'pandas': { icon: 'chart-line', prefix: 'fas' }, // Data Analysis
                    'sklearn': { icon: 'brain', prefix: 'fas' }, // ML
                    'tensorflow': { icon: 'brain', prefix: 'fas' }, // DL
                    'nlp': { icon: 'robot', prefix: 'fas' }, // NLP
                    'genai': { icon: 'robot', prefix: 'fas' }, // Generative AI
                    'vision': { icon: 'eye', prefix: 'fas' }, // Computer Vision
                    'data': { icon: 'database', prefix: 'fas' }, // General Data
                    'code': { icon: 'code', prefix: 'fas' }
                  };

                  if (specialIcons[tool]) {
                    iconName = specialIcons[tool].icon;
                    prefix = specialIcons[tool].prefix;
                  } else if (['chart-line', 'database', 'eye', 'brain', 'robot'].includes(tool)) {
                    prefix = 'fas';
                  }

                  return (
                    <span key={tool} title={tool}>
                      <FontAwesomeIcon icon={[prefix, iconName]} className="tech-icon" />
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
