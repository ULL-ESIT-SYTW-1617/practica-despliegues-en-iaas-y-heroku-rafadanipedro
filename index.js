var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

const port = process.env.PORT || 8080;

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.get('*', function (req, res) {
  console.log(req.body);
  res.send('Hello World!');
});

app.post('*', function (req, res) {
  console.log(req.body);
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});