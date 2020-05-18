export type ArrayAction = 'ADD' | 'REMOVE' | 'REPLACE' | 'SET' | 'RESET';

const arrayReducer = (idField) => (state = [], action) => {
  switch (action.type as ArrayAction) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((item) => item[idField] !== action.payload);
    case 'REPLACE':
      return state.map((item) =>
        item[idField] === action.payload.id ? action.payload.item : item
      );
    case 'RESET':
      return [];
    default:
      return state;
  }
};

export default arrayReducer;
