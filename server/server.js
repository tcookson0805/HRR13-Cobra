var express = require('express');
var bodyParser = require('body-parser'); 

var app = express();

app.get('/', function(req, res, body) {
  res.send('Hello World');
});

app.get('/:hello', function(req, res, body) {
  res.send(req.query.hello);
});

app.listen(3000);