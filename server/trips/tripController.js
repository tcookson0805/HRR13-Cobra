var Trip = require('./tripModel.js');

module.exports = {
  create: function(req, res, body){
    console.log(req.body);
    var newTrip = Trip({
      userId: req.body.userId,
      destination: req.body.destination,
      startDate: req.body.startDate,
    });

    newTrip.save(function(err, savedTrip) {
      if(err) console.log(err);
      else {
        // TODO: save trip objectID to user document in session
        console.log('Trip saved, ID: ' + savedTrip._id);
        res.send(savedTrip);
      }
    });


  },
  remove: function(){

  },
  modify: function(){

  },
};