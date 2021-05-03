// // load .env data into process.env
// require('dotenv').config();

// // save settings from env file in variable
// const user = process.env.DB_USER;
// const password = process.env.DB_PASS;
// const host = process.env.DB_HOST;
// const database = process.env.DB_NAME;

// // connection with database
// const { Pool } = require('pg');
// // pass in the varibles from env (using shortcut)
// const pool = new Pool({
//   user,
//   password,
//   host,
//   database
// });

// FUNCTIONS
// USERS
//to get a user by email
const getUserByEmail = (db, email) => {
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  const values = [email];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => null);
};
exports.getUserByEmail = getUserByEmail;

//to get a user by user_id
const getUserById = (db, id) => {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.getUserById = getUserById;

//ADD New User, only registered users can create and edit maps and points
const addUser =  (db, {name, password, email}) => {
  const queryString = `INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *;`;
  const values = [name, password, email];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.addUser = addUser;




// WIDGETS

// list maps
const listMaps = (db, options, limit = 10) => {
  const sql = `SELECT title FROM maps`
  db.query(sql)
    .then()
};
exports.listMaps = listMaps;

// Individual map
const getMapById = (db, map_id) => {
  const queryString = `SELECT * FROM maps WHERE maps.id = $1;`;
  const values = [map_id];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};
exports.getMapById= getMapById;



// list favourites
const getFavoritesByUser = (db, id) => {
  //const queryString = `SELECT map_id FROM favorites WHERE user_id = $1;`;
  const queryString = `
  SELECT maps.* 
  FROM maps
  JOIN favorites ON maps.id = map_id
  JOIN users ON users.id = favorites.user_id
  WHERE user.id = favorites.user_id
  AND users.id = $1;
  `;
  const values = [id];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => null);
};

exports.getFavoritesByUser = getFavoritesByUser;


//TO select map_id created by user
const getMapsByUser = (db, id) => {

  const queryString = `SELECT maps.* FROM maps WHERE user_id = $1;`;
  const values = [id];

  return db
    .query(queryString, values)
    .then((result) => result.rows)
    .catch((err) => null);
};

exports.getMapsByUser = getMapsByUser;


//TO select points created by user
// const getPointsByUser = (db, id) => {
//   const queryString = `SELECT points.id FROM points WHERE user_id = $1;`;
//   const values = [id];
//   return db
//     .query(queryString, values)
//     .then((result) => result.rows[0])
//     .catch((err) => null);
// };
// exports.getPointsByUser = getPointsByUser;

// maps, user contributed to
const getMapsByPoints = (db, user_id ) => {
  const queryString = `
  SELECT maps.* 
  FROM maps 
  JOIN points ON maps.id = map_id 
  JOIN users ON users.id = points.user_id 
  WHERE points.user_id = users.id
  AND users.id = $1;`;
  const values = [user_id];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => null);
};

exports.getMapsByPoints = getMapsByPoints;

//Add to favorites
const addFavorite =  (db, map_id, user_id) => {
  const queryString = `INSERT INTO favorites (map_id, user_id VALUES ($1, $2) RETURNING *;`;
  const values = [map_id, user_id];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};
exports.addFavorite = addFavorite;

//Create points
const addPoint =  (db, {map_id, user_id, title, description, photo_url, lat, long}) => {

  const queryString = `INSERT INTO points (map_id, user_id, title, description, photo_url, lat, long) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const values = [map_id, user_id, title, description, photo_url, lat, long];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.addPoint = addPoint;

//Create maps
const addMap =  (db, {user_id, title, description, photo_url, city, lat, long}) => {

  const queryString = `INSERT INTO maps (user_id, title, description, photo_url, city, lat, long) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  const values = [user_id, title, description, photo_url, city, lat, long];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.addMap = addMap;

//Delete a map
const deleteMap =  (db, map_id) => {

  const queryString = `DELETE FROM maps WHERE user_id = $1 AND maps.id = $2) VALUES ($1, $2);`;
  const values = [user_id, map_id];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.deleteMap = deleteMap;

//Delete a point
const deletePoint =  (db, {user_id, point_id}) => { // add map_id?

  const queryString = `DELETE FROM points WHERE user_id = $1 AND points.id = $2) VALUES ($1, $2);`;
  const values = [user_id, point_id];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.deletePoint = deletePoint;

//Delete a favorite
const deleteFavorite =  (db, user_id, map_id) => {

  const queryString = `DELETE FROM favorites WHERE user_id = $1 AND map_id = $2) VALUES ($1, $2);`;
  const values = [user_id, map_id];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.deleteFavorite = deleteFavorite;
