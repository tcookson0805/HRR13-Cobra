var mongoose = require('mongoose');


var TripSchema = new mongoose.Schema({
  destination: String,
  userId: String,
  startDate: Date,
});




module.exports = mongoose.model('trips', TripSchema);