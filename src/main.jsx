import React from 'react';
import './index.css';
import MainComponent from './MainComponent.jsx';

import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    	<div className="indexContainer">
  		<MainComponent/>
    </div>
  </React.StrictMode>
);
