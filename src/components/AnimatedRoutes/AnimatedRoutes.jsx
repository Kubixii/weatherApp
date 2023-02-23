import { Navigate, Route, Routes, useLocation } from 'react-router';

import { AnimatePresence } from 'framer-motion';
import Hourly from '../Hourly/Hourly';
import Main from '../Main/Main';
import MotionWrapper from '../MotionWrapper/MotionWrapper';
import React from 'react'
import Week from '../Week/Week';
import { defaultParams } from '../../helpers/defaults';

const AnimatedRoutes = () => {
    const location = useLocation()
    const { lat, lon, type } = defaultParams
    return (
        <AnimatePresence mode="wait" >
            <Routes location={location} key={location.pathname.split("/")[3]}>
                <Route path='/:lat/:lon' element={<Main />} >
                    <Route path='hourly' element={
                        <MotionWrapper>
                            <Hourly />
                        </MotionWrapper>
                    } />
                    <Route path='week' element={
                        <MotionWrapper>
                            <Week />
                        </MotionWrapper>
                    } />
                </Route>
                <Route path='*' element={<Navigate to={`/${lat}/${lon}/${type}`} />} />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;