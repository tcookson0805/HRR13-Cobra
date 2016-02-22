angular.module('app.new-trip', [])

.controller('new-tripController', function($scope, $location, Trips) {

  $scope.createTrip = function(destination, startDate) {
    Trips.newTrip(destination, startDate)
      .then(function(data) {
        $location.path('#/my-trip/')
      })
  };

});
