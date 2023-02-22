import { AnimatePresence, motion } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';

import React from 'react'

const TestPageOne = () => {
    const location = useLocation()
    // console.log(location.pathname.split("/")[2]);
    const initial = {
        transform: "translateX(100%)"
    }

    const animate = {
        transform: ["translateX(-100%)", "translateX(0%)"]
    }

    const exit = {
        transform: "translateX(100%)"
    }
    return (
        <div>
            <Link to='cos' >cos </Link>
            <Link to='cos2' >cos2 </Link>
            <p>PIERWSZA</p>
            <Outlet />
        </div>
    );
}

export default TestPageOne;