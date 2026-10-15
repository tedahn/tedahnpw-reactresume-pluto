import React, { useEffect, useRef, useState } from 'react';

// Fades a section in once it scrolls into view. Content stays visible when
// IntersectionObserver is unavailable or the visitor prefers reduced motion.
const Reveal = ({ as: Tag = 'section', className = '', children, ...rest }) => {
  const ref = useRef(null);
  const [state, setState] = useState('static');

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window) || !ref.current) return undefined;
    setState('hidden');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setState('shown');
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`${className} reveal reveal-${state}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
