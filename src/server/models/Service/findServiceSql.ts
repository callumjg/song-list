export default `
WITH json_songs AS (
  SELECT
    ss.service_id,
    array_agg(row_to_json(t)
    ORDER BY ss.service_song_id) songs
  FROM
    service_songs ss
    LEFT JOIN (
      SELECT
        s.song_id "songId",
        s.title
      FROM
        songs s) t ON ss.song_id = t. "songId"
    GROUP BY
      ss.service_id
),
sn AS (
  SELECT
    sn.service_id,
    array_agg(sn.note) FILTER (WHERE sn.note IS NOT NULL) notes
  FROM
    service_notes sn
  GROUP BY
    sn.service_id
)
SELECT
  s.service_id "serviceId",
  s.date,
  coalesce(sn.notes, ARRAY[]::text[]) notes,
  coalesce(js.songs, ARRAY[]::json[]) songs
FROM
  services s
  LEFT JOIN sn ON s.service_id = sn.service_id
  LEFT JOIN json_songs js ON s.service_id = js.service_id
ORDER BY
  s.date DESC
`;
