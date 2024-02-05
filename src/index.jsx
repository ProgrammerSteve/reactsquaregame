import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
// import Game from './Game.jsx';
import Game from './game';
import Scoreboard from './Scoreboard.jsx';
import MainComponent from './MainComponent.jsx';


const root = createRoot(document.getElementById('root'));
root.render(
  <div className="indexContainer">
    <MainComponent />
  </div>
);



// ReactDOM.render(
//   <React.StrictMode>
//   	<div className="indexContainer">
//   		<MainComponent/>
//     </div>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
