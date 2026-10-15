import React from 'react';

const relative = (path) => (path || '').replace(/^\//, '');

const Footer = ({ main }) => {
  const resources = main.resumeResources || {};

  return (
    <footer className="site-footer">
      <a href={`mailto:${main.email}`}>{main.email}</a>
      <nav aria-label="Résumé formats">
        <a href={relative(resources.ai)}>Résumé for AI (.md)</a>
        <a href={relative(resources.structured)}>JSON</a>
        <a href={relative(resources.text)}>TXT</a>
      </nav>
      <span>© {new Date().getFullYear()} {main.name}</span>
    </footer>
  );
};

export default Footer;
