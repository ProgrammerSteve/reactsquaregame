import React, { useState, useEffect, useContext, createContext } from "react";
import { stageconst } from "../stagesetup";

const displayIncrement = 20; // sets the pixel basis
const stageInitialCoordinates:Coord=stageconst(displayIncrement)

interface IProps extends React.PropsWithChildren<{}> {}
export interface Coord {
  [key: string]: number[][];
}


interface ScoreContextValue {
    score:number;			
    level:number;	
    time:number;
    stageTime:number;		
    toggle:boolean;	
    stageToggle:boolean;	
    stageScores:number[],	
    stageTimes:number[],		

    handleScore: (num:number)=>void,
    handleLevel: (num:number)=>void,
    handleTime: (num:number)=>void,
    handleStageTime: (num:number)=>void,
    handleToggle: (bool:boolean)=>void,
    handleStageToggle: (bool:boolean)=>void,
    handleStageScores: (scoreArr:number[])=>void,
    handleStageTimes: (timeArr:number[])=>void,


    xPos:number;
    yPos:number;
    xArr:number[];
    yArr:number[];
    coord:Coord;
    coordInitial:Coord;
    moveIncrement:number;
    startMove:boolean[],

    handleXPos:(num:number)=>void;
    handleYPos:(num:number)=>void;
    handleXArr:(arr:number[])=>void;
    handleYArr:(arr:number[])=>void;
    handleCoord:(coord:Coord)=>void;
    handleCoordInitial:(coord:Coord)=>void;
    handleMoveIncrement:(num:number)=>void;
    handleMove:(boolArr:boolean[])=>void;
}

export const ScoreContext = createContext<ScoreContextValue>({
    score:0,			
    level:0,			
    time:0,			
    stageTime:0,		
    toggle:true,			
    stageToggle:true,	
    stageScores:[0,0,0,0,0,0],	
    stageTimes:[0,0,0,0,0,0],		

    handleScore: ()=>null,
    handleLevel: ()=>null,
    handleTime: ()=>null,
    handleStageTime: ()=>null,
    handleToggle: ()=>null,
    handleStageToggle: ()=>null,
    handleStageScores: ()=>null,
    handleStageTimes: ()=>null,

    xPos:0,
    yPos:25,
    xArr:[3, 1, 10, 3, 1, 8, -8].map((num) => num * displayIncrement),
    yArr:[7, 1, 7, 1, 9, 1, -9].map((num) => num * displayIncrement + 25),
    coord:stageInitialCoordinates,
    coordInitial:stageInitialCoordinates,
    moveIncrement:displayIncrement,
    startMove:[false, false, false, false],

    handleXPos:()=>null,
    handleYPos:()=>null,
    handleXArr:()=>null,
    handleYArr:()=>null,
    handleCoord:()=>null,
    handleCoordInitial:()=>null,
    handleMoveIncrement:()=>null,
    handleMove:()=>null
  });
  
  export function ScoreContextProvider(props: IProps) {

  const[score, setScore]= useState(0);
	const[level, setlevel]= useState(0);
	const[time, setTime]= useState(0);
	const[stageTime, setStageTime]= useState(0);

	const[toggle,setToggle]=useState(true);
	const[stageToggle,setStageToggle]=useState(true);

	const[stageScores, setStageScores]=useState([0,0,0,0,0,0]);
	const[stageTimes, setStageTimes]=useState([0,0,0,0,0,0]);

  const handleScore=(num:number)=>setScore(num)
  const handleLevel=(num:number)=>setlevel(num)
  const handleTime=(num:number)=>setTime(num)
  const handleStageTime=(num:number)=>setStageTime(num)

  const handleToggle=(bool:boolean)=>setToggle(bool)
  const handleStageToggle=(bool:boolean)=>setStageToggle(bool)

  const handleStageScores=(scoreArr:number[])=>setStageScores(scoreArr)
  const handleStageTimes=(timeArr:number[])=>setStageTimes(timeArr)

  
  const [xPos, setXPos] = useState<number>(0);
  const [yPos, setYPos] = useState<number>(25);

  // Yellow square
  const [xArr, setXArr] = useState<number[]>([3, 1, 10, 3, 1, 8, -8].map((num) => num * displayIncrement))
  const [yArr, setYArr] = useState<number[]>([7, 1, 7, 1, 9, 1, -9].map((num) => num * displayIncrement + 25))


  //purpleblock coord
  
  const [coord, setCoord] = useState<Coord>(stageInitialCoordinates);
  const [coordInitial, setCoordInitial] = useState<Coord>(stageInitialCoordinates);

  const [moveIncrement, setMoveIncrement] = useState<number>(displayIncrement);
  const [startMove, setMove] = useState<boolean[]>([false, false, false, false]);

  const handleXPos=(num:number)=>setXPos(num)
  const handleYPos=(num:number)=>setYPos(num)

  const handleXArr=(arr:number[])=>setXArr(arr)
  const handleYArr=(arr:number[])=>setYArr(arr)

  const handleCoord=(coord:Coord)=>setCoord(coord)
  const handleCoordInitial=(coord:Coord)=>setCoordInitial(coord)

  const handleMoveIncrement=(num:number)=>setMoveIncrement(num)
  const handleMove=(boolArr:boolean[])=>setMove(boolArr)
  
    const value = {
        score,
        level,
        time,
        stageTime,
        toggle,
        stageToggle,
        stageScores,
        stageTimes,
        handleScore,
        handleLevel,
        handleTime,
        handleStageTime,
        handleToggle,
        handleStageToggle,
        handleStageScores,
        handleStageTimes,
        xPos,
        yPos,
        xArr,
        yArr,
        coord,
        coordInitial,
        moveIncrement,
        startMove,
        handleXPos,
        handleYPos,
        handleXArr,
        handleYArr,
        handleCoord,
        handleCoordInitial,
        handleMoveIncrement,
        handleMove
      };
    return (
      <ScoreContext.Provider value={value}>
        {props.children}
      </ScoreContext.Provider>
    );
  }

  export function useScoreContext() {
    return useContext(ScoreContext);
  }