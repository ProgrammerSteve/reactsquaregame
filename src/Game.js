import React, {useEffect, useState, useRef, useContext} from "react";
import { Motion, spring, presets } from "react-motion";
import {Context} from './MainComponent.js';
import {coeff} from './movement.js';
import { stageconst } from "./stagesetup.js";
import './Game.css';


const displayIncrement=20;// sets the pixel basis

const handleSubmitForm=(e)=>{
  e.preventDefault();
}
const purpleSquare=(xArr,yArr)=>{
  return(<div 
  style={{  position: `absolute`,
            width:`${displayIncrement-4}px`, //ALTERATION 1
            height:`${displayIncrement-4}px`, //ALETERATION 1
            backgroundColor:`purple`,
            marginLeft:`${xArr}px`,
            marginTop:`${yArr}px`,
            border:`2px solid black`,
        }}/>);
}
//The purple squares mapped out from Coord state
const evilSquare=(level,coord)=>{
  const elements=[];
  coord[`stage${level}`].map((pos)=>{
    elements.push(purpleSquare(pos[0],pos[1]));
  })
  return elements;
}
//appears when game is completed
const winningDiv=(level)=>{
  if(level===6){
    return(
      <div style={{
              zIndex: `1`,  
              position: `absolute`,
              marginInline:`auto`,
              marginTop:`25px`,
              backgroundColor:`maroon`,
              color:  `white`,
              paddingInline: `20px`
      }}>
        <h2>WINNER! Thanks For Playing!</h2>
        <h3>[Press B to start again]</h3>
      </div>
    );
  }
}

function Game() {
  

  //position
  const [xPos, setXPos]= useState(0);
  const [yPos, setYPos]= useState(25);//this should stay the same
  //Yellow square locations
  // const [xArr,setXArr]=useState([75,25,250,75,25,200,-200]);
  // const [yArr,setYArr]=useState([200,50,200,50,250,50,-200]);
  const [xArr,setXArr]=useState([3,1,10,3,1,8,-8].map(num=>num*displayIncrement));//ALTERATION 1
  const [yArr,setYArr]=useState([7,1,7,1,9,1,-9].map(num=>num*displayIncrement+25));//ALTERATION 1

  //The purple block coordinates
  const [coord, setCoord]=useState(stageconst(displayIncrement));
  //initial value of coor
  const [coordInitial, setCoordInitial]=useState(stageconst(displayIncrement));

  //game mechanics state imported from the context
  const {
    score,        setScore,
    level,        setlevel,
    time,         setTime,
    stageTime,    setStageTime,
    toggle,       setToggle,
    stageToggle,  setStageToggle,
    stageScores,  setStageScores,
    stageTimes,   setStageTimes,    
  } = useContext(Context);

  // const[level, setlevel]= useState(0);
  const[moveIncrement, setMoveIncrement]= useState(displayIncrement);
  const[startMove, setMove]=useState([false,false,false,false]);
  let timeIncrement=50; //Used for the setTimeout for the D-pad button inputs
  //for React-Motion
  const initialStyle={
    opacity: spring(1),
    translateX: spring(xPos, presets.wobbly),
    translateY: spring(yPos, presets.wobbly),
  }   
  //time
  const stageRef=useRef(null);

  useEffect(()=>{
    stageRef.current=setInterval(()=>{
      setStageTime(stageTime=>stageTime+1);
    },1000)
  },[stageToggle])  

  //stage time gets reset when level changes
  useEffect(()=>{
    resetStageTime();
  },[level])

  useEffect(()=>{
    if(level<6)setTime(time=>time+stageTime);

    setStageTimes(stageTimes.map((num,index)=>{
      if(index===level-1){
        return stageTime
      }else{
        return num
      }
    }));
    setStageScores(stageScores.map((num,index)=>{
      if(index===level-1){
        return (level>1)?(score-stageScores.reduce((num,acc)=>{return acc+num},0)):(score)
      }else{
        return num
      }
    }));

  },[level])

  useEffect(()=>{
    if(xPos===xArr[level]&&yPos===yArr[level]){
      setlevel(level+1);
      setScore(score+25);
    }
    //Reduces score by 10pts if red Circle pos matches
    //any of the purple squares, reduce used to look for any matches
    if(
      coord[`stage${level}`].reduce((acc,num)=>{
        if(num[0]===xPos&&num[1]===yPos)
          {
            return acc+1;
          }else{return acc}
      },0)>0
    ){
      setScore(level<6?score-10:score);
    }   

    //iterates through the 6 stages
    for(let i=0;i<6;i++){
      const line1=[...coordInitial[`stage${i}`]].slice(0,6);
      const line2=[...coordInitial[`stage${i}`]].slice(7,14);
      if(level===i){
        //iterates through the 7 movement configurations
        for(let j=0;j<coeff[i].length;j++){
          if(stageTime%coeff[i].length===j){
            let c1=coeff[i][j][0][0];
            let c2=coeff[i][j][0][1];
            let c3=coeff[i][j][1][0];
            let c4=coeff[i][j][1][1];

            //creates an object with stageX as a key to overwrite
            //the coordInitial object. The map changes the coordinates 
            //of each purple block line by the same amount.
            //The coord state object is then updated
            let obj={};
            obj[`stage${i}`]=[
              ...line1.map(num=>{return[num[0]+displayIncrement*c1,num[1]+displayIncrement*c2]}),
              ...line2.map(num=>{return[num[0]+displayIncrement*c3,num[1]+displayIncrement*c4]}),
            ];

            let newObj={
              ...coordInitial,
              ...obj, 
            }
            return setCoord({
              ...newObj,
            });
          } 
        }
      } 
    }

  },[xPos,yPos,stageTime])

  const resetAllTime=()=>{
    clearInterval(stageRef.current);
    setTime(0);
    setStageTime(0);
    toggle?setToggle(false):setToggle(true);
    stageToggle?setStageToggle(false):setStageToggle(true);
  }

  const resetStageTime=()=>{
    clearInterval(stageRef.current);
    setStageTime(0);
    stageToggle?setStageToggle(false):setStageToggle(true)
  }

  return (
    <div>
        <div className="bigContainer">
        <div 
        className="gamescreen"
        style=
        {{
          width:`${displayIncrement*12}px`,
          height:`${displayIncrement*11+25}px`
        }}
        >
            <p id="score">Score:{score<-999?-999:score} / Lv:{level+1} / X:{xPos} Y:{yPos} / Time:{stageTime>999?999:level===6?0:stageTime} / Total:{time>999?999:time}</p>
            <div id="line"/>

            <div
            style={{  position: `absolute`,
                      width:`${displayIncrement}px`,
                      height:`${displayIncrement}px`,
                      backgroundColor:`yellow`,
                      marginLeft:`${xArr[level]}px`,
                      marginTop:`${yArr[level]}px`,
            }}/>

            {evilSquare(level<6?level:5,coord)}
            {winningDiv(level)}

            <Motion
            style={
              startMove[0]?{
                opacity: spring(1),
                translateX: spring(0+xPos),
                translateY: spring(yPos-displayIncrement),
              }:startMove[1]?{
                opacity: spring(1),
                translateX: spring(displayIncrement+xPos),
                translateY: spring(0+yPos),
              }:startMove[2]?{
                opacity: spring(1),
                translateX: spring(0+xPos),
                translateY: spring(displayIncrement+yPos),
              }:startMove[3]?{
                opacity: spring(1),
                translateX: spring(xPos-displayIncrement),
                translateY: spring(0+yPos),
              }:initialStyle
            }
            >
              {interpolatedStyles => (
                <div
                  style={{
                    transform: `translate(${interpolatedStyles.translateX}px, ${interpolatedStyles.translateY}px)`,
                    opacity: interpolatedStyles.opacity
                  }}
                >
                  <div 
                    className="player" 
                    style=
                    {{  
                      width:`${displayIncrement}px`, 
                      height:`${displayIncrement}px`,
                      borderRadius: `${displayIncrement*0.5}px`
                    }}
                  ></div>
                </div>
              )}
            </Motion>
        </div>
        <div className="buttonLayout">
          <div className="dPad">






















              <div> </div>
              <button 
              id="resetButton"
              onClick={(e)=>{
              handleSubmitForm(e);
              if(yPos>25)setMove([true,false,false,false]);
              setTimeout(function(){
                setMove([false,false,false,false]);
                if(yPos>25)setYPos(yPos-displayIncrement);
              }, timeIncrement);
              }}>↑</button>
              <div> </div>

              <button 
              id="resetButton"
              onClick={(e)=>{
              handleSubmitForm(e);
              if(xPos>0)setMove([false,false,false,true]);
              setTimeout(function(){
                setMove([false,false,false,false]);
                if(xPos>0)setXPos(xPos-displayIncrement);
              }, timeIncrement);
              }}>←</button>
              <div> </div>

              <button 
              id="resetButton"
              onClick={(e)=>{
              handleSubmitForm(e);
              if(xPos<displayIncrement*11)setMove([false,true,false,false]);
              setTimeout(function(){
                setMove([false,false,false,false]);
                if(xPos<displayIncrement*11)setXPos(xPos+displayIncrement);
              }, timeIncrement);
              }}>→</button>

              <div> </div>
              <button 
              id="resetButton"
              onClick={(e)=>{
              handleSubmitForm(e);
              if(yPos<displayIncrement*11)setMove([false,false,true,false]);
              setTimeout(function(){
                setMove([false,false,false,false]);
                if(yPos<displayIncrement*11)setYPos(yPos+displayIncrement);
              }, timeIncrement);
              }}>↓</button>
              <div> </div>
          </div> 































          <div 
          className="a-buttonContainer btn"
          onClick={()=>{
              setStageTime(0);
              setXPos(level!=0?xArr[level-1]:0);
              setYPos(level!=0?yArr[level-1]:25);
              setCoord(...coordInitial);
              resetStageTime();
          }}
          ><p>A</p></div>

           <div 
            className="b-buttonContainer btn"
            onClick={()=>{
              setlevel(0);
              setScore(0);
              setStageTimes([0,0,0,0,0,0]);
              setStageScores([0,0,0,0,0,0]);
              setTime(0);
              setXPos(0);
              setYPos(25);
              setCoord(...coordInitial);
              resetAllTime();
            }
          }><p>B</p></div>
          </div>
          </div>
    </div>
  );
}
export default Game;