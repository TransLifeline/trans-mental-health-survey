'use strict';

const menu = require('./common/menu');
const mcapi = require('mailchimp-api/mailchimp');

/* A controller for the home page. */
function controller(app) {
  let mc = new mcapi.Mailchimp(process.env.MAILCHIMP_KEY);
  let listId;
  mc.lists.list(function(data) {
    let lists = data.data;
    let surveyList = lists.find(function(list) {
      return list.name === 'Mental Health Survey List'
    });
    if (!surveyList) {
      console.log('List not found.');
    }
    listId = surveyList.id;
  });

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
    let merge = {};
    if(req.body.first) {
      merge['FNAME'] = req.body.first;
    }
    if(req.body.last) {
      merge['LNAME'] = req.body.last;
    }
    mc.lists.subscribe({id: listId, email:{email: email}, merge_vars: merge}, function() {
      res.status(200).end();
    },
    function(err) {
      console.log(err);
      res.status(500).end();
    });
  });
}

module.exports = controller;
