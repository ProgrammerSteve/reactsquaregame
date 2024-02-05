import React, { useState, useEffect, useContext, createContext } from "react";
import { stageconst } from "../stagesetup";

const displayIncrement = 20; // sets the pixel basis
const stageInitialCoordinates:Coord=stageconst(displayIncrement)

interface IProps extends React.PropsWithChildren<{}> {}

interface Coord {
  [key: string]: number[][];
}

interface GameContextValue {
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

export const GameContext = createContext<GameContextValue>({
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
      <GameContext.Provider value={value}>
        {props.children}
      </GameContext.Provider>
    );
  }

  export function useGameContext() {
    return useContext(GameContext);
  }