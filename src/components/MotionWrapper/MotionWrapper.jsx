import React from 'react'
import { motion } from 'framer-motion'

const MotionWrapper = ({ children }) => {
    const initial = {
        transform: "translateX(-120%)"
    }

    const animate = {
        transform: ["translateX(-120%)", "translateX(0%)"]
    }

    const exit = {
        transform: "translateX(120%)"
    }
    return (
        <motion.div
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}

export default MotionWrapper;