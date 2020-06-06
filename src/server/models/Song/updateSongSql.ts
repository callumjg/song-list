export default `
WITH dt AS (
  DELETE FROM song_tags
  WHERE song_id = $1
),
it AS (
INSERT INTO song_tags (song_id, tag)
  SELECT
    $1,
    unnest($2::text[])
),
dn AS (
  DELETE FROM song_notes
  WHERE song_id = $1
),
isn AS (
INSERT INTO song_notes (song_id, note)
  SELECT
    $1,
    unnest($3::text[]))
UPDATE
  songs
SET
  title = $4,
  url = $5,
  "key" = $6,
  author = $7,
  tempo = $8,
  song_select_id = $9,
  is_archived = $10
WHERE
  song_id = $1
`;
