var userController = require('./userController');
var app = require('../server.js');
var tripController = require('../trips/tripController.js');
var authController = require('./../config/authController.js');

module.exports = function(app) {
  app.post('/signup', userController.signup);
  app.post('/signin', userController.signin);
  app.get('/remove', authController.authorize, userController.removeUser);
  app.get('/alltrips', authController.authorize, userController.alltrips);
};
