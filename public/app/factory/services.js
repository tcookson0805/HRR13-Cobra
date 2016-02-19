angular.module('app.services', [])

.factory('Trips', function($http, $window) {

  var trips = {};
  var user = $window.localStorage.getItem('com.tp')
  var tripID;

  var allTrips = function(user) {
    return $http({
        method: 'GET',
        url: '/api/' + user + '/alltrips'
      })
      .then(function(resp) {
        trips = resp.data;
      })
      .then(function() {
        return trips;
      });
  };

  // allTrips(user);

  var accessTrip = function(tripID) {
    tripID = tripID;
    return // the specific trip with tripID from trips object;
  };

  var newTrip = function(user, location, startDate) {
    var mydata = {
      user: user,
      location: location,
      startDate: startDate
    };
    return $http({
        method: 'POST',
        url: '/api/' + user + '/trips',
        data: mydata
      })
      .then(function(err, response) {
        if (err) {
          console.log('Error:', err);
        }
        tripID = response.id
      })
  };

  var addDetails = function(flying, leavingCountry, travelingAlone, accomodations, title, details) {
    var tripData = {
      flying: flying,
      leavingCountry: leavingCountry,
      travelingAlone: travelingAlone,
      accomodations: accomodations,
      title: title,
      details: details,
    };
    return $http({
        method: 'POST',
        url: '/api/trip/' + tripID,
        data: tripData
      })
      .then(function(err, response) {
        if (err) {
          console.log('Error:', err);
        }
        allTrips(user);
      })

  }

  return {
    allTrips: allTrips,
    accessTrip: accessTrip,
    newTrip: newTrip,
    trips: trips,
    tripID: tripID,
    addDetails: addDetails
  }

})


.factory('Auth', function($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.tp'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function(user) {
    return $http({
        method: 'POST',
        url: '/api/users/signin',
        data: user
      })
      .then(function(resp) {
        return resp.data.token;
      });
  };

  var signup = function(user) {
    return $http({
        method: 'POST',
        url: '/api/users/signup',
        data: user
      })
      .then(function(resp) {
        return resp.data.token;
      });
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('com.tp');
  };

  var signout = function() {
    $window.localStorage.removeItem('com.tp');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
