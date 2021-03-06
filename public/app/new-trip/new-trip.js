
angular.module('app.new-trip', [])

.controller('new-tripController', function($scope, $location, $window, Trips, Auth) {
  $(document).ready(function(){
    $('#locationForm').keypress(function(event) {
      if (event.keyCode === 13 ) {
        console.log('preventing');
        event.preventDefault();
      }
    })
  });

  $scope.signout = function() {
    Auth.signout();
  };

  $scope.map;
  $scope.geocoder = new google.maps.Geocoder();
  $scope.destination;
  $scope.marker = null;
  var coordinates = {};

  var createMarker = function(info) {
    if ($scope.marker) { $scope.marker.setMap(null); }
    $scope.destination = info.destination;

    var marker = new google.maps.Marker({
      map: $scope.map,
      position: info.coordinates,
      destination: info.destination,
      animation: google.maps.Animation.DROP,
    });

    $scope.marker = marker;


    var infowindow = new google.maps.InfoWindow({
      content: info.destination
    });
    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    })
    //uses jQuerey to set the value of the destination in the box
    document.getElementById("destination").value = $scope.destination;
    $('#destination').scope().$apply();

    marker.addListener('dragend', function(){
      document.getElementById("destination").value = $scope.destination;
      $('#destination').scope().$apply();
    })
  };

  var mapOptions = {
    // start in USA
    center: new google.maps.LatLng(37.09024, -95.712891),
    zoom: 5
  };

  // create map
  $scope.map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

  


  ////////////////// STOP STOP STOP STOP STOP ///////////////////////////
  ////////////////// STOP STOP STOP STOP STOP ///////////////////////////
  ////////////////// STOP STOP STOP STOP STOP ///////////////////////////
  


  var input = (document.getElementById('destination'));
  //$scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', $scope.map);

  var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: $scope.map,
          anchorPoint: new google.maps.Point(0, -29)
        });

  autocomplete.addListener('place_changed', function() {
    if ($scope.marker) { $scope.marker.setMap(null); }
    infowindow.close();
    marker.setVisible(false);

    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      $scope.map.fitBounds(place.geometry.viewport);
    } else {
      $scope.map.setCenter(place.geometry.location);
      $scope.map.setZoom(17);  // Why 17? Because it looks good.
    }

    var info = {
      _id: null,
      coordinates: {},
      destination: null,
      googledata: null,
      googleplace: place,
      POI: [],
    };

    info.coordinates.lat = place.geometry.location.lat();
    info.coordinates.lng = place.geometry.location.lng();
    info.destination = place.formatted_address;
    createMarker(info);
    $scope.info = info;
    $scope.destinaiton = info.destination;    
  });

  ////////////////// STOP STOP STOP STOP STOP ///////////////////////////
  ////////////////// STOP STOP STOP STOP STOP ///////////////////////////
  ////////////////// STOP STOP STOP STOP STOP ///////////////////////////


  // listens for a click and renders a marker and returns corresponding address
  $scope.map.addListener('click', function(e) {
    var info = {
      _id: null,
      coordinates: null,
      destination: null,
      googledata: null,
      googleplace: null,
      POI: [],
    };

    $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + e.latLng.lat() + "," + e.latLng.lng() + "&key=AIzaSyCXPMP0KsMOdfwehnmOUwu-W3VOK92CkwI", function(data) {
      if (data.status === 'ZERO_RESULTS'){
        alert('please click on land!');
      }else{
        info.coordinates = data.results[0].geometry.location;
        info.destination = data.results[1].formatted_address;
        info.googledata = data;
        createMarker(info);
        $scope.info = info;
        $scope.destinaiton = info.destination;
      }

      console.log(info);
      // @Date.now as a placeholder since server requires dates
    });
  });

  $scope.geocodeAddress = function() {
    $scope.geocoder.geocode({
        'address': $scope.destination
      },
      function(results, status) {
        var tempInfo;

        // TODO: remove redundant code with add event listener
        if (status === google.maps.GeocoderStatus.OK) {
          $scope.map.setCenter(results[0].geometry.location);
          tempInfo = {
            destination: results[0].formatted_address,
            coordinates: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            },
            POI: [],
          }
          $scope.destination = results[0].formatted_address;
          Trips.newTrip(tempInfo.destination, $scope.startDate, tempInfo.coordinates, function(data) {
            tempInfo._id = data;
            createMarker(tempInfo);
          })
          $scope.map.setZoom(6);
          $scope.map.panTo(tempInfo.position)
        } else {
          console.log('error')
        }
      });
  };

  $scope.createTrip = function() {
    Trips.newTrip($scope.info.destination, $scope.startDate, $scope.info.coordinates)
      .then(function(response) {
        $location.path('/my-trip/' + response);
      });
  };

  $scope.submitForm = function() {
    Trips.newTrip($scope.info.destination, $scope.startDate, $scope.info.coordinates, function(id) {
      console.log(id);
      $scope.info._id = id;
    });
    //$scope.geocodeAddress();
    $location.path('/trips/' + $scope.info._id);
  };

});