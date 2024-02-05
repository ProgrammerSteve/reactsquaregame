import React from "react";

const ButtonsAB=()=>{
    return(<>
              <div
            className="a-buttonContainer btn"
            onClick={() => {
              setStageTime(0);
              setXPos(level !== 0 ? xArr[level - 1] : 0);
              setYPos(level !== 0 ? yArr[level - 1] : 25);
              setCoord(...coordInitial);
              resetStageTime();
            }}
          >
            <p>A</p>
          </div>

          <div
            className="b-buttonContainer btn"
            onClick={() => {
              setlevel(0);
              setScore(0);
              setStageTimes([0, 0, 0, 0, 0, 0]);
              setStageScores([0, 0, 0, 0, 0, 0]);
              setTime(0);
              setXPos(0);
              setYPos(25);
              setCoord(...coordInitial);
              resetAllTime();
            }}
          >
            <p>B</p>
          </div>
    
    </>)
}

export default ButtonsAB