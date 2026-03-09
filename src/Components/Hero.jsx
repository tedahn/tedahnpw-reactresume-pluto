import React, { Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const HeroScene = React.lazy(() => import('./HeroScene'));

const Hero = ({ data }) => {
  const prefersReducedMotion = useReducedMotion();

  const nameParts = data.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts[1] || '';

  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 },
    },
  };

  const accentLineVariants = {
    hidden: { width: 0 },
    visible: {
      width: 60,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.5 },
    },
  };

  const initial = prefersReducedMotion ? 'visible' : 'hidden';

  const renderLetters = (word) =>
    word.split('').map((char, i) => (
      <motion.span key={i} className="hero-letter" variants={letterVariants}>
        {char}
      </motion.span>
    ));

  return (
    <section id="home" className="hero-section">
      {/* 3D scene — right side background */}
      <motion.div
        className="hero-3d-canvas"
        aria-hidden="true"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <Suspense fallback={null}>
          <HeroScene reducedMotion={prefersReducedMotion} />
        </Suspense>
      </motion.div>

      <div className="hero-content">
        <motion.h1
          className="hero-name"
          aria-label={data.name}
          variants={containerVariants}
          initial={initial}
          animate="visible"
        >
          <span className="hero-name-first">{renderLetters(firstName)}</span>
          <span className="hero-name-last">{renderLetters(lastName)}</span>
        </motion.h1>

        <motion.p
          className="hero-tagline"
          variants={fadeVariants}
          initial={initial}
          animate="visible"
        >
          {data.occupation}
        </motion.p>

        <motion.div
          className="hero-accent-line"
          variants={accentLineVariants}
          initial={initial}
          animate="visible"
        />

        {data.availability && data.availability.collab && (
          <motion.p
            className="hero-status"
            variants={fadeVariants}
            initial={initial}
            animate="visible"
          >
            Open to collaboration
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Hero;
