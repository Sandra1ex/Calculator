import React from "react";
import { useDispatch } from "react-redux";
import "./Number.css";

function Number() {
  const dispatch = useDispatch();

  const handleClickNumber: React.MouseEventHandler<HTMLButtonElement> = (
    e: any
  ) => {
    const { textContent } = e.target;
    if (textContent) {
      dispatch({ type: "ADD_NUM", payload: textContent });
    }
  };
  return (
    <div className="number-grid" draggable={true}>
      <button type="button" onClick={handleClickNumber}>
        7
      </button>
      <button type="button" onClick={handleClickNumber}>
        8
      </button>
      <button type="button" onClick={handleClickNumber}>
        9
      </button>
      <button type="button" onClick={handleClickNumber}>
        4
      </button>
      <button type="button" onClick={handleClickNumber}>
        5
      </button>
      <button type="button" onClick={handleClickNumber}>
        6
      </button>
      <button type="button" onClick={handleClickNumber}>
        1
      </button>
      <button type="button" onClick={handleClickNumber}>
        2
      </button>
      <button type="button" onClick={handleClickNumber}>
        3
      </button>
      <button type="button" onClick={handleClickNumber} className="span-two">
        0
      </button>
      <button type="button" onClick={handleClickNumber}>
        ,
      </button>
    </div>
  );
}

export default Number;
