'use strict';

const menu = require('./common/menu');

/* A controller for the verify page. */
function controller(app, db) {
  http://localhost:3000/verify/GkHL4Uqnf6QwZJ1Z/6058f032a16d4c7d7cd8a4446d8f468a

  app.get('/verify/:token/:emailHash', function (req, res) {
    let token = req.params.token;
    let emailHash = req.params.emailHash;

    // TODO(nina): Add email to mailchimp

    let data = {
      menu: menu()
    };
    res.render('verify', data);
  });
}

module.exports = controller;
