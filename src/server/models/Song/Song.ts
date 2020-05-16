import moment from 'moment';
import * as yup from 'yup';
import pool from '../../db';
import Resource from '../Resource';
import SongType from '../../../types/Song';
import findSongSql from './findSongSql';
import getSongMetricsSql from './getSongMetricsSql';

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
  });

  static async find(input) {
    const v = Song.schema
      .shape({
        search: yup.string(),
      })
      .validateSync(input);

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
  static findById(songId) {
    return {} as Song;
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

  static updateById(songId) {
    // const validated = req.body;
    // const song = await Song.findById(songId);
    // Object.keys(validated).forEach((key) => {
    //   song[key] = validated[key];
    // });
    // await song.save();
    return { newValues: {}, count: 1 };
  }

  static async getMetrics(filter) {
    const v = await yup
      .object()
      .shape({
        tags: yup.array().of(yup.string()).default([]),
        isArchived: yup.boolean().default(false),
        months: yup.number().integer().default(6),
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
        song.weeksSincePlayed = Math.round(song.sincePlayed.days / 7);

      delete song.sincePlayed;
      return song;
    });
  }
}

export default Song;