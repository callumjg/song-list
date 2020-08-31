export default `
WITH service AS (
  SELECT
    s.service_id,
    s.date,
    abs(extract(days FROM (s.date - CURRENT_TIMESTAMP))) days_between
  FROM
    services s
  ORDER BY
    days_between ASC
  LIMIT 1
),
sn AS (
  SELECT
    coalesce(array_agg(sn.note ORDER BY sn.service_note_id), ARRAY[]::text[]) notes
  FROM
    service s
    INNER JOIN service_notes sn ON s.service_id = sn.service_id
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
      INNER JOIN service se ON ss.service_id = se.service_id
    ORDER BY
      ss.service_song_id) t
)
SELECT
  s.service_id "serviceId",
  s.date,
  sn.notes,
  js.songs
FROM
  service s,
  sn,
  js
LIMIT 1
`;
