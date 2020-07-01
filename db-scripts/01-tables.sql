CREATE TABLE IF NOT EXISTS public.songs (
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

CREATE TABLE IF NOT EXISTS public.tags (
  tag_id serial PRIMARY KEY,
  tag text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.song_tags (
  song_tag_id serial NOT NULL,
  song_id int REFERENCES songs ON DELETE CASCADE,
  tag_id int REFERENCES tags ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.song_notes (
  song_note_id serial PRIMARY KEY,
  song_id int REFERENCES songs ON DELETE CASCADE,
  note text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.services (
  service_id serial PRIMARY KEY,
  "date" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS public.service_songs (
  service_song_id serial PRIMARY KEY,
  service_id int REFERENCES services ON DELETE CASCADE,
  song_id int REFERENCES songs ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.service_notes (
  service_note_id serial PRIMARY KEY,
  service_id int REFERENCES services ON DELETE CASCADE,
  note text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.users (
  "user_id" serial PRIMARY KEY,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "first_name" text,
  "last_name" text,
  "is_verified" boolean DEFAULT FALSE,
  "is_deleted" boolean DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.refresh_tokens (
  "token" text PRIMARY KEY NOT NULL,
  "user_id" int REFERENCES users ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.user_roles (
  "user_role_id" serial PRIMARY KEY NOT NULL,
  "user_id" int not null REFERENCES users on DELETE CASCADE,
  "role" text not null
)
