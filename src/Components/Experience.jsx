import React from 'react';
import Inline from './Inline';
import Reveal from './Reveal';
import { byStartDesc, yearRange } from '../lib/dates';

// A role may carry a one-line company description (used in Korean for readers who don't know
// US firms). It is shown once per company, on that company's most recent role.
const Experience = ({ work = [], t = {} }) => {
  const described = new Set();
  return (
  <Reveal className="section" id="experience" aria-labelledby="experience-title">
    <h2 id="experience-title" className="section-label">{t.experience || 'Experience'}</h2>
    <ol className="section-body roles">
      {byStartDesc(work).map((role) => {
        const context = role.context && !described.has(role.company) ? role.context : null;
        if (role.context) described.add(role.company);
        return (
        <li className="role" key={`${role.company}-${role.dates}`}>
          <div className="role-head">
            <h3 className="role-title">
              {role.title} <span className="role-company">· {role.company}</span>
            </h3>
            <span className="role-dates">{yearRange(role.dates, t.now)}</span>
          </div>
          {context && <p className="role-context">{context}</p>}
          {role.summary && <p className="role-summary"><Inline text={role.summary} /></p>}
        </li>
        );
      })}
    </ol>
  </Reveal>
  );
};

export default Experience;
