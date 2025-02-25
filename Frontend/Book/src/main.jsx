import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import store from './Store/index.js'
import { ToastContainer, toast } from 'react-toastify';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </Router>
  </StrictMode>,
)
