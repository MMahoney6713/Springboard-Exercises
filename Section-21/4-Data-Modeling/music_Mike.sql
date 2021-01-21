DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE albums
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  release DATE NOT NULL,
  album_id INTEGER REFERENCES albums 
);

CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  song_id INTEGER REFERENCES songs ON DELETE CASCADE
);

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL
);

CREATE TABLE musical_works
(
  id SERIAL PRIMARY KEY,
  song_id INTEGER REFERENCES songs ON DELETE CASCADE,
  artist_id INTEGER REFERENCES artists ON DELETE CASCADE
);


INSERT INTO albums (title)
VALUES 
('Middle of Nowhere'), ('A Night at the Opera'), ('Daydream');

INSERT INTO songs (title, duration_seconds, release, album_id)
VALUES
('MMMBop', 238, '04-15-1997', 1),
('Bohemian Rhapsody', 355, '10-31-1975', 2),
('One Sweet Day', 282, '11-14-1995', 3);

INSERT INTO producers (full_name, song_id)
VALUES
('Dust Brothers', 1), 
('Stephen Lironi', 1),
('Roy Thomas', 2),
('Walter Afanasieff', 3);

INSERT INTO artists (full_name)
VALUES
('Hanson'), ('Queen'), ('Mariah Cary');

INSERT INTO musical_works (song_id, artist_id)
VALUES
(1, 1), (2, 2), (3, 3);

-- INSERT INTO songs
--   (title, duration_in_seconds, release_date, artists, album, producers)
-- VALUES
--   ('MMMBop', 238, '04-15-1997', '{"Hanson"}', 'Middle of Nowhere', '{"Dust Brothers", "Stephen Lironi"}'),
--   ('Bohemian Rhapsody', 355, '10-31-1975', '{"Queen"}', 'A Night at the Opera', '{"Roy Thomas Baker"}'),
--   ('One Sweet Day', 282, '11-14-1995', '{"Mariah Cary", "Boyz II Men"}', 'Daydream', '{"Walter Afanasieff"}'),
  