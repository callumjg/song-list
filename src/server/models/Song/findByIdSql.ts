export default `
WITH tags AS (
  SELECT
    coalesce(array_agg(st.tag ORDER BY tag), ARRAY[]::text[]) tags
  FROM
    song_tags st
  WHERE
    st.song_id = $1
),
notes AS (
  SELECT
    coalesce(array_agg(sn.note ORDER BY sn.song_note_id), ARRAY[]::text[]) notes
  FROM
    song_notes sn
  WHERE
    sn.song_id = $1
)
SELECT
  s.song_id "songId",
  s.title,
  s.url,
  s.author,
  s.key,
  s.tempo,
  s.song_select_id "songSelectId",
  n.notes,
  t.tags,
  s.is_archived "isArchived"
FROM
  songs s,
  notes n,
  tags t
WHERE
  s.song_id = $1
  AND s.is_deleted is false
LIMIT 1
`;
