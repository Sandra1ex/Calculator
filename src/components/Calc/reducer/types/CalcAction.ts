type CalcAction =
  | { type: "ADD_NUM"; payload: string }
  | { type: "RESULT" }
  | { type: "ADD_OPERATION"; payload: string };

export default CalcAction;
