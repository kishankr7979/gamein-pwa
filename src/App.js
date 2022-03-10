import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import RouterConfig from './config/routes'
import logo from './logo.svg';
import './App.css';
function App() {
  return (
    <div className="App">
      <Router>
        <RouterConfig />
      </Router>
    </div>
  );
}

export default App;
