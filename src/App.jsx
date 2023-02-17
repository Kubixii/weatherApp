import Main from './components/Main/Main';
import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import StoreProvider from './store/StoreProvider';

const App = () => {
  return (
    <Router>
      <StoreProvider>
        <Main />
      </StoreProvider>
    </Router>
  );
}

export default App;