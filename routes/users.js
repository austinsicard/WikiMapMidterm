const express = require('express');
const router  = express.Router();
const { getUserById, getMapsByUser, getFavoritesByUser, getMapsByPoints } = require('./helperFunctions');

module.exports = (db) => {

  // user profile
  router.get('/:id', (req, res) => {
    const templateVars = {
      user: req.user // comes from cookie
    };
    res.render("userPage", templateVars);
  });

  router.get('/api/:id', (req, res) => {
    const id = req.params.id;
    getUserById(db, id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // list user's map
  router.get('/api/:userId/maps', (req, res) => {
    const userId = req.params.userId;
    getMapsByUser(db, userId)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  router.get("/:userId/maps", (req, res) => {
    const templateVars = {
      user: req.user
    };
    res.render("userMaps", templateVars);
  });


  // list favorites
  router.get('/:id/favorites', (req, res) => {
    const templateVars = {
      user: req.user
    };
    res.render("favorites", templateVars);
  });


  router.get('/api/:id/favorites', (req, res) => {
    const userId = req.params.id;
    getFavoritesByUser(db, userId)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });


  // get maps by user's points => maps, user contributed to
  router.get('/api/:userId/maps/points', (req,res) => {
    const userId = req.params.userId;
    getMapsByPoints(db, userId)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  router.get("/:userId/maps/points", (req, res) => {
    const templateVars = {
      user: req.user
    };
    res.render("userPoints", templateVars);
  });


  return router;
};
