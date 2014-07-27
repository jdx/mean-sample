angular.module('app')
.service('UserSvc', function ($http, $rootScope, $window) {
  var svc = this
  svc.getUser = function () {
    return $http.get('/api/users')
  }
  svc.register = function (user) {
    return $http.post('/api/users', user)
    .then(function () {
      return svc.login(user)
    })
  }
  svc.login = function (user) {
    return $http.post('/api/sessions', user)
    .then(function (response) {
      $window.localStorage.socialToken = response.data
      $http.defaults.headers.common['X-Auth'] = response.data
      return svc.getUser()
    }).then(function (response) {
      $rootScope.$broadcast('login', response.data)
      return response.data
    })
  }
  svc.logout = function () {
    delete $window.localStorage.socialToken
    delete $http.defaults.headers.common['X-Auth']
    $rootScope.$broadcast('logout')
  }
})
