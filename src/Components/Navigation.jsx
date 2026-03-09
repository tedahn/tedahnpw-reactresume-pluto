import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ activeSection, name }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
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

  const activeIndex = navItems.findIndex(item => item.id === activeSection);
  const progressWidth = navItems.length > 1 ? ((activeIndex) / (navItems.length - 1)) * 100 : 0;

  return (
    <nav className="nav-container">
      {/* Progress indicator */}
      <div className="nav-progress" style={{ width: `${progressWidth}%` }} />

      {/* Site Name / Logo */}
      <a href="#home" className="nav-logo" onClick={handleLinkClick}>{name}</a>

      {/* Mobile Toggle Button */}
      <button
        className="mobile-menu-btn"
        onClick={toggleMenu}
        aria-label="Menu"
        aria-expanded={isMobileMenuOpen}
      >
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </button>

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
        aria-hidden="true"
      />
    </nav>
  );
};

export default Navigation;