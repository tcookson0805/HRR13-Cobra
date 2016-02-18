var mongoose = require('mongoose');


var TripSchema = new mongoose.Schema({
  destination: String,
  tripStart: Date,
});




module.exports = mongoose.model('trips', TripSchema);