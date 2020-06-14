CREATE TABLE IF NOT EXISTS words (
  id SERIAL PRIMARY KEY,
  name text,
  votes integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS boards (
  id SERIAL PRIMARY KEY,
  board_url text,
  words text[],
  player_one integer[],
  player_two integer[],
  timestamp date
);

