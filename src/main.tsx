import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import './index.css'
import { FilmsProvider } from './contexts/FilmsContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FilmsProvider>
        <App />
      </FilmsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
