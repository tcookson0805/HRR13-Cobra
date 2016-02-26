angular.module('app.trips', [])

.controller('tripsController', function($scope, Trips, $routeParams, Auth) {
  $scope.trips = {};

  $scope.map;
  $scope.geocoder = new google.maps.Geocoder();
  $scope.destination;
  var coordinates = {};

  $scope.tripID = {
    id: $routeParams.id
  };

  $scope.showTrips = function(user) {
    Trips.allTrips(user)
      .then(function(data) {
        $scope.trips = data;
      });
  };


  var createContent = function(info) {
    var string = '';
    if (info.POI.length > 0) {
      info.POI.forEach(function(point) {

        string += '<strong>' + (point.title? point.title: '') + ':</strong> ' + (point.details? point.details: '') + '<br>';
      });
    }
    return string;
  };

var createMarker = function (info) {
    $scope.destination = info.destination;
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: info.coordinates,
      destination: info.destination,
      animation: google.maps.Animation.DROP,
    });
    marker.addListener('dblclick', function() {
      var deleteCheck = confirm('are you sure you want to delete?');
      if (deleteCheck){
        Trips.removeTrip(info);
        marker.setMap(null);
        $scope.showTrips();
      }

    });
    var infowindow = new google.maps.InfoWindow({
       content: '<a href="http://localhost:3000/#/my-trip/'+info._id+'">'+info.destination+'</a><br>' + 
       createContent(info),
     });
    marker.addListener('click', function(){
      infowindow.open(marker.get('map'), marker);
    });
  };

  $scope.showTripsOnMap = function(user) {
    Trips.allTrips(user)
      .then(function(data) {
        $scope.trips = data;
        data.forEach(function(trip) {
          if(trip.coordinates) createMarker(trip);
      });
    });
  };

  $scope.showTripsOnMap(Trips.user);

    var mapOptions = {

    // start in USA
    center: new google.maps.LatLng(37.09024, -95.712891),
    zoom: 5
  };

  // create map 
  $scope.map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);


  $scope.signout = function() {
    Auth.signout();
  };

});


