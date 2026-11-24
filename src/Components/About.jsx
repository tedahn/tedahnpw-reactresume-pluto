import React from 'react';
import Inline from './Inline';
import Reveal from './Reveal';

const About = ({ main, t = {} }) => (
  <Reveal className="section" id="about" aria-labelledby="about-title">
    <h2 id="about-title" className="section-label">{t.about || 'About'}</h2>
    <div className="section-body prose">
      {(main.professionalBio || []).map((paragraph) => (
        <p key={paragraph}><Inline text={paragraph} /></p>
      ))}
    </div>
  </Reveal>
);

export default About;
