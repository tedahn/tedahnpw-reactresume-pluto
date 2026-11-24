import React from 'react';
import Inline from './Inline';
import Reveal from './Reveal';

const Patents = ({ patents = [], self, t = {} }) => {
  if (patents.length === 0) return null;

  return (
    <Reveal className="section" id="patents" aria-labelledby="patents-title">
      <h2 id="patents-title" className="section-label">{patents.length > 1 ? (t.patents || 'Patents') : (t.patent || 'Patent')}</h2>
      <ol className="section-body roles">
        {patents.map((patent) => {
          const coInventors = (patent.inventors || []).filter((name) => name !== self);
          return (
            <li className="role" key={patent.number}>
              <div className="role-head">
                <h3 className="role-title">
                  {patent.url ? <a href={patent.url}>{patent.title}</a> : patent.title}{' '}
                  <span className="role-company">· {patent.number}</span>
                </h3>
                <span className="role-dates">{patent.issued}</span>
              </div>
              {patent.summary && <p className="role-summary"><Inline text={patent.summary} /></p>}
              <p className="patent-meta">
                {[patent.role, patent.assignee].filter(Boolean).join(' · ')}
                {coInventors.length > 0 && ` · ${t.coInvented || 'Co-invented with'} ${coInventors.join(', ')}`}
              </p>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
};

export default Patents;
