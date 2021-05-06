/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getMapById, getPointsById, getPointsByMap, listMaps, addFavorite, addPoint, addMap, deleteMap, deletePoint, deleteFavorite } = require('./helperFunctions');

// API ENDPOINT RESPONSIBLE FOR DATA

// main page
module.exports = (db) => {
  router.get("/", (req, res) => {
      listMaps(db) //return a promise with filtered data
      .then(data => { //UNDEFINED
        res.send(data)
      })
      .catch(err => {
        res.send(err); // if error send to server (put it in pop up message or something)
      })
  });



  router.get("/new", (req, res) => { //form
    const templateVars = {
      user: req.user
    };
    res.render("createMap", templateVars)
  })



  // create a map
  router.post('/', (req, res) => {
    const userId = req.session.user_id; // access session data (like cookie)
    addMap(db, { ...req.body, user_id: userId })
      .then(map => {
        res.redirect(`/maps/${map.id}/points`);
      })
      .catch((err) => {
        res.send(err)
      })
  })

  // individual map
  router.get('/api/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    getMapById(db, id)
      .then(data => {
        console.log('Data from function: ' + data)
        res.send(data);
      })
      .catch(err => {
      console.log(err);
      res.send(err);
      })
    })

  router.get("/:id", (req, res) => {
    const templateVars = {
      user: req.user // comes from cookie
    };
    res.render("mapPage", templateVars)
  })

  // modify a map
  router.post('/:id', (req, res) => {
    const mapId = req.params.id;
    // comes from the form
    const modifications = { ...req.body, id: mapId } // check how it works with form
    editMap(db, modifications)
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  })

  // add to favorites
  router.post('/:id/favorites', (req, res) => {
    const userId = req.session.userId; // access session data
    const mapId = req.params.id;
    addFavorite(db, mapId, userId) // returns a new 'favourites' table
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  })

  // delete a favorite map
  router.post('/:userId/favorites/:mapId/delete', (req, res) => {
    const userId = req.params.userId;
    const mapId = req.params.mapId;
    deleteFavorite(db, userId, mapId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
  })

  // delete a map
  router.post('/:id/delete', (req, res) => {
    const mapId = req.params.id;
    deleteMap(db, mapId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
  })

  // FIX POINTS ROUTERS ACCORDING TO HOW API WORKS

  // get point by point id
  router.get('/points/:id', (req, res) => {
    const pointId = req.params.id;
    getPointsById(db, pointId)
    .then (result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err.message);
    })
  })

  // give the map id
  router.get("/:id/points", (req, res) => { //form
    const templateVars = {
      user: req.user,
      map_id: req.params.id
    };
    res.render("createPoint", templateVars)
  })

  // get point data by map id
  router.get('/api/:id/points', (req, res) => {
    const mapId = req.params.id;
    getPointsByMap(db, mapId)
    .then(result => {
        console.log(result)
        res.send(result);
      })
      .catch(err => {
        res.send(err.message);
      })
  })

  // add a point
  router.post('/:id/points', (req, res) => {
    const mapId = req.params.id;
    const userId = req.session.user_id; // access session data (like cookie)
    const pointId = req.body.id;
    // addMap(db, { ...req.body, user_id: userId })
    console.log("Req Body:", req.body);
    // {map_id, user_id, title, description, photo_url, lat, long}
    addPoint(db, {...req.body, map_id: mapId, user_id: userId})
    .then(result => {
      // res.send(result)
      res.redirect(`/point`);
    })
    .catch(err => {
      res.send(err);
    })
  })

  // delete a point
  router.post('/:mapID/points/:pointId', (req, res) => {
  const mapId = req.params.mapId;
  const pointId = req.params.pointId;
  deletePoint(db, mapId, pointId) // add user id?
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
})

  return router;
};
