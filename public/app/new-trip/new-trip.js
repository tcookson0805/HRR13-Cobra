angular.module('app.new-trip', [])

.controller('new-tripController', function($scope, $location, $window, Trips) {

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
      // 	console.log(response);
      // 	var tripID = response.data._id;
      // 	$location.path('/trips/' + tripID)
      // })
      	console.log('response from node',response);
        console.log("DATE", startDate);
        $location.path('/my-trip/' + response.data);
      });

      // .then(function() {
      //   var id = $scope.trip.data._id
      //   console.log(id);
      // // 	var tripID = response.data.trips.pop()._id;
      // //   console.log(tripID);
		    // // $location.path('/#/my-trip/' + tripID);
      // })
  };

});
