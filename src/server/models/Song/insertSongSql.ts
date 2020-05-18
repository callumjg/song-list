export default `
WITH sid AS (
INSERT INTO songs (title, url, author, "key", tempo, song_select_id)
    VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING
    song_id
), insert_tags AS (
INSERT INTO song_tags (song_id, tag)
  SELECT
    sid.song_id,
    unnest($7::text[]) tags
  FROM
    sid
),
insert_notes AS (
INSERT INTO song_notes (song_id, note)
  SELECT
    sid.song_id,
    unnest($8::text[])
  FROM
    sid
)
SELECT
  song_id "songId"
FROM
  sid
LIMIT 1`;
