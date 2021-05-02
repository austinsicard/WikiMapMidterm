



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

//ADD New User, only registered users can create and edit map
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

  const queryString = `SELECT map_id FROM users WHERE users.id = $1;`;
  const values = [id];

  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => null);
};

exports.getUserMapsWithId = getUserMapsWithId;


//TO select points created by user
const getUserPointsWithId = (id) => {

  const queryString = `SELECT points.id FROM points WHERE users.id = $1;`;
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


//Create points
const createPoints =  ({map_id, user_id, title, description, photo_url, lat, long}) => {

  const queryString = `INSERT INTO points (map_id, user_id, title, description, photo_url, lat, long) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const values = [map_id, user_id, title, description, photo_url, lat, long];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.createPoints = createPoints;

//Create maps
const createMaps =  ({user_id, title, description, photo_url, city, lat, long}) => {

  const queryString = `INSERT INTO maps (user_id, title, description, photo_url, city, lat, long) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  const values = [user_id, title, description, photo_url, city, lat, long];
  return pool
    .query(queryString, values)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

exports.createMaps = createMaps;
