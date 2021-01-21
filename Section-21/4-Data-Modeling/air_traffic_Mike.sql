DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic



CREATE TABLE airlines 
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE countries
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE cities
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE flights
(
  id SERIAL PRIMARY KEY,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline_id INTEGER REFERENCES airlines ON DELETE CASCADE,
  from_city_id INTEGER REFERENCES cities ON DELETE CASCADE,
  from_country_id INTEGER REFERENCES countries ON DELETE CASCADE,
  to_city_id INTEGER REFERENCES cities ON DELETE CASCADE,
  to_country_id INTEGER REFERENCES countries ON DELETE CASCADE
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  flight_id INTEGER REFERENCES flights ON DELETE CASCADE,
  seat TEXT NOT NULL
);

CREATE TABLE passengers
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  ticket_id INTEGER REFERENCES tickets ON DELETE CASCADE
);


INSERT INTO airlines (name) 
VALUES 
('UNITED'), ('British Airways');

INSERT INTO countries (name) 
VALUES
('United States'), ('Japan'), ('United Kingdom');

INSERT INTO cities (name) 
VALUES
('Washington DC'), ('Seattle'), ('Tokyo'), ('London');

INSERT INTO flights (departure, arrival, airline_id, from_city_id, from_country_id, to_city_id, to_country_id)
VALUES
('2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 1, 1, 2, 1),
('2018-12-19 12:45:00', '2018-12-19 16:15:00', 2, 3, 2, 4, 3);

INSERT INTO tickets (flight_id, seat)
VALUES
(1, '33B'), (2, '8A');

INSERT INTO passengers (first_name, last_name, ticket_id)
VALUES
('Jennifer', 'Finch', 1),
('Thadeus', 'Gathercoal', 2);
