'use strict';

const $ = require('jquery-browserify');
const header = require('./header');
const home = require('./home');

$(document).ready(function() {
  header($);
  home($);
});
