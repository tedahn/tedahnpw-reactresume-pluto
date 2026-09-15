import React from 'react';

function Entry({ role }) {
  return (
    <article className="experience-entry">
      <div className="entry-heading"><h3>{role.company}</h3><span className="entry-date">{role.dates}</span></div>
      <p className="entry-role">{role.title}</p>
      <ul className="impact-list">{role.achievements.map(item => <li key={item.title}>{item.desc}</li>)}</ul>
      {role.contextLinks?.length > 0 && <details className="context-details"><summary>Product context</summary>
        {role.contextLinks.map(link => <a className="context-link" key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
          <img src={link.image} alt={link.imageAlt || ''} width="80" height="64" loading="lazy" />
          <span><strong>{link.label}</strong><small>{link.context}</small></span>
        </a>)}
      </details>}
    </article>
  );
}

export default function Experience({ work, education }) {
  // Canonical data is maintained in chronological order; preserve promotion boundaries.
  const roles = [...work].reverse();
  return (
    <section id="experience" className="content-section" aria-labelledby="experience-heading">
      <header className="section-heading"><span className="section-number" aria-hidden="true">01</span><h2 id="experience-heading">Experience</h2></header>
      <div className="experience-list">{roles.slice(0, 3).map(role => <Entry key={`${role.company}-${role.dates}`} role={role} />)}</div>
      <details className="earlier-experience"><summary>Earlier experience & education</summary>
        {roles.slice(3).map(role => <Entry key={`${role.company}-${role.dates}`} role={role} />)}
        <div className="education-list">{[...education].reverse().map(item => <article key={item.school}><h3>{item.school}</h3><p>{item.degree}</p><p className="entry-date">{item.graduated}</p></article>)}</div>
      </details>
    </section>
  );
}
