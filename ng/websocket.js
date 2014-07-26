angular.module('app')
.run(function ($window, $rootScope, $timeout) {
  function connect() {
    var url = 'ws://localhost:3000'
    var connection = new $window.WebSocket(url)

    connection.onopen = function (e) {
      console.log('WebSocket opened')
      $rootScope.$broadcast('websocket_open', e)
    }

    connection.onclose = function (e) {
      console.log('WebSocket closed. Reconnecting...')
      $rootScope.$broadcast('websocket_close', e)
      $timeout(connect, 10*1000)
    }

    connection.onmessage = function (e) {
      console.log('WebSocket message:', e)
      var payload = JSON.parse(e.data)
      $rootScope.$broadcast(payload.topic, payload.data)
    }
  }

  connect()
})
