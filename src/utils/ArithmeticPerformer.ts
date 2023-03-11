import CalcState from "../components/Calc/reducer/types/CalcState";

export default function transformation({ currentNumber, operand, prevNumber }: CalcState) {
  const prev = parseFloat(prevNumber);
  const current = parseFloat(currentNumber);
  if (isNaN(prev) || isNaN(current)) return ""; // для ввода с клавиатуры
  let computation;
  switch (operand) {
    case "+": {
      computation = prev + current;
      break;
    }
    case "-": {
      computation = prev - current;
      break;
    }
    case "÷": {
      computation = prev / current;
      break;
    }
    case "x": {
      computation = prev * current;
      break;
    }
    default: {
      break;
    }
  }
  return computation?.toString();
}