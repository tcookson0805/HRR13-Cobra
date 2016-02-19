angular.module('app.services', [])

.factory('Trips', function($http, $window) {

  var trips = {};
  var user = $window.localStorage.getItem(somethingGoesHere)
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

  var accessTrip = function(tripID) {
    tripID = tripID
      // return trip in the trips object that matches tripID
      //
      // console.log()
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

  }

  return {
    allTrips: allTrips,
    accessTrip: accessTrip,
    newTrip: newTrip,
    trips: trips,
    tripID: tripID
  }

  allTrips(user);
});
