var app = angular.module('app', [])

app.controller('PostsCtrl', function ($scope, PostsSvc) {
  $scope.addPost = function () {
    if ($scope.postBody) {
      PostsSvc.create({
        username: 'dickeyxxx',
        body:     $scope.postBody
      })
      .success(function (post) {
        $scope.posts.unshift(post)
        $scope.postBody = null
      })
    }
  }

  PostsSvc.fetch()
  .success(function (posts) {
    $scope.posts = posts
  })
})

app.service('PostsSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/posts')
  }
  this.create = function (post) {
    return $http.post('/api/posts', post)
  }
})
