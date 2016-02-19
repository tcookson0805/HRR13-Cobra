angular.module('app.new-trip', [])

.controller('new-tripController', function($scope, $location){

  $scope.createTrip = function(location, startDate){
    Trips.newTrip(location, startDate)
      .then(function(data){
        $location.path('/my-trip/asdasdasaasadasdadsadasdasdasd')
      })
  };


});
