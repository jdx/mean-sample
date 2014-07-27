angular.module('app')
.controller('NavCtrl', function ($scope, UserSvc) {
  $scope.logout = function () {
    UserSvc.logout()
  }
})
