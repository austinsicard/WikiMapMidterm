const express = require('express');
const router = express.Router();

// 'HTML' ENDPOINTS responsible for the view

module.exports = (db) => {

  router.get("/loginTest/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  });

  router.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/');
  });

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
    res.render("userPage", templateVars);
  });

  return router;
};
