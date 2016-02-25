// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('app.auth', [])

.controller('AuthController', function($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function() {
    Auth.signin($scope.user)
      .then(function(data) {
        if (data.token) {
          $window.localStorage.setItem('com.tp', data.token);
          $window.localStorage.setItem('com.tp.user', data.id);
          $location.path('/trips');
        } else {
          //we'll want to handle this better
          alert('username or password incorrect.');
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.signup = function() {
    Auth.signup($scope.user)
      .then(function(data) {
        $window.localStorage.setItem('com.tp', data.token);
        $window.localStorage.setItem('com.tp.user', data.id);
        $location.path('/trips');
      })
      .catch(function(error) {
        console.error('catch error', error);
      });
  };

  $scope.signout = function() {
    Auth.signout();
  };
});
