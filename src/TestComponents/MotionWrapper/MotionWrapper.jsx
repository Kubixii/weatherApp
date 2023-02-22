import { AnimatePresence } from 'framer-motion';
import React from 'react'
import { useLocation } from 'react-router';

const MotionWrapper = ({ children }) => {
    const location = useLocation()
    return (
        <AnimatePresence
            key={location.pathname}
        >
            {children}
        </AnimatePresence>
    );
}

export default MotionWrapper;