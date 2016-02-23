var jwt = require('jsonwebtoken');  
var _ = require('lodash');

var secret = 'the cobra command';

module.exports = {

  authorize: function (req, res, next){
    console.log('Auth is being called...');
    console.log('REQ BODY', req);
    var token = req.body.token || req.headers['x-access-token'];
    console.log('outside verify', token)
    console.log('header is... '+req.headers['x-access-token']);
    if(token){
      console.log(secret + 'is secret');
      jwt.verify(token, secret, function(err, decoded){
        if(err){
          console.error(err)
          return res.status(403).send(err)
        }else{
          req.decoded = decoded;
          return next();
        }
      })
    } else {
      res.status(403).send('Token not provided');
    }
  }, 
  createToken: function (user){
    console.log('creating token', user);
    return jwt.sign(_.omit(user, 'password'),secret,{
      expiresIn: 24 * 60 * 60
    })
  }
};