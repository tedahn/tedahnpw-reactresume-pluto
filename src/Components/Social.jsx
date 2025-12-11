import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Social = ({ data }) => {
  if (!data) return null;

  return (
    <footer className="social-section">
      <div className="social-links">
        {data.social.map((network) => (
          <a key={network.name} href={network.url} target="_blank" rel="noopener noreferrer" aria-label={network.name}>
            <FontAwesomeIcon icon={[network.iconType, network.className]} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Social;
