import React from 'react';
import { createRoot } from 'react-dom/client';
import { TownBoard } from './tinytowns'; // 👈 Make sure tinytowns exports TownBoard, not App
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <TownBoard />
  </React.StrictMode>
);
