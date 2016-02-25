angular.module('app.trips', [])

.controller('tripsController', function($scope, Trips, $routeParams) {

  $scope.trips = {};

  $scope.tripID = {
    id: $routeParams.id
  };

  $scope.showTrips = function(user) {
    Trips.allTrips(user)
      .then(function(data) {
        $scope.trips = data;
      });
  };

  $scope.showTrips(Trips.user);

});
