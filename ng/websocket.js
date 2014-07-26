angular.module('app')
.run(function ($window, $rootScope) {
  var connection = new $window.WebSocket('ws://localhost:3000')

  connection.onopen = function (e) {
    console.log('WebSocket opened')
    $rootScope.$broadcast('websocket_open', e)
  }

  connection.onclose = function (e) {
    console.log('WebSocket closed')
    $rootScope.$broadcast('websocket_close', e)
  }

  connection.onmessage = function (e) {
    console.log('WebSocket message:', e)
    var payload = JSON.parse(e.data)
    $rootScope.$broadcast(payload.topic, payload.data)
  }
})
