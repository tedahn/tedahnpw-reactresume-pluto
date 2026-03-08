import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Hero = ({ data }) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
        >
          <motion.h1 className="hero-name" variants={itemVariants}>
            {data.name}
          </motion.h1>

          <motion.p className="hero-subtitle gradient-text" variants={itemVariants}>
            {data.occupation}
          </motion.p>

          <motion.p className="hero-tagline" variants={itemVariants}>
            {data.description}
          </motion.p>

          <motion.div className="hero-cta-group" variants={itemVariants}>
            <button
              className="cta-button"
              onClick={() => handleScroll('experience')}
            >
              <FontAwesomeIcon icon={faArrowDown} className="btn-icon" />
              View My Journey
            </button>
            <button
              className="cta-button cta-button-outline"
              onClick={() => handleScroll('contact')}
            >
              <FontAwesomeIcon icon={faEnvelope} className="btn-icon" />
              Get in Touch
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
