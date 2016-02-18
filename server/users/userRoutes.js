var userController = require('./userController');
var app = require('../server.js');

module.exports = function(app){
  app.post('/signup', userController.signup);
  app.post('/signin',userController.signin);
  app.get('/logout', userController.logout);
};