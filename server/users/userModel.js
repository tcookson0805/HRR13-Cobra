var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    unique: true,
    createdOn: { type: Date, default: Date.now },
  },
  password: {
    type: String,
    required: true,
  },
  salt: String,
});



// build a model from UserSchema
module.exports = mongoose.model('users', UserSchema);