angular.module('app')
.controller('RegisterCtrl', function ($scope, $location, UserSvc) {
  $scope.register = function (user) {
    UserSvc.register(user)
    .then(function () {
      $location.path('/')
    })
  }
})
