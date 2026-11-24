import React from 'react';

const relative = (path) => (path || '').replace(/^\//, '');

const Footer = ({ main, t = {} }) => (
  <footer className="site-footer">
    <a href={`mailto:${main.email}`}>{main.email}</a>
    <a href={relative(main.resumeResources?.request || 'resume.html')}>{t.requestResume || 'Request my résumé'}</a>
    <span>© {new Date().getFullYear()} {main.name}</span>
  </footer>
);

export default Footer;
