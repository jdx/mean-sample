angular.module('app')
.service('WebSocketSvc', function ($window, $rootScope, $timeout) {
  var svc = this
  this._websocketHost = function () {
    if ($window.location.protocol === "https:") {
      return "wss://" + $window.location.host
    } else {
      return "ws://" + $window.location.host
    }
  }
  this.connect = function () {
    var connection = new $window.WebSocket(svc._websocketHost())

    connection.onopen = function (e) {
      console.log('WebSocket opened')
      $rootScope.$broadcast('ws:open', e)
    }

    connection.onclose = function (e) {
      console.log('WebSocket closed. Reconnecting...')
      $rootScope.$broadcast('ws:close', e)
      $timeout(svc.connect, 10*1000)
    }

    connection.onmessage = function (e) {
      var payload = JSON.parse(e.data)
      $rootScope.$broadcast('ws:' + payload.topic, payload.data)
    }
  }
})
.run(function (WebSocketSvc) {
  WebSocketSvc.connect()
})
