'use strict';

const home = require('./home');

/*
  Loads controllers for all pages.
*/
function loadControllers(app, db) {
  home(app, db);
}

module.exports = loadControllers;
