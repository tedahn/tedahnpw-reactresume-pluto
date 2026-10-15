import React from 'react';
import Inline from './Inline';

const Hero = ({ main }) => (
  <section className="hero" id="top" aria-label="Introduction">
    {main.photo && (
      <div className="hero-ring">
        <img src={main.photo.src} alt={main.photo.alt} width="168" height="168" />
      </div>
    )}
    <h1>{main.name}</h1>
    <p className="role-line"><Inline text={main.roleLine || main.occupation} /></p>
  </section>
);

export default Hero;
