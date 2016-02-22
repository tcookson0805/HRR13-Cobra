angular.module('app.my-trip', [])

.controller('my-tripController', function($scope, $location, Trips) {

  //stores information about the current trip
  $scope.thisTrip = {};

  //reqests information about the current trip from the Trips factory
  $scope.getTrip = function() {
    var path = $location.path().substring(7);
    $scope.thisTrip = Trips.accessTrip(path);
  }
  $scope.getTrip();

  //sends user edits to the Trips factory
  $scope.editTrip = function() {
    Trips.addDetails($scope.thisTrip)
      .then($scope.getTrip());
  }

})
