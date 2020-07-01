const fs = require('fs');
const { Pool } = require('pg');
const lyrics = require('./lyrics.json');

const env = fs
  .readFileSync('../../.env', 'utf-8')
  .split('\n')
  .map((l) => l.replace(/#.*/, ''))
  .map((l) => l.replace(/'/g, ''))
  .filter((l) => l)
  .map((l) => l.split('='))
  .reduce((map, item) => {
    map[item[0]] = item[1];
    return map;
  }, {});

const pool = new Pool({
  database: env.PGDATABASE,
  port: env.PGPORT,
  host: env.PGHOST,
  user: env.PGUSER,
  password: env.PGPASSWORD,
  ssl: false,
});

const asyncIter = (func, arr, callback, i = 0) => {
  if (i === arr.length) return callback();
  func(arr[i])
    .then((res) => asyncIter(func, arr, callback, ++i))
    .catch((e) => console.log(e));
};

const addLyric = async ({ title, label }) => {
  const lyric = lyrics[title][label];
  console.log('Adding lyric', label);
  await pool.query(
    `
      INSERT INTO song_lyrics (song_id, label, lyrics)
      SELECT
        s.song_id,
        $2,
        $3
      FROM
        songs s
      WHERE
        s.title ILIKE $1;
      `,
    [title, label, lyric]
  );
};

const addLyrics = async (title) => {
  console.log('Adding lyrics for', title);
  const zip = Object.keys(lyrics[title]).map((label) => ({ title, label }));
  return new Promise((res) => {
    asyncIter(addLyric, zip, res);
  });
};

pool
  .query(
    `
CREATE TABLE IF NOT EXISTS public.song_lyrics (
  "song_lyric_id" serial PRIMARY KEY NOT NULL,
  "song_id" int NOT NULL REFERENCES songs,
  "label" text NOT NULL,
  "lyrics" text NOT NULL
)`
  )
  .then((res) => {
    asyncIter(addLyrics, Object.keys(lyrics), () => console.log('DONE'));
  })
  .catch((e) => console.log(e));
