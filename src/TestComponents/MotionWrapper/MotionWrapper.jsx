import React from 'react'
import { motion } from 'framer-motion';
import { useLocation } from 'react-router';

const MotionWrapper = ({ children }) => {
    const initial = {
        transform: "translateY(120%)"
    }

    const animate = {
        transform: ["translateY(120%)", "translateY(0%)"]
    }

    const exit = {
        transform: "translateY(120%)"
    }
    return (
        <motion.div
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{ duration: 0.1 }}
            style={{
                overflow: "hidden",
                height: "2vh"
            }}
        >
            {children}
        </motion.div>
    );
}

export default MotionWrapper;