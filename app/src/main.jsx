// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { TownBoard } from './tinytowns';  // or './board' if you named it board.js
import './index.css';                     // your global Tailwind imports

// Find the root container in your HTML
const container = document.getElementById('root');
// Create a React root
const root = createRoot(container);

// Render the TinyTowns board
root.render(
  <React.StrictMode>
    <TownBoard />
  </React.StrictMode>
);
