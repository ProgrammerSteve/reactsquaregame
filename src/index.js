import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game.js';
import Scoreboard from './Scoreboard.js';
import MainComponent from './MainComponent.js';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
  	<div className="indexContainer">
  		<MainComponent/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
