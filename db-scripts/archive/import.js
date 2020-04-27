const { Pool } = require('pg');
const fs = require('fs');
const songs = require('./songs.json');
const services = require('./services.json');
const pool = new Pool({
  user: 'postgres',
  database: 'gpc_songs',
});

console.log(songs[0]._id.$oid);

const seedSong = async (song) => {
  const {
    _id: { $oid: _id },
    tags,
    notes,
    title,
    url,
    author,
    key,
    tempo,
    songSelectID,
  } = song;

  console.log('*************************');
  console.log(title);
  console.log('*************************');
  // Insert base data
  const {
    rows: [sid],
  } = await pool.query(
    `
      with sid as (
        insert into songs (_id, title, url, author, key, tempo, song_select_id)
          values($1, $2, $3, $4, $5, $6, $7)
          returning song_id
      ), insert_tags as (
        insert into song_tags (song_id, tag)
        select sid.song_id, unnest($8::text[]) tags
        from sid
      ), insert_notes as (
        insert into song_notes (song_id, note)
        select sid.song_id, unnest($9::text[])
        from sid
      )
      select song_id  from sid limit 1
      `,
    [_id, title, url, author, key, tempo, songSelectID, tags, notes]
  );
};

const seedService = async (service) => {
  const {
    songs: _songs,
    tags: notes,
    date: { $date: date },
  } = service;
  const songs = _songs.map((v) => v.$oid);
  await pool.query(
    `
  
    with sid as (insert into services (date) values($1)returning service_id),
    insert_notes as (
      insert into service_notes (service_id, note)
      select sid.service_id, unnest($2::text[]) notes
      from sid
    ),
    insert_songs as (
      insert into service_songs (service_id, song_id)
      select sid.service_id, s.song_id
      from  unnest($3::text[]) WITH ORDINALITY AS rs(_id, nr)
      left join  songs s on s._id = rs._id,
      sid
      where rs._id is not null
      order by rs.nr asc
    )
    
    select service_id from sid
  `,
    [date, notes, songs]
  );
};

// songs.reduce(
//   (promise, item) => promise.then(() => seedSong(item)),
//   Promise.resolve()
// );

services.reduce(
  (promise, item) => promise.then(() => seedService(item)),
  Promise.resolve()
);
