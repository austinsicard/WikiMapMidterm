// load .env data into process.env
require('dotenv').config();

// save settings from env file in variable
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;

// connection with database
const { Pool } = require('pg');
// pass in the varibles from env (using shortcut)
const pool = new Pool({
  user,
  password,
  host,
  database
});

//to get a user by email
const getUserWithEmail = (email) => {

  const queryString = `SELECT * FROM users WHERE email = $1;`;
  const values = [email];

  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => null);
};

exports.getUserWithEmail = getUserWithEmail;


//to get a user by user_id
const getUserWithId = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.getUserWithId = getUserWithId;

//ADD New User, only registered users can create and edit maps and points
const addUser =  ({name, password, email}) => {

  const queryString = `INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *;`;
  const values = [name, password, email];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.addUser = addUser;

//To Select map properties from map_id
const getMapPropertiesFromMapId =(map_id) =>{

  const queryString = `SELECT * FROM maps WHERE maps.id = $1;`;
  const values = [map_id];
  return pool
    .query(queryString, values)
    .then((result) => result.row[0])
    .catch((err) => err.message);
};

exports.getMapPropertiesFromMapId = getMapPropertiesFromMapId;



//To Select the favorites (map_id for a user)
const getUserFavoritesWithId = (id) => {

  const queryString = `SELECT map_id FROM favorites WHERE user_id = $1;`;
  const values = [id];

  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => null);
};

exports.getUserFavoritesWithId = getUserFavoritesWithId;


//TO select map_id created by user
const getUserMapsWithId = (id) => {

  const queryString = `SELECT maps.id FROM maps WHERE user_id = $1;`;
  const values = [id];

  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => null);
};

exports.getUserMapsWithId = getUserMapsWithId;


//TO select points created by user
const getUserPointsWithId = (id) => {

  const queryString = `SELECT points.id FROM points WHERE user_id = $1;`;
  const values = [id];

  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => null);
};

exports.getUserPointsWithId = getUserPointsWithId;

//TO select map_id from points
const getMapsFromPoints = (point_id) => {

  const queryString = `SELECT map_id FROM points WHERE points.id = $1;`;
  const values = [point_id];

  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => null);
};

exports.getMapsFromPoints = getMapsFromPoints;

//Create favorites
const createFavorite =  ({map_id, user_id}) => {

  const queryString = `INSERT INTO favorites (map_id, user_id VALUES ($1, $2) RETURNING *;`;
  const values = [map_id, user_id];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.createFavorite = createFavorite;

//Create points
const createPoint =  ({map_id, user_id, title, description, photo_url, lat, long}) => {

  const queryString = `INSERT INTO points (map_id, user_id, title, description, photo_url, lat, long) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const values = [map_id, user_id, title, description, photo_url, lat, long];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.createPoint = createPoint;

//Create maps
const createMap =  ({user_id, title, description, photo_url, city, lat, long}) => {

  const queryString = `INSERT INTO maps (user_id, title, description, photo_url, city, lat, long) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  const values = [user_id, title, description, photo_url, city, lat, long];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.createMap = createMap;

//Delete a map
const deleteMap =  ({user_id, map_id}) => {

  const queryString = `DELETE FROM maps WHERE user_id = $1 AND maps.id = $2) VALUES ($1, $2);`;
  const values = [user_id, map_id];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.deleteMap = deleteMap;

//Delete a point
const deletePoint =  ({user_id, point_id}) => {

  const queryString = `DELETE FROM points WHERE user_id = $1 AND points.id = $2) VALUES ($1, $2);`;
  const values = [user_id, point_id];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.deletePoint = deletePoint;

//Delete a favorite
const deleteFavorite =  ({user_id, map_id}) => {

  const queryString = `DELETE FROM favorites WHERE user_id = $1 AND map_id = $2) VALUES ($1, $2);`;
  const values = [user_id, map_id];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.deleteFavorite = deleteFavorite;
