var io    = require('socket.io')
  , World = require('./world.js')

var WebSocket = module.exports = function(server) {
  this.server  = server
  this.io      = null
  this.sockets = {}
  this.world   = new World()
}

WebSocket.prototype.listen = function() {
  var self = this

  this.io = io.listen(this.server.httpServer)

  this.io.set('log level', 1);

  this.io.sockets.on('connection', function (socket) {
    self.observeEvents(socket)
  })

  setInterval(function() {
    self.syncWorld()
  }, 10)
}

WebSocket.prototype.observeEvents = function(socket) {
  var self = this

  this.events = {
    'player#update': function(data) {
      if (this.world.getPlayer(data.id)) {
        this.world.setPlayer(data.id, data)
      }
    },

    'disconnect': function() {
      // console.log('Player', socket.playerId, 'just quit the game.')
      if (this.world.getPlayer(socket.playerId)) {
        this.world.updatePlayer(socket.playerId, {
          online:       false,
          offlineSince: +new Date()
        })
      }
    },

    'player#join': function(data) {
      socket.playerId       = data.id
      this.sockets[data.id] = socket

      if (!this.world.getPlayer(data.id)) {
        this.world.createPlayer(data.id)
      }

      this.world.updatePlayer(data.id, {
        online:       true,
        offlineSince: null,
        id:           data.id
      })

      socket.emit('player#joined', this.world.getPlayer(data.id))
    }
  }

  Object.keys(this.events).forEach(function(eventName) {
    socket.on(eventName, function() {
      // console.log('Received event', eventName, 'with the following arguments', arguments)
      self.events[eventName].apply(self, arguments)
    })
  })
}


WebSocket.prototype.syncWorld = function() {
  var self = this

  Object.keys(this.sockets).forEach(function(playerIdOfSocket) {
    var socket = self.sockets[playerIdOfSocket]
      , data   = self.world.getSyncData(playerIdOfSocket)

    // console.log('Emitting world#sync with the following arguments', players)

    Object.keys(data).forEach(function(klass) {
      socket.emit('world#sync', klass, data[klass])
    })
  })
}
