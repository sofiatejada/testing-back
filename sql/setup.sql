DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS top_artists CASCADE;
-- DROP TABLE IF EXISTS top_tracks CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  spotify_username TEXT NOT NULL,
  spotify_email TEXT NOT NULL,
  spotify_profile TEXT,
  spotify_image TEXT,
  spotify_href TEXT,
  token TEXT NOT NULL
)

-- CREATE TABLE top_artists (

-- )
