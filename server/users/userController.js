var Users = require('./userModel.js');
var Q = require('q');
var Trips = require('../trips/tripModel.js');
var util = require('../config/utils.js');

module.exports = {
  signup: function(req, res){
    console.log(req.body);
    var newUser = Users({
      username: req.body.username,

      // leave password outside to call newUser's method after instantiation
      // password: Users.generateHash(req.body.password),
    });
    // TODO: did not save salt after hashing
    // TODO: did not work when hashing user password in instantiation
    newUser.password = newUser.generateHash(req.body.password);
    // newUser.salt = newUser.generateSalt(req.body);
    newUser.save(function(err, data){
      if (err){
        console.log('err', err);
      }
      res.send(data);
    });

    // @output {String} 
    
  },
  signin: function(req, res, next) {
    var userLogin = Users({
      username: req.body.username,
      password: req.body.password,
    });

    // TODO: will refactor into a promise
    Users.findOne({'username':userLogin.username}, function(err, user) {
      if (!user) {
        // no matching username
        res.send({
            "user" : null,
            "cookie" : {
              "originalMaxAge": null,
            }
          });
      } else {
        // compares current password with hashed password from found user
        if (userLogin.comparePasswords(userLogin.password, user.password)) {
          console.log('userController: Successfully logged in: ');
          console.log(user._id);
          Trips.find({userId: user._id})
            .then(function(found){
              console.log('Sending results with '+user._id);
              var cookie = util.createSession(req, res, user, next);
              console.log(cookie);
              // sends back cookie and a list of user trips
              res.send({
                cookie,
                found
              });
              res.send('hello');
            })
        } else {

          // TODO: improve solution besides providing no session
          // correct username, wrong password
          res.send({
            "user" : user,
            "cookie" : {
              "originalMaxAge": null,
            }
          });
        }
      }
    });

    // var findUser = Q.nbind(userLogin.findOne, userLogin);
    //   findUser(userLogin.username).then(function(user){
    //     if (user){
    //       //confirm password
    //       if (userLogin.comparePasswords(password)) {
    //         //if password matches
    //         res.send('valid');
    //         // next(user);
    //       } else {
    //         console.log('Wrong password');
    //         res.redirect('/signin');
    //       }
    //     }else{
    //       console.log('User does not exist!');
    //       res.redirect('/signin');
    //     }
    //     // if user, then confirm and send to next()
    //     // if no user, then console.log error and return to signin page
    //   });

  },
  logout: function(req, res){

    // @ref: http://stackoverflow.com/questions/11273988/clearing-sessions-in-mongodb-expressjs-nodejs
    console.log('BEFORE '+ JSON.stringify(req.session));
    req.session.destroy();
    console.log('AFTER '+req.session);
    res.redirect('/');
  },

  // @req.body expects an user _id for reference to Trips schema
  alltrips: function(req, res){

    Trips.find({})
      .then(function(trips) {
        res.send(trips);
      })
      .catch(function(err){
        console.log(err);
      });
  }
};