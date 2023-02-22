import React from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router'

const Cos2 = () => {
    const initial = {
        transform: "translateX(100%)"
    }

    const animate = {
        transform: ["translateX(-100%)", "translateX(0%)"]
    }

    const exit = {
        transform: "translateX(100%)"
    }
    const { pathname } = useLocation()
    return (
        <motion.div
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{ duration: 2 }}
            style={{ position: "absolute" }}
            key={pathname}
        >
            <div>
                <p>ZZZZZZZZ</p>
            </div>
        </motion.div>
    );
}

export default Cos2;