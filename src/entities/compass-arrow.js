// SuperNest - compass entity
'use strict'

class CompassArrow {
    static preload(scene) {
        scene.load.image('compass', 'assets/compass-arrow.png')
    }

    constructor(scene) {
        this.scene = scene
        this.sprite = scene.add.sprite(0, 0, 'compass')
        this.sprite.setScrollFactor(0, 0)
    }

    update(playerX, playerY) {
        const orientation = Math.atan2(-playerX, playerY + 1250)
        this.sprite.rotation = orientation
        const vx = Math.cos(orientation)
        const vy = Math.sin(orientation)
        if (Math.abs(vx) > Math.abs(vy)) {
            this.sprite.x = 512 + 512 * vy
            if (vx > 0) {
                // top side
                this.sprite.y = 32
            } else {
                // bottom side
                this.sprite.y = 600 - 32
            }
        } else {
            this.sprite.y = 300 + 300 * -vx
            if (vy > 0) {
                // right side
                this.sprite.x = 1024 - 32
            } else {
                // left side
                this.sprite.x = 32
            }
        }
    }
}
