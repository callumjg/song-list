export default `
WITH nt AS (
  SELECT
    array_length($1::text[], 1) num
),
filtered_songs AS (
  SELECT
    s.song_id
  FROM
    songs s
    LEFT JOIN song_tags st ON s.song_id = st.song_id
    LEFT JOIN unnest($1::text[]) AS t (tag) ON lower(t.tag) = lower(st.tag)
    LEFT JOIN nt ON TRUE
  GROUP BY
    s.song_id,
    nt.num
  HAVING (count(t.tag) = nt.num
    OR nt.num IS NULL)
  AND is_archived = $2
  AND is_deleted = false
),
plays AS (
  SELECT
    ss.song_id,
    count(ss.service_song_id) plays
  FROM
    service_songs ss
    LEFT JOIN services se ON se.service_id = ss.service_id
  WHERE
    se.date > $3
  GROUP BY
    ss.song_id
),
metrics AS (
  SELECT
    fs.song_id,
    extract (epoch from (CURRENT_TIMESTAMP - max(se.date)) / 604800) since_played,
    min(se.date) earliest_service
  FROM
    filtered_songs fs
    LEFT JOIN service_songs ss ON fs.song_id = ss.song_id
    LEFT JOIN services se ON se.service_id = ss.service_id
  GROUP BY
    fs.song_id
  ORDER BY
    since_played
)
SELECT
  so.song_id "songId",
  so.title,
  coalesce(p.plays, 0) plays,
  m.since_played "sincePlayed",
  m.earliest_service "earliestService"
FROM
  filtered_songs fs
  LEFT JOIN songs so ON so.song_id = fs.song_id
  LEFT JOIN plays p ON so.song_id = p.song_id
  LEFT JOIN metrics m ON m.song_id = so.song_id
`;
