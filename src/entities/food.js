// SuperNest - food entity
'use strict'

const FRUITS = ['apple', 'green-apple', 'banana']

class Food {
    static preload(scene) {
        scene.load.image('apple', 'assets/apple.png')
        scene.load.image('green-apple', 'assets/green-apple.png')
        scene.load.image('banana', 'assets/banana.png')
        scene.load.image('egg', 'assets/egg.png')
    }

    constructor(scene) {
        this.scene = scene
        this.type = FRUITS[Phaser.Math.Between(0, FRUITS.length - 1)]
        if (Phaser.Math.Between(0, 10) === 0) {
            this.type = 'egg'
        }
        let x = Phaser.Math.Between(-100, 100) * 50 + Phaser.Math.Between(-10, 10)
        let y = -32
        this.sprite = scene.physics.add.sprite(x, y, this.type)
        this.sprite.depth = -10
        this.velocityY = 0
        this.isFalling = false
    }

    update(elapsed) {
        if (this.sprite.y < -32) {
            this.velocityY += elapsed * 0.001
            this.sprite.y += this.velocityY * elapsed
            this.isFalling = true
        } else {
            this.velocityY = 0
            this.sprite.y = -32
            this.isFalling = false
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
