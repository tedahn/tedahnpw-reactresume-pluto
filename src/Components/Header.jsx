import React from 'react';
import { NodeMark } from './Ornament';

const PROFILE_NETWORKS = ['github', 'linkedin'];

const Header = ({ main, t = {}, lang, onLang }) => {
  const resumeHref = (main.resumeResources?.request || 'resume.html').replace(/^\//, '');
  const profiles = main.social.filter((network) => PROFILE_NETWORKS.includes(network.name));

  return (
    <header className="site-header">
      <a className="site-mark" href="#top" aria-label={`${main.name} — ${t.home || 'back to top'}`}>
        <NodeMark width={28} height={15} />
      </a>
      <div className="header-right">
        <nav aria-label={t.profiles || 'Résumé and profiles'}>
          <a href={resumeHref}>{t.resume || 'Résumé'}</a>
          {profiles.map((network) => (
            <a key={network.name} href={network.url} target="_blank" rel="noopener noreferrer">
              {network.label || network.name}
            </a>
          ))}
        </nav>
        <div className="lang-switch" role="group" aria-label={t.switchLabel || 'Site language'}>
          <button type="button" lang="en" aria-pressed={lang === 'en'} onClick={() => onLang('en')}>EN</button>
          <button type="button" lang="ko" aria-pressed={lang === 'ko'} onClick={() => onLang('ko')}>한국어</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
