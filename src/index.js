import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserContext from './context/UserContext';
ReactDOM.render(
  <UserContext>
    <App />
  </UserContext>,
  document.getElementById('root')
);