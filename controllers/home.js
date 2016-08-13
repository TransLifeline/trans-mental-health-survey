'use strict';

const menu = require('./common/menu');
const randtoken = require('rand-token');
var nodemailer = require('nodemailer');

/* A controller for the home page. */
function controller(app, db) {
  // Set up TTL to expire tokens after an hour.
  db.createCollection('validation', function(err, collection) {
    if (err) {
      console.log(err);
    } else {
      collection.createIndex({'createdAt': 1}, {expireAfterSeconds: 3600});
    }
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
    let first = req.body.first;
    let last = req.body.last;
    let validationUrl = generateValidationData(req, db, email, first, last);
    sendEmail(validationUrl, email).then(function() {
      res.status(200).end();
    }).catch(function(err) {
      console.log(err);
      res.status(500).end();
    });
  });
}

/*
Creates and save validation data. Returns the validation link.
*/
function generateValidationData(req, db, email, first, last) {
  // Create token and save validation data.
  let token = randtoken.generate(16);
  let emailHash = require('crypto').createHash('md5').update(email).digest("hex");
  let data = {
    createdAt: new Date(),
    token: token,
    email: email,
    emailHash: emailHash
  }
  if (first) {
    data['first'] = first;
  }
  if (last) {
    data['last'] = last;
  }
  db.collection('validation').insertOne(data);

  // Generate and return the validation link
  return req.protocol + '://' + req.hostname + '/verify/' + token + '/' + emailHash;
}

function sendEmail(validationUrl, email) {
  return new Promise(function(resolve, reject) {
    // Only use our Mailgun quota in production.
    if (process.env.NODE_ENV === 'production') {
      resolve(validationUrl);
    } else {
      // Do not use Mailgun in dev.
      console.log('Validation link: ' + validationUrl);
      resolve(validationUrl);
    }
  });
}

module.exports = controller;
