import React from "react";
import Number from "./Number/Number";
import Output from "./Output/Output";
import "./Calc.css";

function Calc() {
  return (
    <div className="calculator-grid">
      <Output />
      <Number />
    </div>
  );
}

export default Calc;
