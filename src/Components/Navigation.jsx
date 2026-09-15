import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const items = [{ id: 'experience', label: 'Experience' }, { id: 'work', label: 'Work' }, { id: 'notes', label: 'Notes' }, { id: 'contact', label: 'Contact' }];

export default function Navigation({ name }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const toggle = useRef(null);
  useEffect(() => {
    const onKey = event => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  useEffect(() => {
    const update = () => {
      let current = '';
      for (const { id } of items) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <header className="site-header">
      <nav className="navigation" aria-label="Primary navigation">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)}>{name}<span aria-hidden="true">.</span></a>
        <button type="button" className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls="primary-links" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(value => !value)}><FontAwesomeIcon icon={open ? faXmark : faBars} aria-hidden="true" /></button>
        <ul id="primary-links" className={open ? 'nav-links is-open' : 'nav-links'}>
          {items.map(item => <li key={item.id}><a href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}</a></li>)}
        </ul>
      </nav>
    </header>
  );
}
