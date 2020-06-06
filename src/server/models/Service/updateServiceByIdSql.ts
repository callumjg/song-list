export default `
WITH dn AS (
  DELETE FROM service_notes
  WHERE service_id = $1
),
isn AS (
INSERT INTO service_notes (service_id, note)
  SELECT
    $1,
    unnest($2::text[])
),
dss AS (
  DELETE FROM service_songs ss
  WHERE ss.service_id = $1
),
iss AS (
INSERT INTO service_songs (service_id, song_id)
  SELECT
    $1,
    s.song_id
  FROM
    unnest($3::integer[])
    WITH ORDINALITY AS rs (song_id, nr)
    LEFT JOIN songs s ON s.song_id = rs.song_id
  WHERE
    rs.song_id IS NOT NULL
  ORDER BY
    rs.nr ASC)
UPDATE
  services
SET
  date = $4
WHERE
  service_id = $1
`;
