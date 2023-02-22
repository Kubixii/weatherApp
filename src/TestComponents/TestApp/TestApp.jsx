import { Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom'

import AnimatedRoutes from '../AnimatedRoutes/AnimatedRoutes';
import React from 'react'
import TestNav from '../TestNav/TestNav';

const TestApp = () => {
    return (
        <Router>
            <TestNav />
            <AnimatedRoutes />
        </Router>
    );
}

export default TestApp;