DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS top_artists CASCADE;
-- DROP TABLE IF EXISTS top_tracks CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  spotify_username TEXT NOT NULL,
  spotify_email TEXT NOT NULL,
  spotify_profile TEXT,
  spotify_image TEXT,
  spotify_href TEXT
)

-- CREATE TABLE top_artists (

-- )

-- CREATE TABLE conversations (
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   user_one INTEGER NOT NULL,
--   user_two INTEGER NOT NULL
-- )

-- CREATE TABLE conversation_reply (
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   message TEXT,
--   author_id REFERENCES users,
--   conversation_id REFERENCES conversations
-- )
