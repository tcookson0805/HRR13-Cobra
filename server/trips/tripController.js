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
  remove: function(req, res, body){
    Trip.remove({ _id: req.body._id }, function(err){
      if(!err) {
        console.log('Message removed: ' + req.body._id);
        res.send('ok');
      } else {
        console.log('Cannot remove message');
      }
    });
  },
  modify: function(req, res, body){
    Trip.find({ _id: req.body._id }, function(err, trip) {
      if (err) {
        res.send('failed');
      } else {
        trip.destination = req.body.destination;
        trip.startDate = req.body.startDate;
        // trip.save(function(err) {
        //   if(err) console.log('cannot save trip');
        //   res.send('trip modified');
        // });
      }
    });
  },
};