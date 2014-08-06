angular.module('app')
.controller('PostsCtrl', function ($scope, PostsSvc) {
  $scope.addPost = function () {
    if ($scope.post.body) {
      PostsSvc.create({
        body: $scope.post.body
      }).then(function () {
        $scope.post.body = null
      })
    }
  }

  PostsSvc.fetch().then(function (posts) {
    $scope.posts = posts
  })

  $scope.$on('ws:new_post', function (_, post) {
    $scope.$apply(function () {
      $scope.posts.unshift(post)
    });
  })
})
