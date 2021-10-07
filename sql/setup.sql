DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  spotify_username TEXT NOT NULL PRIMARY KEY,
  spotify_email TEXT NOT NULL
)
