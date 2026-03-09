import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

/**
 * Reusable decorative geometric shapes for section backgrounds.
 * Each variant renders a different composition of SVG shapes
 * with scroll-triggered + continuous animations.
 */

const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: 'easeInOut', delay },
      opacity: { duration: 0.4, delay },
    },
  }),
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay },
  }),
};

// --- About: dot grid + sweeping arc ---
const AboutShapes = ({ isInView, initial }) => (
  <div className="section-shapes section-shapes--about" aria-hidden="true">
    {/* Dot grid */}
    <motion.svg
      className="shape-dot-grid"
      viewBox="0 0 120 120"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Array.from({ length: 25 }).map((_, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        return (
          <motion.circle
            key={i}
            cx={12 + col * 24}
            cy={12 + row * 24}
            r="2"
            fill="var(--accent)"
            variants={fadeInVariants}
            custom={0.3 + i * 0.03}
          />
        );
      })}
    </motion.svg>

    {/* Arc sweep */}
    <motion.svg
      className="shape-arc"
      viewBox="0 0 200 200"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.path
        d="M 20 180 Q 20 20, 180 20"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        variants={drawVariants}
        custom={0.5}
      />
      <motion.circle
        cx="180"
        cy="20"
        r="4"
        fill="var(--accent)"
        variants={fadeInVariants}
        custom={1.8}
      />
    </motion.svg>

    {/* Small floating cross */}
    <motion.svg
      className="shape-cross"
      viewBox="0 0 40 40"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.line x1="20" y1="5" x2="20" y2="35" stroke="var(--accent)" strokeWidth="1" variants={drawVariants} custom={0.8} />
      <motion.line x1="5" y1="20" x2="35" y2="20" stroke="var(--accent)" strokeWidth="1" variants={drawVariants} custom={0.9} />
    </motion.svg>
  </div>
);

// --- Experience: vertical line accents + diamond shapes ---
const ExperienceShapes = ({ isInView, initial }) => (
  <div className="section-shapes section-shapes--experience" aria-hidden="true">
    {/* Dashed vertical accent */}
    <motion.svg
      className="shape-vert-line"
      viewBox="0 0 2 300"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.line
        x1="1" y1="0" x2="1" y2="300"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="6 8"
        variants={drawVariants}
        custom={0.2}
      />
    </motion.svg>

    {/* Diamond */}
    <motion.svg
      className="shape-diamond"
      viewBox="0 0 60 60"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.polygon
        points="30,2 58,30 30,58 2,30"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        variants={drawVariants}
        custom={0.6}
      />
      <motion.circle
        cx="30" cy="30" r="3"
        fill="var(--accent)"
        variants={fadeInVariants}
        custom={1.5}
      />
    </motion.svg>

    {/* Small scattered circles */}
    <motion.svg
      className="shape-scatter-circles"
      viewBox="0 0 80 200"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.circle cx="15" cy="30" r="8" fill="none" stroke="var(--accent)" strokeWidth="0.5" variants={drawVariants} custom={0.4} />
      <motion.circle cx="60" cy="80" r="12" fill="none" stroke="var(--accent)" strokeWidth="0.5" variants={drawVariants} custom={0.7} />
      <motion.circle cx="30" cy="150" r="5" fill="none" stroke="var(--accent)" strokeWidth="0.5" variants={drawVariants} custom={1.0} />
      <motion.circle cx="55" cy="180" r="2" fill="var(--accent)" variants={fadeInVariants} custom={1.3} />
    </motion.svg>
  </div>
);

// --- Portfolio: corner brackets + diagonal ---
const PortfolioShapes = ({ isInView, initial }) => (
  <div className="section-shapes section-shapes--portfolio" aria-hidden="true">
    {/* Top-left bracket */}
    <motion.svg
      className="shape-bracket shape-bracket--tl"
      viewBox="0 0 60 60"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.polyline
        points="60,0 0,0 0,60"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        variants={drawVariants}
        custom={0.3}
      />
    </motion.svg>

    {/* Bottom-right bracket */}
    <motion.svg
      className="shape-bracket shape-bracket--br"
      viewBox="0 0 60 60"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.polyline
        points="0,60 60,60 60,0"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        variants={drawVariants}
        custom={0.5}
      />
    </motion.svg>

    {/* Diagonal line */}
    <motion.svg
      className="shape-diagonal"
      viewBox="0 0 200 200"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.line
        x1="0" y1="200" x2="200" y2="0"
        stroke="var(--accent)"
        strokeWidth="0.5"
        strokeDasharray="4 6"
        variants={drawVariants}
        custom={0.4}
      />
    </motion.svg>

    {/* Accent triangle */}
    <motion.svg
      className="shape-tri"
      viewBox="0 0 50 50"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.polygon
        points="25,5 45,42 5,42"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        variants={drawVariants}
        custom={0.7}
      />
    </motion.svg>
  </div>
);

// --- Contact: large composition ---
const ContactShapes = ({ isInView, initial }) => (
  <div className="section-shapes section-shapes--contact" aria-hidden="true">
    {/* Large circle */}
    <motion.svg
      className="shape-large-circle"
      viewBox="0 0 300 300"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.circle
        cx="150" cy="150" r="140"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.5"
        variants={drawVariants}
        custom={0.2}
      />
      <motion.circle
        cx="150" cy="150" r="100"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.5"
        strokeDasharray="3 5"
        variants={drawVariants}
        custom={0.6}
      />
    </motion.svg>

    {/* Small plus signs */}
    <motion.svg
      className="shape-plus shape-plus--1"
      viewBox="0 0 20 20"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.line x1="10" y1="2" x2="10" y2="18" stroke="var(--accent)" strokeWidth="1.5" variants={drawVariants} custom={0.8} />
      <motion.line x1="2" y1="10" x2="18" y2="10" stroke="var(--accent)" strokeWidth="1.5" variants={drawVariants} custom={0.9} />
    </motion.svg>

    <motion.svg
      className="shape-plus shape-plus--2"
      viewBox="0 0 20 20"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.line x1="10" y1="2" x2="10" y2="18" stroke="var(--accent)" strokeWidth="1" variants={drawVariants} custom={1.0} />
      <motion.line x1="2" y1="10" x2="18" y2="10" stroke="var(--accent)" strokeWidth="1" variants={drawVariants} custom={1.1} />
    </motion.svg>

    {/* Horizontal rule with end dots */}
    <motion.svg
      className="shape-hline"
      viewBox="0 0 200 10"
      initial={initial}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.line x1="0" y1="5" x2="200" y2="5" stroke="var(--accent)" strokeWidth="0.5" variants={drawVariants} custom={0.4} />
      <motion.circle cx="0" cy="5" r="2.5" fill="var(--accent)" variants={fadeInVariants} custom={1.6} />
      <motion.circle cx="200" cy="5" r="2.5" fill="var(--accent)" variants={fadeInVariants} custom={1.8} />
    </motion.svg>
  </div>
);

const VARIANTS = {
  about: AboutShapes,
  experience: ExperienceShapes,
  portfolio: PortfolioShapes,
  contact: ContactShapes,
};

const SectionShapes = ({ variant }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (prefersReducedMotion) return null;

  const ShapeComponent = VARIANTS[variant];
  if (!ShapeComponent) return null;

  return (
    <div ref={ref}>
      <ShapeComponent isInView={isInView} initial="hidden" />
    </div>
  );
};

export default SectionShapes;
