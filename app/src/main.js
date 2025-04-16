import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app.jsx';

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(React.createElement(App));

// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { TownBoard } from './tinytowns'; // or './board' if that's what you named it

// Render the TinyTowns board into the root of your application.
ReactDOM.render(
  <React.StrictMode>
    <TownBoard />
  </React.StrictMode>,
  document.getElementById('root')
);
