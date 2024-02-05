import React, {useRef,useEffect} from "react";
import { useScoreContext } from "../context/ScoreContext";

const displayIncrement = 20; // sets the pixel basis
let timeIncrement = 50; //Used for the setTimeout for the D-pad button inputs

export const useStageRef=()=>{
    const stageRef = useRef<number|undefined>(undefined);
    let {
        stageToggle,
        stageTime,
        toggle,
        level,
        xPos,
        yPos,
        coordInitial,
        xArr,
        yArr,
        handleStageTime,
        handleTime,
        handleStageToggle,
        handleToggle,
        handleXPos,
        handleYPos,
        handleCoord,
        handleLevel,
        handleMove,
        handleScore,
        handleStageScores,
        handleStageTimes,
    }=useScoreContext()

    useEffect(() => {
        stageRef.current = setInterval(() => {
          handleStageTime(stageTime + 1);
        }, 1000);
      }, [stageToggle]);
    
      //stage time gets reset when level changes
      useEffect(() => {
        resetStageTime();
      }, [level]);

    const resetStageTime = () => {
        clearInterval(stageRef.current);
        handleStageTime(0);
        handleStageToggle(!stageToggle)
    };
    const resetAllTime = () => {
        clearInterval(stageRef.current);
        handleTime(0);
        handleStageTime(0);
        handleToggle(!toggle)
        handleStageToggle(!stageToggle)
    };
    const handleAClick = () => {
        handleStageTime(0);
        handleXPos(level !== 0 ? xArr[level - 1] : 0);
        handleYPos(level !== 0 ? yArr[level - 1] : 25);
        handleCoord({ ...coordInitial });
        resetStageTime();
      };
      const handleBClick = () => {
        handleLevel(0);
        handleScore(0);
        handleStageTimes([0, 0, 0, 0, 0, 0]);
        handleStageScores([0, 0, 0, 0, 0, 0]);
        handleTime(0);
        handleXPos(0);
        handleYPos(25);
        handleCoord({ ...coordInitial });
        resetAllTime();
      };
      const handleUpClick = () => {
        //handleSubmitForm(e);
        if (yPos > 25) handleMove([true, false, false, false]);
        setTimeout(function () {
          handleMove([false, false, false, false]);
          if (yPos > 25) handleYPos(yPos - displayIncrement);
        }, timeIncrement);
      };
      const handleLeftClick = () => {
        //handleSubmitForm(e);
        if (xPos > 0) handleMove([false, false, false, true]);
        setTimeout(function () {
          handleMove([false, false, false, false]);
          if (xPos > 0) handleXPos(xPos - displayIncrement);
        }, timeIncrement);
      };
      const handleRightClick = () => {
        //handleSubmitForm(e);
        if (xPos < displayIncrement * 11) handleMove([false, true, false, false]);
        setTimeout(function () {
          handleMove([false, false, false, false]);
          if (xPos < displayIncrement * 11) handleXPos(xPos + displayIncrement);
        }, timeIncrement);
      };
      const handleDownClick = () => {
        //handleSubmitForm(e);
        if (yPos < displayIncrement * 11) handleMove([false, false, true, false]);
        setTimeout(function () {
          handleMove([false, false, false, false]);
          if (yPos < displayIncrement * 11) handleYPos(yPos + displayIncrement);
        }, timeIncrement);
      };
      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowLeft":
            handleLeftClick();
            break;
          case "ArrowRight":
            handleRightClick();
            break;
          case "ArrowUp":
            handleUpClick();
            break;
          case "ArrowDown":
            handleDownClick();
            break;
          case "a":
          case "A":
            handleAClick();
            break;
          case "b":
          case "B":
            handleBClick();
            break;
          default:
            break;
        }
      };
      useEffect(() => {
        const handleKeyDownListener = (event: KeyboardEvent) => handleKeyDown(event);
        window.addEventListener("keydown", handleKeyDownListener);
  return () => {
    window.removeEventListener("keydown", handleKeyDownListener);
  };
      }, [xPos, yPos]);


      return {
        resetStageTime,
        resetAllTime,
        handleAClick,
        handleBClick,
        handleUpClick,
        handleLeftClick,
        handleRightClick,
        handleDownClick,
        handleKeyDown
      }
}