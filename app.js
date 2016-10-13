'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./app/routes.js')

let app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use('/', routes)

module.exports = app