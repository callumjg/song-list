import { useReducer } from "react";

// metrics reducer
function reducer(state, { type, payload }) {
  switch (type) {
    case "SET_RANGE":
      return { ...state, range: payload };
    case "SET_CATEGORY":
      return { ...state, category: payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: payload };
    case "SET_IS_ASC":
      return { ...state, isAsc: payload };
    case "TOGGLE_IS_ASC":
      return { ...state, isAsc: !state.isAsc };
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

// get metrics
// must add: weeksSincePlayed, earliestService
// must sort according to rules
export function getMetrics(songs, range, sortBy, isAsc) {
  return songs.map(song => ({ ...song, weeksSincePlayed: 0, earliestService }));
}

// Sort functions
export const sortSincePlayed = isAsc => (a, b) => {
  let aWeeks = a.metrics.weeksSincePlayed;
  let bWeeks = b.metrics.weeksSincePlayed;
  aWeeks = typeof aWeeks === "string" ? 9999999 : aWeeks;
  bWeeks = typeof bWeeks === "string" ? 9999999 : bWeeks;
  return isAsc ? bWeeks - aWeeks : aWeeks - bWeeks;
};
export const sortPlays = (range, isAsc) => (a, b) =>
  isAsc
    ? a.metrics.plays[range] - b.metrics.plays[range]
    : b.metrics.plays[range] - a.metrics.plays[range];

// helper to get weeks since played
const today = new Date();

export function getWeeksSincePlayed(songs) {
  return songs.map(song => {
    let { services } = song;
    let weeksSincePlayed;
    if (!services.length) {
      weeksSincePlayed = "∞";
    } else {
      services = services.map(s => new Date(s.date));
      if (services.length > 1)
        services = services.sort((a, b) => compareDesc(a, b));
      weeksSincePlayed = differenceInCalendarWeeks(today, services[0]);
    }
    song.metrics.weeksSincePlayed = weeksSincePlayed;
    return song;
  });
}
