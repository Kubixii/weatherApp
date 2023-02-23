import { Route, Routes, useLocation } from 'react-router';

import { AnimatePresence } from 'framer-motion';
import Cos from '../Cos/Cos';
import Cos2 from '../Cos/Cos2';
import MotionWrapper from '../MotionWrapper/MotionWrapper';
import React from 'react'
import TestPageOne from '../TestPageOne/TestPageOne';
import TestPageTwo from '../TestPageTwo/TestPageTwo';

const AnimatedRoutes = () => {
    const location = useLocation()
    return (
        <AnimatePresence
            mode="wait"
        >
            <Routes
                location={location} key={location.pathname}
            >
                <Route path='/jeden' element={<TestPageOne />}>
                    <Route path='cos' element={
                        <MotionWrapper>
                            <Cos />
                        </MotionWrapper>
                    } />
                    <Route path='cos2' element={
                        <MotionWrapper>
                            <Cos2 />
                        </MotionWrapper>
                    } />
                </Route>
                <Route path='/dwa' element={<TestPageTwo />} />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;