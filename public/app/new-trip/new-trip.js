angular.module('app.new-trip', [])

.controller('new-tripController', function($scope, $location, $window, $route, Trips) {

  $scope.trip = {};

  // $scope.getTripData = function(destination, startDate){
  //   Trips.newTrip(destination, startDate)
  //     .then(function(response){
  //       $scope.trip = response;
  //       console.log($scope.trip)
  //     })
  // }



  $scope.createTrip = function(destination, startDate) {
  	// console.log($window.localStorage.getItem('com.tp'));
    Trips.newTrip(destination, startDate)
      .then(function(response) {
      	var tripID = response.data;
      	$location.path('/my-trip/' + tripID);
        $route.reload();
      });
      // 	console.log('response from node',response);
      //   $location.path('/my-trip/' + response.data);
      // });

      // .then(function() {
      //   var id = $scope.trip.data._id
      //   console.log(id);
      // // 	var tripID = response.data.trips.pop()._id;
      // //   console.log(tripID);
		    // // $location.path('/#/my-trip/' + tripID);
      // })
  };

});
