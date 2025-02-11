import React, { useEffect, useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { Context } from "./MainComponent.jsx";
import { coeff } from "./movement.js";
import { stageconst } from "./stagesetup.js";
import "./Game.css";

const displayIncrement = 20; // sets the pixel basis

const handleSubmitForm = (e) => {
  e.preventDefault();
};

const purpleSquare = (xArr, yArr, key) => {
  return (
    <div
      key={key}
      style={{
        position: `absolute`,
        width: `${displayIncrement - 4}px`,
        height: `${displayIncrement - 4}px`,
        backgroundColor: `purple`,
        marginLeft: `${xArr}px`,
        marginTop: `${yArr}px`,
        border: `2px solid black`,
      }}
    />
  );
};

const evilSquare = (level, coord) => {
  const elements = [];
  coord[`stage${level}`].map((pos,index) => {
    elements.push(purpleSquare(pos[0], pos[1],`purple-${level}-${index}`));
  });
  return elements;
};

const winningDiv = (level) => {
  if (level === 6) {
    return (
      <div
        style={{
          zIndex: `1`,
          position: `absolute`,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "grid",
          placeItems: "center",
          color: `white`,
          textShadow:
            "-1px -1px 0 #000,0 -1px 0 #000,1px -1px 0 #000,1px 0 0 #000,1px 1px 0 #000,0 1px 0 #000,-1px 1px 0 #000,-1px 0 0 #000",
        }}
      >
        <h2 style={{ fontWeight: "700", paddingInline: 20 }}>
          WINNER! Thanks For Playing!
        </h2>
        <h3>[Press B to start again]</h3>
      </div>
    );
  }
};

function Game() {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(25);
  const [xArr, setXArr] = useState(
    [3, 1, 10, 3, 1, 8, -8].map((num) => num * displayIncrement)
  );
  const [yArr, setYArr] = useState(
    [7, 1, 7, 1, 9, 1, -9].map((num) => num * displayIncrement + 25)
  );

  const [coord, setCoord] = useState(stageconst(displayIncrement));
  const [coordInitial, setCoordInitial] = useState(stageconst(displayIncrement));

  const {
    score,
    setScore,
    level,
    setlevel,
    time,
    setTime,
    stageTime,
    setStageTime,
    toggle,
    setToggle,
    stageToggle,
    setStageToggle,
    stageScores,
    setStageScores,
    stageTimes,
    setStageTimes,
  } = useContext(Context);

  const [moveIncrement, setMoveIncrement] = useState(displayIncrement);
  const [startMove, setMove] = useState([false, false, false, false]);
  let timeIncrement = 50;

  // Animation variants for framer-motion
  const motionVariants = {
    initial: {
      x: xPos,
      y: yPos,
      opacity: 1,
    },
    up: {
      x: xPos,
      y: yPos - displayIncrement,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    },
    right: {
      x: xPos + displayIncrement,
      y: yPos,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    },
    down: {
      x: xPos,
      y: yPos + displayIncrement,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    },
    left: {
      x: xPos - displayIncrement,
      y: yPos,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    }
  };

  const stageRef = useRef(null);

  useEffect(() => {
    stageRef.current = setInterval(() => {
      setStageTime((stageTime) => stageTime + 1);
    }, 1000);
  }, [stageToggle]);

  useEffect(() => {
    resetStageTime();
  }, [level]);

  useEffect(() => {
    if (level < 6) setTime((time) => time + stageTime);

    setStageTimes(
      stageTimes.map((num, index) => {
        if (index === level - 1) {
          return stageTime;
        } else {
          return num;
        }
      })
    );
    setStageScores(
      stageScores.map((num, index) => {
        if (index === level - 1) {
          return level > 1
            ? score -
                stageScores.reduce((num, acc) => {
                  return acc + num;
                }, 0)
            : score;
        } else {
          return num;
        }
      })
    );
  }, [level]);

  useEffect(() => {
    if (xPos === xArr[level] && yPos === yArr[level]) {
      setlevel(level + 1);
      setScore(score + 25);
    }

    if (
      coord[`stage${level}`].reduce((acc, num) => {
        if (num[0] === xPos && num[1] === yPos) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0) > 0
    ) {
      setScore(level < 6 ? score - 10 : score);
    }

    for (let i = 0; i < 6; i++) {
      const line1 = [...coordInitial[`stage${i}`]].slice(0, 6);
      const line2 = [...coordInitial[`stage${i}`]].slice(7, 14);
      if (level === i) {
        for (let j = 0; j < coeff[i].length; j++) {
          if (stageTime % coeff[i].length === j) {
            let c1 = coeff[i][j][0][0];
            let c2 = coeff[i][j][0][1];
            let c3 = coeff[i][j][1][0];
            let c4 = coeff[i][j][1][1];

            let obj = {};
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
            return setCoord({
              ...newObj,
            });
          }
        }
      }
    }
  }, [xPos, yPos, stageTime]);

  const resetAllTime = () => {
    clearInterval(stageRef.current);
    setTime(0);
    setStageTime(0);
    toggle ? setToggle(false) : setToggle(true);
    stageToggle ? setStageToggle(false) : setStageToggle(true);
  };

  const resetStageTime = () => {
    clearInterval(stageRef.current);
    setStageTime(0);
    stageToggle ? setStageToggle(false) : setStageToggle(true);
  };

  const handleAClick = () => {
    setStageTime(0);
    setXPos(level !== 0 ? xArr[level - 1] : 0);
    setYPos(level !== 0 ? yArr[level - 1] : 25);
    setCoord({ ...coordInitial });
    resetStageTime();
  };

  const handleBClick = () => {
    setlevel(0);
    setScore(0);
    setStageTimes([0, 0, 0, 0, 0, 0]);
    setStageScores([0, 0, 0, 0, 0, 0]);
    setTime(0);
    setXPos(0);
    setYPos(25);
    setCoord({ ...coordInitial });
    resetAllTime();
  };

  const handleUpClick = (e) => {
    if (yPos > 25) setMove([true, false, false, false]);
    setTimeout(function () {
      setMove([false, false, false, false]);
      if (yPos > 25) setYPos(yPos - displayIncrement);
    }, timeIncrement);
  };

  const handleLeftClick = (e) => {
    if (xPos > 0) setMove([false, false, false, true]);
    setTimeout(function () {
      setMove([false, false, false, false]);
      if (xPos > 0) setXPos(xPos - displayIncrement);
    }, timeIncrement);
  };

  const handleRightClick = (e) => {
    if (xPos < displayIncrement * 11) setMove([false, true, false, false]);
    setTimeout(function () {
      setMove([false, false, false, false]);
      if (xPos < displayIncrement * 11) setXPos(xPos + displayIncrement);
    }, timeIncrement);
  };

  const handleDownClick = (e) => {
    if (yPos < displayIncrement * 11) setMove([false, false, true, false]);
    setTimeout(function () {
      setMove([false, false, false, false]);
      if (yPos < displayIncrement * 11) setYPos(yPos + displayIncrement);
    }, timeIncrement);
  };

  const handleKeyDown = (event) => {
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
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [xPos, yPos]);

  return (
    <div>
      <div className="bigContainer">
        <div
          className="gamescreen"
          style={{
            width: `${displayIncrement * 12}px`,
            height: `${displayIncrement * 11 + 25}px`,
          }}
        >
          <p id="score">
            Score:{score < -999 ? -999 : score} / Lv:{level + 1} / X:{xPos} Y:
            {yPos} / Time:{stageTime > 999 ? 999 : level === 6 ? 0 : stageTime}{" "}
            / Total:{time > 999 ? 999 : time}
          </p>
          <div id="line" />

          <div
            style={{
              position: `absolute`,
              width: `${displayIncrement}px`,
              height: `${displayIncrement}px`,
              backgroundColor: `yellow`,
              marginLeft: `${xArr[level]}px`,
              marginTop: `${yArr[level]}px`,
            }}
          />

          {evilSquare(level < 6 ? level : 5, coord)}
          {winningDiv(level)}

          <motion.div
            variants={motionVariants}
            animate={
              startMove[0]
                ? "up"
                : startMove[1]
                ? "right"
                : startMove[2]
                ? "down"
                : startMove[3]
                ? "left"
                : "initial"
            }
          >
            <div
              className="player"
              style={{
                width: `${displayIncrement}px`,
                height: `${displayIncrement}px`,
                borderRadius: `${displayIncrement * 0.5}px`,
              }}
            ></div>
          </motion.div>
        </div>
        <div className="buttonLayout">
          <div className="dPad">
            <div> </div>
            <button
              id="resetButton"
              onClick={(e) => {
                handleSubmitForm(e);
                handleUpClick(e);
              }}
            >
              ↑
            </button>
            <div> </div>

            <button
              id="resetButton"
              onClick={(e) => {
                handleSubmitForm(e);
                handleLeftClick(e);
              }}
            >
              ←
            </button>
            <div> </div>

            <button
              id="resetButton"
              onClick={(e) => {
                handleSubmitForm(e);
                handleRightClick(e);
              }}
            >
              →
            </button>

            <div> </div>
            <button
              id="resetButton"
              onClick={(e) => {
                handleSubmitForm(e);
                handleDownClick(e);
              }}
            >
              ↓
            </button>
            <div> </div>
          </div>

          <div className="a-buttonContainer btn" onClick={handleAClick}>
            <p>A</p>
          </div>

          <div className="b-buttonContainer btn" onClick={handleBClick}>
            <p>B</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;