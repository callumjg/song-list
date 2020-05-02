import pool from '../../db';
import Resource from '../Resource';
import findSongSql from './findSongSql';
import SongType from '../../../types/Song';

class Song extends Resource {
  songId: number;

  constructor(props: SongType) {
    super(props);
  }

  static async find(v) {
    // TODO: replace this line
    v.isArchived = v.isArchived === 'true';
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
    return { songs, count: rowCount };
    // return { songs: songs.map((s) => new Song(s)), count: rowCount };
  }
  static findById(songId) {
    return {} as Song;
  }

  async delete() {
    return Song.deleteById(this.songId);
  }

  static deleteById(songId) {
    return 1;
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
}

export default Song;
