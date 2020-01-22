import { useReducer } from "react";

interface Options {
  target?: any;
}

function useListReducer(initialState: any[] = [], options: Options = {}) {
  function reducer(state, { type, payload }) {
    switch (type) {
      case "ADD":
        return [...state, payload];
      case "REMOVE":
        return state.filter((item, i) =>
          options.target ? item[options.target] !== payload : i !== payload
        );
      case "CLEAR":
        return [];
      default:
        return state;
    }
  }
  enum actions {
    add = "ADD",
    remove = "REMOVE",
    clear = "CLEAR"
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch, actions];
}

export default useListReducer;
