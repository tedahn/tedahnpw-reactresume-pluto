import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ activeSection, name, hasProjects }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: hasProjects ? 'Work + Ideas' : 'Ideas' },
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
    <nav className="nav-container" aria-label="Primary navigation">
      {/* Progress indicator */}
      <div className="nav-progress" style={{ width: `${progressWidth}%` }} />

      {/* Site Name / Logo */}
      <a href="#home" className="nav-logo" onClick={handleLinkClick}>{name}</a>

      {/* Mobile Toggle Button */}
      <button
        className="mobile-menu-btn"
        onClick={toggleMenu}
        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="nav"
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
      <button
        type="button"
        className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-label="Close navigation menu"
        tabIndex={isMobileMenuOpen ? 0 : -1}
      />
    </nav>
  );
};

export default Navigation;
