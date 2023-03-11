import transformation from "../../../utils/ArithmeticPerformer";
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
        //если оно есть, и арифметически знак равен √
        if (action.payload === "√") {
          return {
            ...state,
            operand: "",
            prevNumber: "",
            currentNumber: String(Math.sqrt(parseFloat(state.currentNumber))),
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
        //кейс на арифметическое действие с %
        //переменная, которая хранит в себе занк деления или умножения
        let oper =
          (state.operand === "x" && "*") || (state.operand === "÷" && "/") || (state.operand);

        let persentStringToCalculated = `${parseFloat(
          state.prevNumber
        )} ${oper} (${parseFloat(state.prevNumber)} / 100 * ${parseFloat(
          state.currentNumber
        )})`;
        return {
          ...state,
          operand: "",
          //функция используется безопасно, так как у нас есть проверки на числа
          // eslint-disable-next-line no-eval
          currentNumber: String(eval(persentStringToCalculated)),
          prevNumber: "",
          check: true,
        };
      } else if (action.payload === "√") {
        //кейс на арифметическое действие с √
        return {
          ...state,
          operand: "",
          currentNumber: String(Math.sqrt(parseFloat(state.currentNumber))),
          prevNumber: "",
          check: true,
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

export default calcReducer;
