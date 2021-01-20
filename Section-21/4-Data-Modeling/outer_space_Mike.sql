DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE galaxies
(
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL
);

CREATE TABLE solar_systems
(
  id SERIAL PRIMARY KEY,
  star TEXT NOT NULL,
  galaxy_id INTEGER REFERENCES galaxies ON DELETE CASCADE
);

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  system_id INTEGER REFERENCES solar_systems ON DELETE CASCADE
);

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  planet_id INTEGER REFERENCES planets ON DELETE CASCADE
);

INSERT INTO galaxies (name) VALUES
('Milky Way');

INSERT INTO solar_systems (star, galaxy_id) VALUES
('The Sun', 1),
('Proxima Centauri', 1),
('Gliese 876', 1);

INSERT INTO planets (name, orbital_period_in_years, system_id) VALUES
('Earth', 1.00, 1),
('Mars', 1.88, 1),
('Venus', 0.62, 1),
('Neptune', 164.8, 1),
('Proxima Centauri b', 0.03, 2),
('Gliese 876 b', 0.23, 2);

INSERT INTO moons (name, planet_id) VALUES 
('The Moon', 1), 
('Phobos', 2),
('Deimos', 2),
('Naiad', 4),
('Thalassa', 4),
('Despina', 4), 
('Galatea', 4),
('Etc......', 4);