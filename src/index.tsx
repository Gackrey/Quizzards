import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QuizProvider } from './Context/QuizContext'
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QuizProvider>
        <App />
      </QuizProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
