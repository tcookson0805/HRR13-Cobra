var Users = require('./userModel.js');

module.exports = {
  signup: function(req, res){
    var newUser = new Users({
      username: req.body.username,
      password: req.body.password
    });

    newUser = save();

    // redirect to homepage...
    res.redirect(301, '/');
  },
  signin: function(req, res){

  },
  logout: function(req, res){

  },
}