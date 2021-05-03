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

// helper fuctions

const createMap = (map) => {  // refer to addProperty in lightBnB/database/addProperty
  return pool.query(`
  INSERT INTO maps(
    owner_id,
  )`)
    // got owner id from req.session.user_id, other values come from '...req.body'
    .then(result => {
      console.log(result.rows)
      return result.rows
    })
    .catch((err) => {
      return err.message
    })
};
exports.createMap = createMap;

const modifyMaP = (mapId, title, description) => {
  const sql = `UPDATE`
};
exports.modifyMaP = modifyMaP;

const deleteMap = (mapId) => {
  const sql = `DELETE`
};
exports.deleteMap = deleteMap;

const addToFavourite = (userId, mapId) => {
  const sql = `INSERT INTO favourites(user_id, map_id) VALUES ($1, $2)`
  pool.query(sql, [userId, mapoId])
    .then(result => {
      return result.rows
    })
    .catch(err => {
      return err.message
    })
};
exports.addToFavourite = addToFavourite;

const listMaps = (options, limit = 10) => { 
  const sql = `SELECT title FROM maps`
  pool.query(sql)
  .then()
 };
exports.listMaps = listMaps;

const getMapById = (id) => { };
exports.getMapById = getMapById;

const getUserById = (id) => { }; // access to your own profile. stretch -- access to other users' profiles
exports.getUserById = getUserById;

// FIX POINTS ROUTERS ACCORDING TO HOW API WORKS

const addPoint = (mapId) => { };
exports.addPoint = addPoint;

const deletePoint = (mapId, pointId) => { };
exports.deletePoint = deletePoint;



// stretch -- modify a point
// stretch -- login(email, password), logout, sign up, etc



