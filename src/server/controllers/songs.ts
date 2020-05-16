import yup from 'yup';
import { asyncCatchWrapper } from '../../utils';
import { Song, NamedError } from '../models';

// const allowedUpdates = [
//   'tags',
//   'notes',
//   'title',
//   'url',
//   'author',
//   'key',
//   'tempo',
//   'songSelectID',
//   'tagsAdd',
//   'tagsRemove',
// ];

export const createSong = asyncCatchWrapper(async (req, res) => {
  const song = await new Song(req.body).save();
  res.send({ song });
});

export const getMetrics = asyncCatchWrapper(async (req, res) => {
  const songs = await Song.getMetrics(req.query);
  res.send({ songs });
});

export const getSong = asyncCatchWrapper(async (req, res) => {
  const song = await Song.findById(req.params._id);
  if (!song) throw new NamedError('NotFound');
  res.send({ song });
});

export const getSongs = asyncCatchWrapper(async (req, res) => {
  const { songs, count } = await Song.find(req.query);
  res.send({ songs, count });
});

export const updateSong = asyncCatchWrapper(async (req, res) => {
  const songId = await yup.number().integer().validate(req.params.songId);
  const { newValues: song, count } = await Song.updateById(songId);
  if (!count) throw new Error('NotFound');
  res.send({ song });
});

export const deleteSong = asyncCatchWrapper(async (req, res) => {
  const songId = await yup.number().integer().validate(req.params.songId);
  const count = await Song.deleteById(songId);
  if (!count) throw new NamedError('NotFound');
  res.status(204).send();
});
