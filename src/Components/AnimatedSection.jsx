import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const transitionMap = {
    'wipe-left': {
        initial: { opacity: 0, x: -60 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: 'easeOut' },
    },
    'fade-up': {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: 'easeOut' },
    },
    'scale-in': {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: 'easeOut' },
    },
    'fade-in': {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1.2, ease: 'easeOut' },
    },
};

const AnimatedSection = ({ children, className, id, transition = 'fade-up' }) => {
    const ref = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    // Trigger when 10% of element is in view.
    // "once: true" keeps it visible after.
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    if (prefersReducedMotion) {
        return (
            <div ref={ref} id={id} className={className}>
                {children}
            </div>
        );
    }

    const config = transitionMap[transition] || transitionMap['fade-up'];

    return (
        <motion.div
            ref={ref}
            id={id}
            className={className}
            initial={config.initial}
            animate={isInView ? config.animate : config.initial}
            transition={config.transition}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
