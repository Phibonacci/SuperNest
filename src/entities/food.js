// SuperNest - food entity
'use strict'

const FRUITS = ['apple', 'green-apple', 'banana']

class Food {
    static preload(scene) {
        scene.load.image('apple', 'assets/apple.png')
        scene.load.image('green-apple', 'assets/green-apple.png')
        scene.load.image('banana', 'assets/banana.png')
    }

    constructor(scene) {
        this.scene = scene
        this.type = FRUITS[Phaser.Math.Between(0, FRUITS.length - 1)]
        let x = Phaser.Math.Between(-100, 100) * 50 + Phaser.Math.Between(-10, 10)
        let y = -16
        this.sprite = scene.physics.add.sprite(x, y, this.type)
        this.sprite.depth = -10
        this.velocityY = 0;
    }

    update(elapsed) {
        if (this.sprite.y < -16) {
            this.velocityY += elapsed * 0.001
            this.sprite.y += this.velocityY * elapsed
        } else {
            this.velocityY = 0
            this.sprite.y = -16
        }
    }

    show() {
        this.velocityY = 0
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
