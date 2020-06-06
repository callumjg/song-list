export default `
WITH sn AS (
  SELECT
    coalesce(array_agg(sn.note ORDER BY sn.service_note_id), ARRAY[]::text[]) notes
  FROM
    service_notes sn
  WHERE
    sn.service_id = $1
  LIMIT 1
),
js AS (
  SELECT
    coalesce(array_agg(row_to_json(t)), ARRAY[]::json[]) songs
  FROM (
    SELECT
      s.song_id "songId",
      s.title
    FROM
      songs s
      INNER JOIN service_songs ss ON s.song_id = ss.song_id
    WHERE
      ss.service_id = $1
    ORDER BY
      ss.service_song_id) t
)
SELECT
  s.service_id "serviceId",
  s.date,
  sn.notes,
  js.songs
FROM
  services s,
  sn,
  js
WHERE
  s.service_id = $1
LIMIT 1
`;
