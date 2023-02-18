import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'

import Hourly from './components/Hourly/Hourly';
import Main from './components/Main/Main';
import React from 'react'
import StoreProvider from './store/StoreProvider';
import Week from './components/Week/Week';
import { defaultParams } from './helpers/defaults';

const App = () => {
  const { lat, lon, type } = defaultParams

  return (
    <Router>
      <StoreProvider>
        <Routes>
          <Route path='/:lat/:lon' element={<Main />} >
            <Route path='hourly' element={<Hourly />} />
            <Route path='week' element={<Week />} />
          </Route>
          <Route path='*' element={<Navigate to={`/${lat}/${lon}/${type}`} />} />
        </Routes>
      </StoreProvider>
    </Router>
  );
}

export default App;