angular.module('app')
.controller('LoginCtrl', function ($scope, $location, UserSvc) {
  $scope.login = function (user) {
    UserSvc.login(user)
    .then(function() {
      $location.path('/')
    })
  }
})
