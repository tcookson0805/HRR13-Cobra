var express = require('express');
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
var config = require('./config/middleware.js');
//create connection to database


// test on saving a user to database
var User = require('./users/userModel.js');
var firstUser = new User({
  username: 'Bob',
  password: 'Secret',
});
firstUser.save();

/**
* kill current process if port is already in use at 
* http://stackoverflow.com/questions/6478113/unable-to-start-mongodb-local-server
*/
mongoose.connect('mongodb://127.0.0.1:27017');

var app = express();

// configures our server to run with our middleware and routes
config(app, express);

// FIXME: add dynamic port before deployment (process.env.NODE_ENV)
app.listen(3000);

console.log('listening on 3000')
