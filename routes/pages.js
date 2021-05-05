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

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/map", (req, res) => {
    res.render("mapPage")
  })

  router.get("/user", (req, res) => {
    res.render("userPage")
  })

  router.get("/point", (req, res) => {
    res.render("pointPage")
  })

  router.get("/create-map", (req, res) => { //form
    res.render("createMap")
  })

  router.get("/create-point", (req, res) => { //form
    res.render("createPoint")
  })

  router.get("/favorites", (req, res) => {
    res.render("favorites")
  })

  router.get("/user-maps", (req, res) => {
    res.render("userMaps")
  })

  router.get("/user-points", (req, res) => {
    res.render("userPoints")
  })





  return router;
};
