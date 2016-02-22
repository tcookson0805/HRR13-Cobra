var Trip = require('./tripModel.js');

module.exports = {
  create: function(req, res, body){
    console.log(req.body.token);
    var newTrip = Trip({
      userId: req.body.userId,
      destination: req.body.destination,
      startDate: req.body.startDate,
    });

    newTrip.save(function(err, savedTrip) {
      if(err) {
        res.status(404).send(err);
        console.log(err);
      } else {
        // TODO: save trip objectID to user document in session
        console.log('Trip saved, ID: ' + savedTrip._id);
        res.status(201).send(savedTrip);
      }
    });


  },
  remove: function(req, res, body){
    Trip.remove({ _id: req.body._id }, function(err){
      if(!err) {
        console.log('Message removed: ' + req.body._id);
        res.status(200).send('ok');
      } else {
        res.status(404).send('Cannot remove message');
        console.log('Cannot remove message');
      }
    });
  },
  modify: function(req, res, body){
    Trip.find({ _id: req.body._id }, function(err, trip) {
      if (err) {
        res.send('failed');
      } else {
        console.log(req.body);
        trip.destination = req.body.destination;
        trip.startDate = req.body.startDate;
        res.status(201).send('modified');
        // trip.save(function(err) {
        //   if(err) console.log('cannot save trip');
        //   res.send('trip modified');
        // });
      }
    });
  },
};