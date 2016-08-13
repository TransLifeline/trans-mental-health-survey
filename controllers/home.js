'use strict';

const menu = require('./common/menu');
const mcapi = require('mailchimp-api/mailchimp');
const mc = new mcapi.Mailchimp('API KEY');

/* A controller for the home page. */
function controller(app) {

  app.get('/', function (req, res) {
    let data = {
      menu: menu()
    };
    res.render('index', data);
  });

  app.post('/subscribe', function(req, res) {
    if (!req.body || !req.body.email) {
      res.status(400).end();
    }
    let email = req.body.email;
    let first = req.body.first;
    let last = req.body.last;
    res.status(200).end();
  });
}

module.exports = controller;
