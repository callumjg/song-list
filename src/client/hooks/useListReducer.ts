import { useReducer } from 'react';

interface Options {
  target?: any;
}

type Action =
  | { type: 'ADD'; payload: any }
  | { type: 'REMOVE'; payload: any }
  | { type: 'CLEAR'; payload?: undefined };

function useListReducer(initialState: any[] = [], options: Options = {}) {
  function reducer(state: any[], action: Action) {
    const { type, payload } = action;

    switch (type) {
      case 'ADD':
        return [...state, payload];
      case 'REMOVE':
        return state.filter((item, i) =>
          options.target ? item[options.target] !== payload : i !== payload
        );
      case 'CLEAR':
        return [];
      default:
        return state;
    }
  }

  return useReducer(reducer, initialState);
}

export default useListReducer;
