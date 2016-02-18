var tripController = require('./tripController.js');

module.exports = function(app) {
  app.post('/create', tripController.create);
  app.post('/remove',tripController.remove);
  app.get('/modify/:routeID', tripController.modify);
};