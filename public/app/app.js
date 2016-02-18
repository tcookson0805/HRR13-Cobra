angular.model('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  // Now set up the states
  $stateProvider
    .state('trips', {
      url: "/trips",
      templateUrl: "trips.html",
      controller: "tripsController"
    })
    .state('new-trip', {
      url: "new-trip",
      templateUrl: "new-trip/new-trip.html",
      controller: "new-tripController"
    })
    .state('my-trip', {
      url: "my-trip",
      templateUrl: "my-trip/my-trip.html",
      controller: "my-tripController"
    });
});
