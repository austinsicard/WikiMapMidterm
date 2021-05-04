/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getMapById, listMaps, addFavorite, addPoint, addMap, deleteMap, deletePoint, deleteFavorite } = require('./helperFunctions');

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

  // create a map
  router.post('/', (req, res) => {
    const userId = req.session.userId; // access session data (like cookie)
    addMap(db, { ...req.body, owner_id: userId })
      .then(map => {
        res.send(map);
      })
      .catch((err) => {
        res.send(err)
      })
  })

  // individual map
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    getMapById(db, id)
      .then(data => {
        res.json(data)
        // res.send(data)
      })
      .catch(err => {
      console.log(err);
      res.send(err);
      })
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

  // add a point
  router.post('/:id/points', (req, res) => {
    const mapId = req.params.id;
    addPoint(db, mapId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
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
