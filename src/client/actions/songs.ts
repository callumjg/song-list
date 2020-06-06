import Song from '../../types/Song';
import server from '../../apis/server';

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

export const postSong = (song) => async (dispatch) => {
  const { data } = await server.post('/songs', song);
  dispatch(addSong(data.song));
};

export const patchSong = (song) => async (dispatch) => {
  const { data } = await server.patch('/songs', song);
  dispatch(replaceSongById(data.song.songId, data.song));
};
