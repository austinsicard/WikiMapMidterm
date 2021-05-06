/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */



const express = require('express');
const router  = express.Router();
const { getUserById, getMapsByUser, getFavoritesByUser, getMapsByPoints, getUserByEmail } = require('./helperFunctions');

module.exports = (db) => {

  // user profile
  router.get('/:id', (req, res) => {
    const templateVars = {
      user: req.user // comes from cookie
    };
    res.render("userPage", templateVars)
  })

  router.get('/api/:id', (req, res) => {
    const id = req.params.id;
    getUserById(db, id)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      })
  })

  // list user's map
  router.get('/:userId/maps', (req, res) => {
    //const userId = req.session.userId;
    const userId = req.params.userId;
    getMapsByUser(db, userId)
      .then(data => {
        res.json(data)
        // res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  });

  // list favorites
  router.get('/:id/favorites', (req, res) => {
    const userId = req.params.id;
    getFavoritesByUser(db, userId)
      .then(data => {
        console.log('Router works: ' + data)
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      })
  })

  // get maps by user's points => maps, user contributed to
  router.get('/:userId/maps/points', (req,res) => {
    const userId = req.params.userId;
    getMapsByPoints(db, userId)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
  })


  return router;
};
