// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('app.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        console.log('HELLO FROM SIGNIN');
        $window.localStorage.setItem('com.tp', token);
        console.log(token);
        $location.path('/trips');
      })
      .catch(function (error) {
        console.error(error);
        console.log('you aint signed up yet!!!!')

      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.tp', token);
        $location.path('/trips');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signout = function() {
    Auth.signout();
  };
});


// they put in username and passsword
///they hit submit
//we check localStorage object
