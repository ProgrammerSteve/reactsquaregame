import React from "react"
const ButtonLayout=()=>{


    
    return(
    <div className="buttonLayout">
          <div className="dPad">
            <div> </div>
            <button
              id="resetButton"
              onClick={(e) => {
                handleSubmitForm(e);
                if (yPos > 25) setMove([true, false, false, false]);
                setTimeout(function () {
                  setMove([false, false, false, false]);
                  if (yPos > 25) setYPos(yPos - displayIncrement);
                }, timeIncrement);
              }}
            >
              ↑
            </button>
            <div> </div>

            <button
              id="resetButton"
              onClick={(e) => {
                handleSubmitForm(e);
                if (xPos > 0) setMove([false, false, false, true]);
                setTimeout(function () {
                  setMove([false, false, false, false]);
                  if (xPos > 0) setXPos(xPos - displayIncrement);
                }, timeIncrement);
              }}
            >
              ←
            </button>
            <div> </div>

            <button
              id="resetButton"
              onClick={(e) => {
                handleSubmitForm(e);
                if (xPos < displayIncrement * 11)
                  setMove([false, true, false, false]);
                setTimeout(function () {
                  setMove([false, false, false, false]);
                  if (xPos < displayIncrement * 11)
                    setXPos(xPos + displayIncrement);
                }, timeIncrement);
              }}
            >
              →
            </button>

            <div> </div>
            <button
              id="resetButton"
              onClick={(e) => {
                handleSubmitForm(e);
                if (yPos < displayIncrement * 11)
                  setMove([false, false, true, false]);
                setTimeout(function () {
                  setMove([false, false, false, false]);
                  if (yPos < displayIncrement * 11)
                    setYPos(yPos + displayIncrement);
                }, timeIncrement);
              }}
            >
              ↓
            </button>
            <div> </div>
          </div>

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
        </div>


    )
}


export default ButtonLayout