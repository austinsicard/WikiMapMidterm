-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  --map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  photo_url VARCHAR(255) NOT NULL
);


