export default `
WITH sid AS (
INSERT INTO services (date)
    VALUES ($1)
  RETURNING
    service_id
), insert_notes AS (
INSERT INTO service_notes (service_id, note)
  SELECT
    sid.service_id,
    unnest($2::text[]) notes
  FROM
    sid
),
insert_songs AS (
INSERT INTO service_songs (service_id, song_id)
  SELECT
    sid.service_id,
    s.song_id
  FROM
    unnest($3::integer[])
    WITH ORDINALITY AS rs (song_id, nr)
    LEFT JOIN songs s ON s.song_id = rs.song_id,
    sid
  WHERE
    rs.song_id IS NOT NULL
  ORDER BY
    rs.nr ASC
)
SELECT
  service_id "serviceId"
FROM
  sid
`;
