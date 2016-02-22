var tripController = require('./tripController.js');
var authController = require('./../config/authController.js');

module.exports = function(app) {
  app.post('/create',authController.authorize, tripController.create);
  app.post('/remove',authController.authorize, tripController.remove);
  app.put('/modify/',authController.authorize, tripController.modify);
};