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
    console.log(req.user)
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

  router.get("/point", (req, res) => {
    const templateVars = {
      user: req.user
    };
    res.render("pointPage", templateVars)
  })

  // router.get("/create-map", (req, res) => { //form
  //   const templateVars = {
  //     user: req.user
  //   };
  //   res.render("createMap", templateVars)
  // })

  // router.get("/create-point", (req, res) => { //form
  //   const templateVars = {
  //     user: req.user
  //   };
  //   res.render("createPoint", templateVars)
  // })

  router.get("/favorites", (req, res) => {
    const templateVars = {
      user: req.user
    };
    res.render("favorites", templateVars)
  })

  router.get("/user-maps", (req, res) => {
    const templateVars = {
      user: req.user
    };
    res.render("userMaps", templateVars)
  })

  router.get("/user-points", (req, res) => {
    const templateVars = {
      user: req.user
    };
    res.render("userPoints", templateVars)
  })





  return router;
};
