
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
const listMaps = (db) => {
  const sql = `SELECT maps.* FROM maps`
  return db
    .query(sql)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      return err.message;
    })
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
  const queryString = `
  SELECT maps.*
  FROM maps
  JOIN favorites ON maps.id = map_id
  JOIN users ON users.id = favorites.user_id
  WHERE users.id = favorites.user_id
  AND users.id = $1;
  `;
  const values = [id];
  return db
    .query(queryString, values)
    .then((result) => result.rows)
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

// TO select points created by id
const getPointsById = (db, id) => {
  const queryString = `SELECT points.* FROM points WHERE points.id = $1;`;
  const values = [id];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => null);
};
exports.getPointsById = getPointsById;


// get points by map
const getPointsByMap = (db, id) => {
  const queryString = `SELECT points.* FROM points WHERE map_id = $1;`;
  const values = [id];
  return db
    .query(queryString, values)
    .then((result) => result.rows)
    .catch((err) => null);
};
exports.getPointsByMap = getPointsByMap;


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
    .then((result) => result.rows)
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



const editPoint = (db, options) => {
  const queryParams = [];
  let queryString = `UPDATE points SET `;
  //To change Point title
  if(options.title){
    queryParams.push(`%${options.title}%`);
    if (queryString.length > 1) {
      queryString += `, title = $${queryParams.length}`;
    } else {
      queryString += `title = $${queryParams.length}`;
    }
  }
  //to Change Point description
  if(options.description){
    queryParams.push(`%${options.description}%`);
    if (queryString.length > 1) {
      queryString += `, description = $${queryParams.length}`;
    } else {
      queryString += `description = $${queryParams.length}`;
    }
  }
  //to Change Point Photo
  if(options.photo_url){
    queryParams.push(`%${options.photo_url}%`);
    if (queryString.length > 1) {
      queryString += `, photo_url = $${queryParams.length}`;
    } else {
      queryString += `photo_url = $${queryParams.length}`;
    }
  }
  //to Change Point Latitude
  if(options.lat){
    queryParams.push(`%${options.lat}%`);
    if (queryString.length > 1) {
      queryString += `, lat = $${queryParams.length}`;
    } else {
      queryString += `lat = $${queryParams.length}`;
    }
  }
  //to Change Point Longitude
  if(options.long){
  queryParams.push(`%${options.long}%`);
  if (queryString.length > 1) {
     queryString += `, long = $${queryParams.length}`;
   } else {
     queryString += `long = $${queryParams.length}`;
   }
  }
  queryParams.push(`%${options.points.id}%`);
  queryString += `WHERE points.id = $${queryParams.length}`;
  queryParams.push(`%${options.user_id}%`);
  queryString += `AND user_id = $${queryParams.length};`;

// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
// WHERE CustomerID = 1;

  return db
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => err.message);
};

exports.editPoint = editPoint;

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
  const queryString = `DELETE FROM maps WHERE maps.id = $1) VALUES ($1);`;
  const values = [user_id, map_id];
  return db
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.deleteMap = deleteMap;

const editMap = (db, options) => {
  const queryParams = [];
  let queryString = `UPDATE maps SET `;
  //To change Map title
  if(options.title){
    queryParams.push(`%${options.title}%`);
    if (queryString.length > 1) {
      queryString += `, title = $${queryParams.length}`;
    } else {
      queryString += `title = $${queryParams.length}`;
    }
  }
  //to Change Map description
  if(options.description){
    queryParams.push(`%${options.description}%`);
    if (queryString.length > 1) {
      queryString += `, description = $${queryParams.length}`;
    } else {
      queryString += `description = $${queryParams.length}`;
    }
  }
  queryParams.push(`%${options.maps.id}%`);
  queryString += `WHERE maps.id = $${queryParams.length}`;
  queryParams.push(`%${options.user_id}%`);
  queryString += `AND user_id = $${queryParams.length};`;
// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
// WHERE CustomerID = 1;
  return db
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => err.message);
};

exports.editMap = editMap;


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
