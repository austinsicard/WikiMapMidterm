-- Drop and recreate points table (Example)
DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  photo_url VARCHAR(255) NOT NULL,
  lat FLOAT NOT NULL DEFAULT 0,
  long FLOAT NOT NULL DEFAULT 0
);
