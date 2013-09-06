window.PixelQuest.Game = (function() {
  "use strict"

  var Game = function() {
    this.canvas  = document.querySelector("canvas")
    this.ctx     = this.canvas.getContext('2d')
    this.objects = {}
  }

  Game.prototype.render = function() {
    var self = this

    this.setSize()
    this.ctx.fillStyle = "#FFE9DA"
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    Object.keys(this.objects).forEach(function(objectId) {
      self.objects[objectId].render(self.ctx)
    })
  }

  Game.prototype.setSize = function() {
    this.canvas.width  = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  Game.prototype.addObject = function(object) {
    this.objects[object.id] = object
  }

  Game.prototype.getObject = function(id) {
    return this.objects[id]
  }

  Game.prototype.removeObject = function(object) {
    delete this.objects[object.id]
  }

  return Game
})()
