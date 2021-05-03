/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// app.use("/api/widgets", usersRoutes(db));

// main page

module.exports = (db) => {
  router.get("/maps", (req, res) => {
      db.listMaps(req.query, 10) //return a promise with filtered data
      .then(data => res.send(data)) // send the data to the server.js
      .catch(err => {
        console.log(err);
        res.send(err); // if error send to server (put it in pop up message or something)
      })
  });

  // individual map
  router.get('/maps/:id', (req, res) => {
    const id = req.params;
    db.getMapById(id)
      .then(data => res.send(data))
      .catch(err => {
      console.log(err);
      res.send(err);
      })
    })

  // create a map
  router.post('/maps', (req, res) => {
    const userId = req.session.userId; // access session data
    db.createMap({...req.body, owner_id: userId})
    .then(map => {
      res.send(map);
    })
    .catch((err) => {
      res.send(err)
    })
  })

  // modify a map
  router.post('/maps/:id', (req, res) => {
    const mapId = req.params;
    // comes from the form
    // const title;
    // const description;
    // const userId; // ?? only for validation 
    // const city; // ?? 
    db.modifyMap(title, decription)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
  })

  // add to favourites
  router.post('/maps/:id', (req, res) => {
    const userId = req.session.userId; // access session data
    const mapId = req.params;
    db.createMap(userId, mapId) // returns a new 'favourites' table
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
  })
  
  // delete a map
  router.post('/maps/:id', (req, res) => {
    const mapId = req.params;
    db.deleteMap(mapId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(result)
    })
  })

  // FIX POINTS ROUTERS ACCORDING TO HOW API WORKS

  // add a point
  router.post('/maps/:id/points', (req, res) => {
    const mapId = req.params;
    db.addPoint(mapId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
  })

  // delete a point
  router.post('/maps/:mapID/points/:pointId', (req, res) => {
  const mapId = req.params.mapId;
  const pointId = req.params.pointId;
  db.deletePoint(mapId, pointId)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
})

  return router;
};
