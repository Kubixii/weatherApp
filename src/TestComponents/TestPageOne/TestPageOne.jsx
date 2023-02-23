import { AnimatePresence, motion } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';

import React from 'react'

const TestPageOne = () => {

    return (
        <div>
            <Link to='cos' >cos </Link>
            <Link to='cos2' >cos2 </Link>
            <p>PIERWSZA</p>
            <div
                style={{
                    overflow: "hidden",
                    border: "solid red 1px",
                    height: "2vh"
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default TestPageOne;