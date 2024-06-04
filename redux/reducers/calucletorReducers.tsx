import {
  Addition,
  CalculatorActionTypes,
  CalculatorState,
  Division,
  Multiplication,
  Subtraction,
} from '../action/actions';

const initialState: CalculatorState = {
    currentValue : 0,
    previous: 0 ,
    result:0
};

export const CalculatorReducres = (
  state = initialState,
  action: CalculatorActionTypes,
): CalculatorState => {
  switch (action.type) {
    case Addition:
      return {
        ...state,
        result : state.previous + state.currentValue
    };
    case Multiplication:
      return {
        ...state,
      };
    case Subtraction:
      return {
        ...state,
      };
    case Division:
      return {
        ...state,
    };
    default:
      return state;
  }
};
