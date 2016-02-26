var tripController = require('./tripController.js');
var authController = require('./../config/authController.js');
var express = require('express');

module.exports = function(app) {
  // FIXME: restore auth for create
  app.post('/create', authController.authorize, tripController.create);
  app.post('/remove',authController.authorize, tripController.remove);
  app.put('/modify/',authController.authorize, tripController.modify);
  app.put('/modify2/',authController.authorize, tripController.modify2);
  app.get('/:tripId', tripController.getTripView);

};
