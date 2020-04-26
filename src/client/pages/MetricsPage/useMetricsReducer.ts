import { useReducer } from 'react';
import Song from '../../types/Song';

export interface State {
  range: number | undefined;
  category: RegExp;
  sortBy: string;
  sort: number;
  songs: Song[];
}

type ActionType =
  | 'SET_RANGE'
  | 'SET_CATEGORY'
  | 'SET_SORT_BY'
  | 'SET_SORT'
  | 'TOGGLE_SORT'
  | 'SET_SONGS';

export interface Action {
  type: ActionType;
  payload?: any;
}

export interface StateDispatchProps {
  state: State;
  dispatch: (action: Action) => void;
}

// metrics reducer
function reducer(state: State, action: Action): State {
  const { type, payload } = action;
  switch (type) {
    case 'SET_RANGE':
      return { ...state, range: payload };
    case 'SET_CATEGORY':
      return { ...state, category: payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: payload };
    case 'SET_SORT':
      return { ...state, sort: payload };
    case 'TOGGLE_SORT':
      return { ...state, sort: state.sort * -1 };
    case 'SET_SONGS':
      return { ...state, songs: payload };
    default:
      return state;
  }
}

export function useMetricsReducer(initialState: State) {
  return useReducer(reducer, initialState);
}
