angular.module('app')
.service('UserSvc', function ($http, $rootScope) {
  var svc = this
  svc.getUser = function () {
    return $http.get('/api/users')
  }
  svc.login = function (username, password) {
    return $http.post('/api/sessions', {
      username: username, password: password
    }).then(function (response) {
      svc.token = response.data
      $http.defaults.headers.common['X-Auth'] = response.data
      return svc.getUser()
    }).then(function (response) {
      $rootScope.$broadcast('login', response.data)
      return response.data
    })
  }
})
