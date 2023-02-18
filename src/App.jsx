import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'

import DisplayDaily from './components/DisplayDaily/DisplayDaily';
import DisplayHourly from './components/DisplayHourly/DisplayHourly';
import Main from './components/Main/Main';
import React from 'react'
import StoreProvider from './store/StoreProvider';
import { defaultParams } from './helpers/defaults';

const App = () => {
  const { lat, lon, type } = defaultParams
  return (
    <Router>
      <StoreProvider>
        <Routes>
          <Route
            exact path='*' element={<Navigate to={`/${lat}/${lon}/${type}`} />}
          />
          <Route exact path='/:lat/:lon' element={<Main />} >
            <Route path='hourly' element={<DisplayHourly />} />
            <Route path='daily' element={<DisplayDaily />} />
          </Route>
        </Routes>
      </StoreProvider>
    </Router>
  );
}

export default App;