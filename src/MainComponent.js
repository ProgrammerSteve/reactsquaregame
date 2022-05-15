import React,{useState, createContext} from "react";
import "./MainComponent.css";
import Game from './Game.js';
import Scoreboard from './Scoreboard.js';

export const Context = createContext();

const MainComponent=()=>{

	const[score, setScore]= useState(0);
	const[level, setlevel]= useState(0);
	const[time, setTime]= useState(0);
	const[stageTime, setStageTime]= useState(0);
	const[toggle,setToggle]=useState(true);
	const[stageToggle,setStageToggle]=useState(true);
	const[stageScores, setStageScores]=useState([0,0,0,0,0,0]);
	const[stageTimes, setStageTimes]=useState([0,0,0,0,0,0]);

	const payload={
		score,			setScore,
		level,			setlevel,
		time,			setTime,
		stageTime,		setStageTime,
		toggle,			setToggle,
		stageToggle,	setStageToggle,
		stageScores,	setStageScores,
		stageTimes,		setStageTimes,
	}


	return(
	<div className="mainContainer">
		<Context.Provider value={payload}>
					
						<Game/>
						<Scoreboard/>
					
			    	
		</Context.Provider>
	</div>

	);
}

export default MainComponent;