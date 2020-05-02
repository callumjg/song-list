export default `
WITH nt AS (
  SELECT
    array_length($1::text[], 1) num
),
filtered_songs AS (
  SELECT
    s.song_id,
    coalesce(array_agg(st.tag ORDER BY st.tag) FILTER (WHERE st.tag IS NOT NULL), ARRAY[]::text[]) tags
  FROM
    songs s
    LEFT JOIN song_tags st ON s.song_id = st.song_id
    LEFT JOIN unnest($1::text[]) AS t (tag) ON lower(t.tag) = lower(st.tag)
    LEFT JOIN nt ON TRUE
  GROUP BY
    s.song_id,
    st.song_id,
    nt.num
  HAVING
    count(t.tag) = nt.num
    OR nt.num IS NULL
),
note_arrays AS (
  SELECT
    sn.song_id,
    array_agg(sn.note) notes
  FROM
    song_notes sn
    INNER JOIN filtered_songs fs ON sn.song_id = fs.song_id
  GROUP BY
    sn.song_id
)
SELECT
  s.song_id "songId",
  s.title,
  s.url,
  s.author,
  s.key,
  s.tempo,
  s.song_select_id "songSelectId",
  fs.tags,
  coalesce(na.notes, ARRAY[]::text[]) notes,
  s.is_archived "isArchived"
FROM
  filtered_songs fs
  INNER JOIN songs s ON fs.song_id = s.song_id
  LEFT JOIN note_arrays na ON fs.song_id = na.song_id
WHERE (s.song_id = $2
  OR nullif ($2::text, '(none)') IS NULL)
AND (s.title = $3
  OR nullif ($3::text, '(none)') IS NULL)
AND (s.url = $4
  OR nullif ($4::text, '(none)') IS NULL)
AND (s.author = $5
  OR nullif ($5::text, '(none)') IS NULL)
AND (s.key = $6
  OR nullif ($6::text, '(none)') IS NULL)
AND (s.tempo = $7
  OR nullif ($7::text, '(none)') IS NULL)
AND (s.song_select_id = $8
  OR nullif ($8::text, '(none)') IS NULL)
AND s.is_archived = $9
AND s.is_deleted = $10
AND (s.title ILIKE concat('%', $11::text, '%')
  OR nullif ($11::text, '(none)') IS NULL)
ORDER BY
  s.title
`;
