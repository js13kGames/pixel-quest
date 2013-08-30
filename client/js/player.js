window.PixelQuest.Player = (function() {
  "use strict"

  var Player = function(id, options) {
    this.id             = id
    this.isActivePlayer = (id === window.PixelQuest.Player.getIdentifier())
    this.options        = options || {}
    this.renderOptions  = {
      colors: {
        outline: "#F2D5C0",
        face:    "#FFFFFF"
      },
      width: 21,
      height: 14,
      pixelSize: 3,
      feet: {
        direction: 'down',
        offset: 0
      }
    }
  }

  Player.getIdentifier = function() {
    var cookies = {}

    ;(document.cookie || "").split(';').forEach(function(pair) {
      var split = pair.split("=")
      if (split[0]) {
        cookies[split[0].trim()] = split[1].trim()
      }
    })

    return cookies.PixelQuestIdentifier
  }

  Player.setIdentifier = function(id) {
    document.cookie = 'PixelQuestIdentifier=' + id + '; expires=Tue, 1 Jan 2030 00:00:00 UTC; path=/'
  }

  Player.generateIdentifier = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    })
  }

  Player.prototype.render = function(ctx) {
    renderBody.call(this, ctx)
    renderArms.call(this,ctx)
    renderWeapon.call(this, ctx)
    renderHair.call(this, ctx)
    renderFeet.call(this, ctx)
  }

  Player.prototype.move = function(direction, step) {
    step = step || this.options.stepSize

    switch (direction) {
      case 'left':
        this.options.x = this.options.x - step
        break
      case 'right':
        this.options.x = this.options.x + step
        break
      case 'up':
        this.options.y = this.options.y - step
        break
      case 'down':
        this.options.y = this.options.y + step
        break
    }
  }

  Player.prototype.toJSON = function() {
    var data = this.options
    data.id = this.id
    return data
  }

  Player.prototype.update = function(data) {
    this.options = data
  }

  // private

  var renderBody = function(ctx) {
    var px = this.renderOptions.pixelSize
      , y  = this.options.y + ~~this.renderOptions.feet.offset

    ctx.fillStyle = this.renderOptions.colors.outline

    ctx.fillRect(this.options.x, y, this.renderOptions.width, this.renderOptions.height)
    ctx.fillRect(this.options.x + px, y - px, this.renderOptions.width - px * 2, px)
    ctx.fillRect(
      this.options.x + px,
      y + this.renderOptions.height,
      this.renderOptions.width - px * 2,
      px
    )

    // face
    ctx.fillStyle = this.renderOptions.colors.face
    ctx.fillRect(
      this.options.x + px,
      y,
      this.renderOptions.width - px * 2,
      this.renderOptions.height - px
    )

    // eyes
    ctx.fillStyle = this.renderOptions.colors.outline
    ctx.fillRect(this.options.x + px * 2, y + px, px, px)
    ctx.fillRect(this.options.x + this.renderOptions.width - px * 3, y + px, px, px)
  }

  var renderArms = function(ctx) {
    var px = this.renderOptions.pixelSize
      , y  = this.options.y + ~~this.renderOptions.feet.offset

    ctx.fillStyle = this.renderOptions.colors.outline

    // left
    ctx.fillRect(this.options.x - px * 2, y + px * 2, px * 2, px)
    ctx.fillRect(this.options.x - px * 2, y + px, px, px)

    // right
    ctx.fillRect(this.options.x + this.renderOptions.width, y + px * 2, px * 2, px)
    ctx.fillRect(this.options.x + this.renderOptions.width + px, y + px, px, px)
  }

  var renderFeet = function(ctx) {
    var px         = this.renderOptions.pixelSize
      , y          = this.options.y + ~~this.renderOptions.feet.offset
      , feetLength = ~~((this.renderOptions.height + px * 2) / 2)

    ctx.fillStyle = this.renderOptions.colors.outline

    ctx.fillRect(this.options.x + px * 2, y + this.renderOptions.height, px, feetLength - ~~this.renderOptions.feet.offset)
    ctx.fillRect(this.options.x + this.renderOptions.width - px * 3, y + this.renderOptions.height, px, feetLength - ~~this.renderOptions.feet.offset)

    if (this.renderOptions.feet.direction === 'up') {
      this.renderOptions.feet.offset = this.renderOptions.feet.offset + 0.25
    } else {
      this.renderOptions.feet.offset = this.renderOptions.feet.offset - 0.25
    }

    if (this.renderOptions.feet.offset >= ~~(feetLength / 2)) {
      this.renderOptions.feet.direction = 'down'
    } else if (this.renderOptions.feet.offset <= 0) {
      this.renderOptions.feet.direction = 'up'
    }
  }

  var renderHair = function(ctx) {
    var self = this
      , px   = this.renderOptions.pixelSize
      , y  = this.options.y + ~~this.renderOptions.feet.offset

    ctx.fillStyle = this.renderOptions.colors.outline

    ;([[0, 0], [-px, -px], [px, -px]]).forEach(function(pair) {
      ctx.fillRect(self.options.x + ~~((self.renderOptions.width - px) / 2) + pair[0], y - px * 2 + pair[1], px, px)
    })
  }

  var renderWeapon = function(ctx) {
    var weapon = 'sword'

    switch (weapon) {
      case 'sword':
        break
    }
  }

  return Player
})()
