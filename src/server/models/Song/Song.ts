import moment from 'moment';
import * as yup from 'yup';
import pool from '../../db';
import Resource from '../Resource';
import SongType from '../../../types/Song';
import findSongSql from './findSongSql';
import findByIdSql from './findByIdSql';
import getSongMetricsSql from './getSongMetricsSql';
import insertSongSql from './insertSongSql';
import updateSongSql from './updateSongSql';
import NamedError from '../NamedError';

class Song extends Resource implements SongType {
  songId: number;

  title: string;

  url: string;

  author: string;

  key: string;

  tempo: string;

  songSelectId: string;

  isArchived: boolean;

  isDeleted: boolean;

  tags: string[];

  notes: string[];

  static schema = yup.object().shape({
    songId: yup.number().integer(),
    title: yup.string(),
    url: yup.string().nullable(),
    author: yup.string().nullable(),
    key: yup.string().nullable(),
    tempo: yup.string().nullable(),
    songSelectId: yup.string().nullable(),
    isArchived: yup.boolean(),
    isDeleted: yup.boolean(),
    tags: yup.array().of(yup.string()),
    notes: yup.array().of(yup.string()),
  });

  static async find(input) {
    const v = Song.schema.shape({ search: yup.string() }).validateSync(input);
    const { rows: songs, rowCount } = await pool.query(findSongSql, [
      v.tags,
      v.songId,
      v.title,
      v.url,
      v.author,
      v.key,
      v.tempo,
      v.songSelectId,
      !!v.isArchived,
      false,
      v.search,
    ]);
    return { songs: songs.map((s) => new Song(s)), count: rowCount };
  }

  static async findById(songId) {
    const {
      rows: [song],
      rowCount,
    } = await pool.query(findByIdSql, [songId]);
    return rowCount ? new Song(song) : null;
  }

  static async findByTitleAndId(song) {
    const { rows } = await pool.query(
      `
        select s.song_id "songId", s.title
        from songs s
        WHERE (s.song_id = $1
          OR nullif ($1::text, '(none)') IS NULL)
        AND (s.title ilike $2
          OR nullif ($2::text, '(none)') IS NULL)
        limit 1
      `,
      [song.songId, song.title]
    );
    return rows[0] || null;
  }

  static async findManyByTitleAndId(inputSongs) {
    if (!inputSongs) return {};
    let missing;

    const songs = await Promise.all(
      inputSongs.map((song) => Song.findByTitleAndId(song))
    );

    if (songs.some((s) => !s)) {
      missing = songs
        .map((s, i) => (s ? null : i)) // get index of any null values
        .filter((v) => v || v === 0) // filter values that were found
        .map((i) => inputSongs[i]);
    }
    return { missing, songs: songs.filter((s) => s) as Song[] };
  }

  async delete() {
    return Song.deleteById(this.songId);
  }

  static async deleteById(songId) {
    const { rowCount } = await pool.query(
      `
        UPDATE songs set is_deleted = true
        where song_id = $1
        and is_deleted = false
      `,
      [songId]
    );
    return rowCount;
  }

  async put() {
    const { rowCount } = await pool.query(updateSongSql, [
      this.songId,
      this.tags,
      this.notes,
      this.title,
      this.url,
      this.key,
      this.author,
      this.tempo,
      this.songSelectId,
      this.isArchived,
    ]);
    if (!rowCount) throw new NamedError('Server', 'Failed to update song');
    return this;
  }

  static async updateById(songId: number, values) {
    const song = await Song.findById(songId);
    if (!song) return null;
    const updates = Song.schema
      .shape({ songId: undefined })
      .validateSync(values, { stripUnknown: true });
    Object.keys(updates).forEach((key) => {
      song[key] = updates[key];
    });
    return song.save();
  }

  static async getMetrics(filter) {
    const v = await yup
      .object()
      .shape({
        tags: yup.array().of(yup.string()).default([]),
        isArchived: yup.boolean().default(false),
        months: yup.number().integer().default(38),
      })
      .validateSync(filter);
    const from = moment().subtract(v.months, 'months').toDate();

    const { rows } = await pool.query(getSongMetricsSql, [
      v.tags,
      v.isArchived,
      from,
    ]);

    return rows.map((song) => {
      song.plays = parseInt(song.plays, 10);
      if (song.sincePlayed)
        song.weeksSincePlayed = Math.round(song.sincePlayed);
      delete song.sincePlayed;
      return song;
    });
  }

  async insert() {
    this.validate();
    const {
      rows: [{ songId }],
    } = await pool.query(insertSongSql, [
      this.title,
      this.url,
      this.author,
      this.key,
      this.tempo,
      this.songSelectId,
      this.tags,
      this.notes,
    ]);
    this.songId = songId;
    return this;
  }
}

export default Song;
