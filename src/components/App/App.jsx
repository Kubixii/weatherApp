import '../../fonts/fonts.css'

import AnimatedRoutes from '../AnimatedRoutes/AnimatedRoutes';
import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import StoreProvider from '../../store/StoreProvider';

const App = () => {
  return (
    <Router>
      <StoreProvider>
        <AnimatedRoutes />
      </StoreProvider>
    </Router>
  );
}

export default App;