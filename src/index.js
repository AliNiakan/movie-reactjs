import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap the entire application with BrowserRouter */}
      <AuthProvider> {/* Wrap the AuthProvider here */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
