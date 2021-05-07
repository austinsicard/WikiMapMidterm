/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */



const express = require('express');
const router = express.Router();
const { getUserById, getMapsByUser, getFavoritesByUser, getMapsByPoints, getUserByEmail } = require('./helperFunctions');

// 'HTML' ENDPOINTS responsible for the view

module.exports = (db) => {


  router.get("/loginTest/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/')
  })

  router.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/');
  })

  router.get("/", (req, res) => {
    const templateVars = {
      user: req.user
    };
    res.render("index", templateVars);
  });

  router.get("/user", (req, res) => {
    const templateVars = {
      user: req.user
    };
    res.render("userPage", templateVars)
  })

  // router.get("/user-points", (req, res) => {
  //   const templateVars = {
  //     user: req.user
  //   };
  //   res.render("userPoints", templateVars)
  // })





  return router;
};
