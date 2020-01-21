import { useReducer } from "react";

function useListReducer(initialState = [], options = {}) {
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
  const actions = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    CLEAR: "CLEAR"
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch, actions];
}

export default useListReducer;
