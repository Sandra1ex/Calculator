import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import "./Output.css";

function Output() {
  const { currentNumber, prevNumber, operand } = useSelector(
    (store: RootState) => store.calcState
  );

  return (
    <div className="output">
      <div className="previous-operand">
        {prevNumber} {operand}
      </div>
      <div className="current-operand">{currentNumber}</div>
      {/* <input type="number" value={currentNumber} className="current-operand"/> */}
    </div>
  );
}

export default Output;
