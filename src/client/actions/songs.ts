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

export const postSong = async (song) => {
  const { data } = await server.post('/songs', song);
  return data.song;
};

export const patchSong = async (song) => {
  const { data } = await server.patch('/songs', song);
  return data.song;
};

export const postAndAddSong = (song) => async (dispatch) => {
  const newSong = await postSong(song);
  dispatch(addSong(newSong));
};

export const patchAndAddSong = (song) => async (dispatch) => {
  const newSong = await patchSong(song);
  dispatch(replaceSongById(newSong.songId, newSong));
};
