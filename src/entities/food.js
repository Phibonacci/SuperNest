// SuperNest - food entity
'use strict'

class Food {
    constructor(scene) {
        this.scene = scene
        let x = Phaser.Math.Between(-100, 100) * 50
        let y = 570
        this.sprite = scene.add.sprite(x, y, 'apple')
        this.sprite.depth = -10;
    }
}
