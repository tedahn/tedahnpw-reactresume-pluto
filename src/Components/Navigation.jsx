import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Works' },
    { id: 'contact', label: 'Contact' }
  ];

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="nav-container">
      {/* Mobile Toggle Button */}
      <div className="mobile-menu-btn" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </div>

      {/* Navigation Links */}
      <ul id="nav" className={isMobileMenuOpen ? 'mobile-open' : ''}>
        {navItems.map(item => (
          <li key={item.id} className={activeSection === item.id ? 'current' : ''}>
            <a 
              className="smoothscroll" 
              href={`#${item.id}`}
              onClick={handleLinkClick}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Overlay Backdrop */}
      <div 
        className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default Navigation;