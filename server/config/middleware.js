var bodyParser = require('body-parser'); 
module.exports = function(app, express){
  
  app.use(bodyParser.json());

  // enables access
  app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  var userRouter = express.Router();
  var tripRouter = express.Router();

  app.use(express.static(__dirname + '/../../public'));
  app.use('/api/users', userRouter);
  app.use('/api/trips', tripRouter);

  // function userRouter(app) {}
  require('../users/userRoutes')(userRouter);
  require('../trips/tripRoutes')(tripRouter);
  
}

