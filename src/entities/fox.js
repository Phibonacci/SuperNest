// SuperNest - fox entity
'use strict'

class Fox {
    static preload(scene) {
        scene.load.spritesheet('fox', 'assets/fox-sheet.png', { frameWidth: 64, frameHeight: 38 })
    }

    constructor(scene, player) {
        this.scene = scene
        this.player = player
        scene.anims.create({
            key: 'run',
            frames: scene.anims.generateFrameNumbers('fox', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.sprite = scene.physics.add.sprite(0, -38, 'fox')
        this.sprite.anims.play('run', true)
        scene.physics.add.overlap(player.sprite, this.sprite, this.touchBird, null, this)
    }

    touchBird(player, fox) {
        this.player.impact()
    }

    update(scene, player) {
        if (this.sprite.x + 50 < player.x) {
            this.sprite.setVelocityX(250)
            this.sprite.flipX = true
        } else if (this.sprite.x - 50 > player.x) {
            this.sprite.setVelocityX(-250)
            this.sprite.flipX = false
        }
    }
}
