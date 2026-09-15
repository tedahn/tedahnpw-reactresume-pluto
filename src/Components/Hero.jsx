import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUpRightFromSquare, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Hero({ data }) {
  const initials = data.name.split(' ').map(part => part[0]).join('');
  return (
    <section id="home" className="profile-card" aria-labelledby="profile-name">
      <div className="profile-banner" aria-hidden="true" />
      <div className="profile-body">
        <div className="profile-monogram" aria-hidden="true">{initials}<span>.</span></div>
        <p className="eyebrow">{data.profileLabel}</p>
        <h1 id="profile-name">{data.name}</h1>
        <p className="profile-role">{data.occupation}</p>
        <p className="profile-description">{data.description}</p>
        <p className="profile-location"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />{data.basecity}, {data.address.state}</p>
        <div className="profile-actions">
          <a className="button button-primary" href={data.resumeResources.printable}>View resume <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" /></a>
          <a className="button button-secondary" href={`mailto:${data.email}`}><FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /> Email me</a>
        </div>
        <div className="profile-socials">
          {data.social.filter(network => network.url.startsWith('https://')).map(network => (
            <a key={network.name} href={network.url} target="_blank" rel="noopener noreferrer">{network.name === 'github' ? 'GitHub' : 'LinkedIn'} <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" /></a>
          ))}
        </div>
      </div>
      <a className="profile-explore" href="#work">Explore selected work <FontAwesomeIcon icon={faArrowDown} aria-hidden="true" /></a>
    </section>
  );
}
