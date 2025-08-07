import React,{useState, createContext} from "react";
import "./MainComponent.css";
import Game from './Game';
import Scoreboard from './Scoreboard';
import MusicToggle from "./MusicToggle";

export interface IPayload {
	score: number;
	level: number;
	time: number;
	stageTime: number;
	toggle: boolean;
	stageToggle: boolean;
	stageScores: number[];
	stageTimes: number[];
	setScore: React.Dispatch<React.SetStateAction<number>>;
	setlevel: React.Dispatch<React.SetStateAction<number>>;		
	setTime: React.Dispatch<React.SetStateAction<number>>;
	setStageTime: React.Dispatch<React.SetStateAction<number>>;
	setToggle: React.Dispatch<React.SetStateAction<boolean>>;
	setStageToggle: React.Dispatch<React.SetStateAction<boolean>>;
	setStageScores: React.Dispatch<React.SetStateAction<number[]>>;
	setStageTimes: React.Dispatch<React.SetStateAction<number[]>>;
}

const defaultPayload: IPayload = {
	score: 0,
	level: 0,
	time: 0,
	stageTime: 0,
	toggle: true,
	stageToggle: true,
	stageScores: [0, 0, 0, 0, 0,0],
	stageTimes: [0, 0, 0, 0, 0, 0],
	setScore: () => {},
	setlevel: () => {},	
	setTime: () => {},
	setStageTime: () => {},
	setToggle: () => {},
	setStageToggle: () => {},
	setStageScores: () => {},
	setStageTimes: () => {},
};

export const Context = createContext<IPayload>(defaultPayload);

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
			<div className="flexContainer">
				<div style={{ height: 20, display: "flex", alignItems: "center", backgroundColor: "#282c34", padding: "0 10px", color: "white" }}>
					<div style={{ flex: 1, display: "flex", alignItems: "center", height: "100%" }}>
						<h1 style={{ fontSize: "1rem", margin: 0, lineHeight: "20px" }}>React Square Game</h1>
					</div>
					<MusicToggle/>
				</div>
				<Game/>
				<Scoreboard/>	
				
			</div>
		</Context.Provider>
	</div>

	);
}

export default MainComponent;