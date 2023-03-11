import CalcAction from "./types/CalcAction";
import CalcState from "./types/CalcState";

export const initialState: CalcState = {
  currentNumber: "",
  prevNumber: "",
  operand: "",
  check: false,
  history: "",
};

function calcReducer(
  state: CalcState = initialState,
  action: CalcAction
): CalcState {
  switch (action.type) {
    case "ADD_NUM": {
      if (state.check) {
        return {
          ...state,
          currentNumber: action.payload,
          check: false,
          history: `${state.history}${String(state.operand)}${action.payload}`,
        };
      }
      if (state.currentNumber === "0" && action.payload === "0") {
        return state;
      }
      if (state.currentNumber.includes(".") && action.payload === ".") {
        return state;
      }
      return {
        ...state,
        currentNumber: `${state.currentNumber || ""}${action.payload}`,
        history: `${state.history}${state.operand}${action.payload}`,
      };
    }
    case "ADD_OPERATION": {
      // console.log(state, "state");
      // console.log(action.payload === "%", "action");
      //проверка на присутствие текущего и предыдущего значений
      if (state.currentNumber === "" && state.prevNumber === "") {
        return state;
      }

      //проверка на отсутствия предыдещего значния

      if (state.prevNumber === "") {
        //если оно есть, и арифметически знак равен %
        if (action.payload === "%") {
          return {
            ...state,
            operand: "",
            prevNumber: "",
            currentNumber: String(parseFloat(state.currentNumber) / 100),
            check: true,
          };
        }
        //если оно есть, то сохр арифметический знак
        // предыдущее значение принимает текущее
        //а текущее обнуляется
        return {
          ...state,
          operand: action.payload,
          prevNumber: state.currentNumber,
          currentNumber: "",
        };
      }
      // проверка на отсутствие текущего значения
      //если текущего знач нет, то просто сохраняются все те же значения в стейте и сохр операция
      if (state.currentNumber === "") {
        return {
          ...state,
          operand: action.payload,
        };
      } else if (action.payload === "%") {
        return {
          ...state,
          operand: '',
          currentNumber: String(
            parseFloat(state.prevNumber) - parseFloat(state.prevNumber) / 100
          ),
          prevNumber: "",
        };
      }
      return {
        ...state,
        prevNumber: transformation(state) || "", //разобраться
        operand: action.payload,
        currentNumber: "",
      };
    }
    case "RESULT": {
      if (
        state.operand === "" ||
        state.currentNumber === "" ||
        state.prevNumber === ""
      ) {
        return state;
      }
      return {
        ...state,
        prevNumber: "",
        operand: "",
        currentNumber: transformation(state) || "", //разобраться
        check: true,
      };
    }
    case "CLEAR": {
      return {
        currentNumber: "",
        prevNumber: "",
        operand: "",
        check: false,
        history: "",
      };
    }
    default:
      return state;
  }
}

function transformation({ currentNumber, operand, prevNumber }: CalcState) {
  const prev = parseFloat(prevNumber);
  const current = parseFloat(currentNumber);
  if (isNaN(prev) || isNaN(current)) return "";
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
    // case "√": {
    //   computation = Math.sqrt(current);
    //   break;
    // }
    // case "%": {
    //   computation = current / 100;
    //   break;
    // }
  }
  return computation?.toString();
}

export default calcReducer;
