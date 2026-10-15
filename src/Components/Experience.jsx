import React from 'react';
import Inline from './Inline';
import Reveal from './Reveal';
import { byStartDesc, yearRange } from '../lib/dates';

const Experience = ({ work = [] }) => (
  <Reveal className="section" id="experience" aria-labelledby="experience-title">
    <h2 id="experience-title" className="section-label">Experience</h2>
    <ol className="section-body roles">
      {byStartDesc(work).map((role) => (
        <li className="role" key={`${role.company}-${role.dates}`}>
          <div className="role-head">
            <h3 className="role-title">
              {role.title} <span className="role-company">· {role.company}</span>
            </h3>
            <span className="role-dates">{yearRange(role.dates)}</span>
          </div>
          {role.summary && <p className="role-summary"><Inline text={role.summary} /></p>}
        </li>
      ))}
    </ol>
  </Reveal>
);

export default Experience;
