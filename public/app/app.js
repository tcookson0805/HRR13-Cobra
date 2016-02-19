angular.module('tp', [
    'app.services',
    'ui.router',
    'app.my-trip',
    'app.new-trip',
    'app.trips',
    'ngMaterial'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');
    // Now set up the states
    $stateProvider
      .state('trips', {
        url: '/trips',
        templateUrl: 'app/trips/trips.html',
        controller: 'tripsController'
      })
      .state('new-trip', {
        url: '/new-trip',
        templateUrl: 'app/new-trip/new-trip.html',
        controller: 'new-tripController'
      })
      .state('my-trip', {
        url: '/my-trip',
        templateUrl: 'app/my-trip/my-trip.html',
        controller: 'my-tripController'
      });
  });
