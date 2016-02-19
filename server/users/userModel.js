var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Q = require('q');

var UserSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // an array of objectID reference to tripSchema
  trips: [],
  salt: String
});



UserSchema.methods = {
  generateHash: function(password) {
    // @method .genSaltSync(9) to encrypt 9 times
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
  },
  comparePasswords: function(inputPassword, hash) {
    // How is salt involved in compareSync?
    return bcrypt.compareSync(inputPassword, hash);
  }
}

// UserSchema.pre('save', function(next){
//   // this is where we will take the user input and generate the hashed password
//   // use bcrypt to hash
// });


module.exports = mongoose.model('users', UserSchema);
