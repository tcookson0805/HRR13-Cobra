angular.module('app.new-trip', [])

.controller('new-tripController', function($scope, $location){

  $scope.user= {}

  $scope.createTrip = function(location, startDate){
    Trips.newTrip(location, startDate)
      .then(function(data){
        $location.path('/my-trip')
      })
  }
  

})
