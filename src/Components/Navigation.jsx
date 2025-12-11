import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = ({ activeSection }) => {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Works' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="nav-container">
      <ul id="nav">
        {navItems.map(item => (
          <li key={item.id} className={activeSection === item.id ? 'current' : ''}>
            <a className="smoothscroll" href={`#${item.id}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;