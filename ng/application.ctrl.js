angular.module('app')
.controller('ApplicationCtrl', function ($scope) {
  $scope.$on('login', function (_, user) {
    $scope.currentUser = user
  })
})
