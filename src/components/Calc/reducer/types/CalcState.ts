type CalcState  = {
  currentNumber: string;
  prevNumber: string;
  operand: string | null;
  check: boolean,
  history: string,
}
export default CalcState;