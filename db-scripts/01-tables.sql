CREATE TABLE IF NOT EXISTS songs (
  song_id serial PRIMARY KEY,
  title text NOT NULL,
  "url" text,
  author text,
  "key" text,
  tempo text,
  song_select_id text,
  is_deleted boolean DEFAULT FALSE,
  is_archived boolean DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS tags (
  tag_id serial PRIMARY KEY,
  tag text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS song_tags (
  song_tag_id serial NOT NULL,
  song_id int REFERENCES songs ON DELETE CASCADE,
  tag_id int REFERENCES tags ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS song_notes (
  song_note_id serial PRIMARY KEY,
  song_id int REFERENCES songs ON DELETE CASCADE,
  note text NOT NULL
);

CREATE TABLE IF NOT EXISTS services (
  service_id serial PRIMARY KEY,
  "date" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS service_songs (
  service_song_id serial PRIMARY KEY,
  service_id int REFERENCES services ON DELETE CASCADE,
  song_id int REFERENCES songs ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS service_notes (
  service_note_id serial PRIMARY KEY,
  service_id int REFERENCES services ON DELETE CASCADE,
  note text NOT NULL
);

CREATE TABLE IF NOT EXISTS lyrics (
  lyric_id serial PRIMARY KEY,
  song_id int REFERENCES songs,
  "section" text NOT NULL,
  lyric text NOT NULL
);

