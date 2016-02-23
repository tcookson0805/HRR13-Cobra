var Users = require('./userModel.js');
var Q = require('q');
var Trips = require('../trips/tripModel.js');
var util = require('../config/utils.js');
var authController = require('./../config/authController.js');

module.exports = {
  signup: function(req, res){
    var newUser = Users({
      username: req.body.username,

      // leave password outside to call newUser's method after instantiation
      // password: Users.generateHash(req.body.password),
    });
    // TODO: did not save salt after hashing
    // TODO: did not work when hashing user password in instantiation
    newUser.password = newUser.generateHash(req.body.password);
    // newUser.salt = newUser.generateSalt(req.body);

    newUser.save(function (err, user) {
      if(err) console.error(err);
      else {
        console.log('sending token...'+token);
        var token = authController.createToken(user);
        res.send(token);
      }
    });

    // @output {String} 
    // res.send(newUser._id);

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
          var token = authController.createToken(user);
          Trips.find({userId: user._id})
            .then(function(found){
              // console.log('Sending results with '+user._id);
              // var cookie = util.createSession(req, res, user, next);
              // console.log(cookie);
              // sends back cookie and a list of user trips
              res.send({
                token,
                // cookie,
                found
              });
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
    var tripArr;
    console.log(req.decoded.username);
    Users.findOne({'username':req.decoded.username})
    // TODO: pulling data straight from one schema instead of separating trips
    // from Users
      .then(function(user) {
        tripArr = user.trips;
        res.send(user.trips);
      })
      .catch(function(err) {
        res.status(403).send('No trips found');
      })

    // Trips.find({
    //   '_id': { $in: tripArr }
    // })
    // .then(function(foundTrips) {
    //   console.log(foundTrips)
    //   res.send(foundTrips)
    // })
    // .catch(function(err){
    //   res.status(403).send('No Trips');
    // })

  }
};