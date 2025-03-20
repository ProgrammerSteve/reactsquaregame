import React, { useContext, useState, useEffect, ReactNode } from "react";
import { Context } from "./MainComponent";
import "./Scoreboard.css";

const Scoreboard = () => {
  const {
    stageScores,
    stageTimes,
  } = useContext(Context);

  type ElementList = (ReactNode | null)[];
  const [elementList, setElementList] = useState<ElementList>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    var elements:ElementList = [];
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
