import React from 'react';
import './index.css';
import MainComponent from './MainComponent';

import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <div className="indexContainer">
        <MainComponent />
      </div>
    </React.StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
