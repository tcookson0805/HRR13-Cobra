angular.module('app.trips', [])

.controller('tripsController', function($scope, Trips) {
  // Your code here
  angular.extend($scope, Trips);

  // $scope.nodate = {}
  $scope.trips = {};
  $scope.showTrips = function() {
    Trips.allTrips()
      .then(function(data) {
        $scope.trips = data;
      });
    // .then(function($scope.trips){
    // loop thorugh scope.trips
    //
    // })
  };
  $scope.showTrips();

  $scope.renderTrip = function(trip) {
    Trips.getTrip(trip);
  };
});

// {{ $scope.trips | trip.date > today || orderby: closest trip first }}
