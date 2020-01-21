import { useReducer } from "react";

// metrics reducer
function reducer(state: any, action: any) {
  const { type, payload } = action;
  switch (type) {
    case "SET_RANGE":
      return { ...state, range: payload };
    case "SET_CATEGORY":
      return { ...state, category: payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: payload };
    case "SET_SORT":
      return { ...state, sort: payload };
    case "TOGGLE_SORT":
      return { ...state, sort: state.sort * -1 };
    case "SET_SONGS":
      return { ...state, songs: payload };
    default:
      return state;
  }
}
export function useMetricsReducer(initialState = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
