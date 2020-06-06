import * as yup from 'yup';
import { asyncCatchWrapper } from '../../utils';
import { Song, NamedError } from '../models';

export const createSong = asyncCatchWrapper(async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.send({ song });
});

export const getMetrics = asyncCatchWrapper(async (req, res) => {
  const songs = await Song.getMetrics(req.query);
  res.send({ songs });
});

export const getSong = asyncCatchWrapper(async (req, res) => {
  const song = await Song.findById(req.params.songId);
  if (!song) throw new NamedError('NotFound');
  res.send({ song });
});

export const getSongs = asyncCatchWrapper(async (req, res) => {
  const { songs, count } = await Song.find(req.query);
  res.send({ songs, count });
});

export const updateSong = asyncCatchWrapper(async (req, res) => {
  const songId = await yup.number().integer().validate(req.params.songId);
  const song = await Song.updateById(songId, req.body);
  if (!song) throw new NamedError('NotFound');
  res.send({ song });
});

export const deleteSong = asyncCatchWrapper(async (req, res) => {
  const songId = await yup.number().integer().validate(req.params.songId);
  const count = await Song.deleteById(songId);
  if (!count) throw new NamedError('NotFound');
  res.status(204).send();
});
