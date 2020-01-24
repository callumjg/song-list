import { useReducer } from "react";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LIMIT":
      return { ...state, limit: payload };
    case "SET_PAGE":
      return { ...state, page: payload };
    case "SET_TAGS":
      return { ...state, tags: payload };
    case "SET_EXCLUDE":
      return { ...state, exclude: payload };
    case "SET_SEARCH":
      return { ...state, search: payload };
    case "SET_IS_PENDING":
      return { ...state, isPending: payload };
    default:
      return state;
  }
};
export default initialState => useReducer(reducer, initialState);
