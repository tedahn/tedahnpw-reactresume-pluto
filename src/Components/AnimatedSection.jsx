import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedSection = ({ children, className, id }) => {
    const ref = useRef(null);
    // Trigger when 10% of element is in view (was 0.2). 
    // "once: true" keeps it visible after.
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={ref}
            id={id}
            className={className}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
