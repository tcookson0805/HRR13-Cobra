exports.createSession = function(req, res, newUser, next) {
  console.log(req.session);
  // @regenerate destroys old session if any
  return req.session.regenerate(function() {

    req.session.user = newUser;

    // open to send JSON instead of redirecting
    // res.redirect('/');
  
  });
};

exports.isLoggedIn = function(req, res) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next) {
  if (!exports.isLoggedIn(req)) {
    req.redirect('/users/login');
  } else {
    next();
  }
};