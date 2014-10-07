angular.module('app')
.config(function ($routeProvider) {
  $routeProvider
  .when('/',         { controller: 'PostsCtrl', templateUrl: '/templates/posts.html' })
  .when('/register', { controller: 'RegisterCtrl', templateUrl: '/templates/register.html' })
  .when('/login',    { controller: 'LoginCtrl', templateUrl: '/templates/login.html' })
})
