// SuperNest - food entity
'use strict'

class Food {
    static preload(scene) {
        scene.load.image('apple', 'assets/apple.png')
    }

    constructor(scene) {
        this.scene = scene
        this.type = 'apple'
        let x = Phaser.Math.Between(-100, 100) * 50 + Phaser.Math.Between(-10, 10)
        let y = 0
        this.sprite = scene.physics.add.sprite(x, y, this.type)
        this.sprite.depth = -10;
    }

    show() {
        this.sprite.visible = true
    }

    hide() {
        this.sprite.visible = false
    }

    destroy() {
        console.log(`Destroying food ${this.type}`)
        this.sprite.destroy()
    }
}
