var express = require('express');
var router = express.Router();
var userController = require('./server/users/userController.js');

router.get('/signup', function(req, res) {
  return userController.signup(req, res);
});