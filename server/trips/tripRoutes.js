var tripController = require('./tripController.js');

module.exports = function(app) {
  app.post('/create', tripController.create);
  app.post('/remove',tripController.remove);
  app.post('/modify/', tripController.modify);
};
