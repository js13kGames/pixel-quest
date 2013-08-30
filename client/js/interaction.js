window.PixelQuest.Interaction = (function() {
  var Interaction = function(player) {
    this.player        = player
    this.movementDelta = 5
    this.activeKeys    = []
  }

  Interaction.prototype.bindKeyboardToPlayer = function() {
    var self = this

    document.onkeydown = function(e) {
      e = e || window.event

      var keyCode = e.which || e.keyCode

      if (self.activeKeys.indexOf(keyCode) === -1) {
        self.activeKeys.push(keyCode)
      }
    }

    document.onkeyup = function(e) {
      e = e || window.event

      var keyCode = e.which || e.keyCode
        , index   = self.activeKeys.indexOf(keyCode)

      if (index !== -1) {
        self.activeKeys.splice(index, 1)
      }
    }

    window.setInterval(function() {
      setPlayerPosition.call(self)
    }, this.player.options.movementDelay)
  }

  // private

  var setPlayerPosition = function(keyCode) {
    var self = this

    this.activeKeys.forEach(function(key) {
      switch (key) {
        case 32:
          self.player.attack()
          break
        case 37:
          self.player.move('left')
          break
        case 38:
          self.player.move('up')
          break
        case 39:
          self.player.move('right')
          break
        case 40:
          self.player.move('down')
          break
      }
    })
  }

  return Interaction
})()
