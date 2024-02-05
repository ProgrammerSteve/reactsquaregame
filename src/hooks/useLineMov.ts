import React, {useEffect} from "react";
import { Coord } from "../context/ScoreContext";
import { coeff } from "../movement";
import { useScoreContext } from "../context/ScoreContext";

const displayIncrement = 20; // sets the pixel basis

export const useLineMov=(stageTime:number)=>{
    let {
        level,
        xPos,
        score,
        yPos,
        coord,
        coordInitial,
        xArr,
        yArr,
        handleCoord,
        handleLevel,
        handleScore,
    }=useScoreContext()
    useEffect(() => {
        if (xPos === xArr[level] && yPos === yArr[level]) {
          handleLevel(level + 1);
          handleScore(score + 25);
        }
        //Reduces score by 10pts if red Circle pos matches
        //any of the purple squares, reduce used to look for any matches
        if (
          coord[`stage${level}`].reduce((acc, num) => {
            if (num[0] === xPos && num[1] === yPos) {
              return acc + 1;
            } else {
              return acc;
            }
          }, 0) > 0
        ) {
          handleScore(level < 6 ? score - 10 : score);
        }
    
        //iterates through the 6 stages
        for (let i = 0; i < 6; i++) {
          const line1 = [...coordInitial[`stage${i}`]].slice(0, 6);
          const line2 = [...coordInitial[`stage${i}`]].slice(7, 14);
          if (level === i) {
            //iterates through the 7 movement configurations
            for (let j = 0; j < coeff[i].length; j++) {
              if (stageTime % coeff[i].length === j) {
                let c1 = coeff[i][j][0][0];
                let c2 = coeff[i][j][0][1];
                let c3 = coeff[i][j][1][0];
                let c4 = coeff[i][j][1][1];
    
                //creates an object with stageX as a key to overwrite
                //the coordInitial object. The map changes the coordinates
                //of each purple block line by the same amount.
                //The coord state object is then updated
                let obj:Coord = {};
                obj[`stage${i}`] = [
                  ...line1.map((num) => {
                    return [
                      num[0] + displayIncrement * c1,
                      num[1] + displayIncrement * c2,
                    ];
                  }),
                  ...line2.map((num) => {
                    return [
                      num[0] + displayIncrement * c3,
                      num[1] + displayIncrement * c4,
                    ];
                  }),
                ];
    
                let newObj = {
                  ...coordInitial,
                  ...obj,
                };
                return handleCoord({
                  ...newObj,
                });
              }
            }
          }
        }
      }, [xPos, yPos, stageTime]);
}