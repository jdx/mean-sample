angular.module('app')
.controller('PostsCtrl', function ($scope, PostsSvc) {
  $scope.addPost = function () {
    if ($scope.postBody) {
      PostsSvc.create({
        username: 'dickeyxxx',
        body:     $scope.postBody
      })
      .success(function () {
        $scope.postBody = null
      })
    }
  }

  $scope.$on('ws:new_post', function (_, post) {
    $scope.$apply(function () {
      $scope.posts.unshift(post)
    })
  })

  PostsSvc.fetch()
  .success(function (posts) {
    $scope.posts = posts
  })
})
