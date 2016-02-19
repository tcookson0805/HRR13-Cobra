angular.module('app.new-trip', ['ngMaterial', 'ngMessages'])

.controller('new-tripController', function($scope, $location) {

  $scope.createTrip = function(location, startDate) {
    Trips.newTrip(location, startDate)
      .then(function(data) {
        $location.path('/my-trip/asdasdasaasadasdadsadasdasdasd')
      })
  };

  $scope.myDate = new Date();
  $scope.minDate = new Date(
    $scope.myDate.getFullYear(),
    $scope.myDate.getMonth() - 2,
    $scope.myDate.getDate());
  $scope.maxDate = new Date(
    $scope.myDate.getFullYear(),
    $scope.myDate.getMonth() + 2,
    $scope.myDate.getDate());
  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  }
});
