-- Drop and recreate maps table (Example)
DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  -- photo_url VARCHAR(255) NOT NULL,
  -- city VARCHAR(255) NOT NULL,
  lat FLOAT NOT NULL DEFAULT 48.4209,
<<<<<<< HEAD
  long FLOAT NOT NULL DEFAULT 102.079
=======
  long FLOAT NOT NULL DEFAULT -102.079
>>>>>>> 1460f6659f80adb7d4ff24463fa9603cd100f1a1
);

