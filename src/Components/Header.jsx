import React from 'react';

const PROFILE_NETWORKS = ['github', 'linkedin'];

const Header = ({ main }) => {
  const resumeHref = (main.resumeResources?.printable || 'resume.html').replace(/^\//, '');
  const profiles = main.social.filter((network) => PROFILE_NETWORKS.includes(network.name));

  return (
    <header className="site-header">
      <a className="site-name" href="#top">{main.name}</a>
      <nav aria-label="Résumé and profiles">
        <a href={resumeHref}>Résumé</a>
        {profiles.map((network) => (
          <a key={network.name} href={network.url} target="_blank" rel="noopener noreferrer">
            {network.label || network.name}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
