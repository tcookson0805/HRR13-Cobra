var express = require('express');
var bodyParser = require('body-parser'); 
//require mongoose
var mongoose = require('mongoose');
var config = require('./config/middleware.js');
//create connection to database
//configure midleware and routing 

// mongoose.connect('mongodb://127.0.0.1:3000/greenfield');

var app = express();

// configures our server to run with our middleware and routes
config(app, express);

// FIXME: add dynamic port before deployment (process.env.NODE_ENV)
app.listen(3000);

console.log('listening on 3000')
