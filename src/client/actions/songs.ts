import Song from '../../types/Song';

export const addSong = (payload: Song) => ({ type: 'ADD', payload });

export const removeSongById = (payload: number) => ({
  type: 'REMOVE',
  payload,
});

export const replaceSongById = (id: number, song: Song) => ({
  type: 'REPLACE',
  payload: { id, song },
});

export const setSongs = (payload: Song[]) => ({ type: 'SET', payload });

export const resetSongs = () => ({ type: 'RESET' });
