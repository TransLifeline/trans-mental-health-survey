'use strict';

const home = require('./home');
const verify = require('./verify');

/*
  Loads controllers for all pages.
*/
function loadControllers(app, db) {
  home(app, db);
  verify(app, db);

  app.get('/', function (req, res) {
    let data = {
      menu: menu()
    };
    res.render('index', data);
  });
}

module.exports = loadControllers;
