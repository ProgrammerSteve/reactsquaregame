import React, { useContext, useState, useEffect } from "react";
import { Context } from "./MainComponent.js";
import "./Scoreboard.css";

const Scoreboard = () => {
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

  const [elementList, setElementList] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    var elements = [];
    for (let i = 0; i < 6; i++) {
      elements.push(
        <div key={i} className="card">
          <div className="stagelevel">
            <h5>level:{i + 1}</h5>
          </div>
          <div className="stage">
            <h5>score:{stageScores[i]}</h5>
            <h5>time:{stageTimes[i]}</h5>
          </div>
        </div>
      );
    }
    setElementList(() => elements);
  }, [stageScores]);

  return <div className="scoreContainer">{elementList}</div>;
};

export default Scoreboard;
