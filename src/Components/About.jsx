import React from 'react';

export default function About({ data, skills }) {
  return (
    <section id="about" className="content-section about-section" aria-labelledby="about-heading">
      <header className="section-heading"><span className="section-number" aria-hidden="true">04</span><h2 id="about-heading">How I work</h2></header>
      <div className="about-copy">{data.bio.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      <details className="skills-details"><summary>Technical toolkit</summary><ul className="technology-list">{skills.map(skill => <li key={skill.name}>{skill.name}</li>)}</ul></details>
    </section>
  );
}
