import React from "react";
import Number from "./Number/Number";
import Operation from "./Operation/Operation";
import Output from "./Output/Output";
import Result from "./Result/Result";
import "./Calc.css";

function Calc() {
  return (
    <div className="calculator-grid">
      <Output />
      <Operation />
      <Number />
      <Result />
    </div>
  );
}

export default Calc;
