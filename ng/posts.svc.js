angular.module('app')
.service('PostsSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/posts')
    .then(function (response) {
      return response.data
    })
  }
  this.create = function (post) {
    return $http.post('/api/posts', post)
  }
})
