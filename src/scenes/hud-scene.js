// SuperNest - hud scene
'use strict'

class HudScene extends Phaser.Scene {
    constructor() {
        super('HUD')
        window.level = this
    }

    preload() {
        console.log('[HUD] Preloading')
        CompassArrow.preload(this)
    }

    create() {
        console.log('[HUD] Creating')
        this.player = game.scene.getScene('Level').player
        this.compass = new CompassArrow(this)
    }

    update(_timestamp, _elapsed) {
        this.compass.update(this.player.x, this.player.y)
    }
}
