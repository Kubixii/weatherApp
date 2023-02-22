import './index.css'

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import TestApp from './TestComponents/TestApp/TestApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <TestApp />

  </React.StrictMode>,
)
