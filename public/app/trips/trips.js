angular.module('app.trips', [])

.controller('tripsController', function($scope, Trips) {
  // Your code here
  // $scope.nodate = {}
  $scope.trips = {};

  $scope.showTrips = function(user) {
    Trips.allTrips(user)
      .then(function(data) {
        console.log('I SHOULD APPEAR ON SIGNIN', data);
        $scope.trips = data;
      });
    // .then(function($scope.trips){
    // loop thorugh scope.trips
    //
    // })
  };
  $scope.showTrips(Trips.user);

  // $scope.renderTrip = function(trip) {
  //   Trips.getTrip(trip);
  // };
});

// {{ $scope.trips | trip.date > today || orderby: closest trip first }}
