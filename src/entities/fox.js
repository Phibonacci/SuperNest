// SuperNest - fox entity
'use strict'

class Fox {
    static preload(scene) {
        scene.load.spritesheet('fox', 'assets/fox-sheet.png', { frameWidth: 64, frameHeight: 38 })

    }

    constructor(scene) {
        scene.anims.create({
            key: 'run',
            frames: scene.anims.generateFrameNumbers('fox', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.sprite = scene.physics.add.sprite(0, -64, 'fox')
        this.sprite.anims.play('run', true)
    }

    update(scene, player) {
        if (this.x < player.x + 10 ) {
            this.setVelocityX(150)
        } else if (this.x > player.x + 10) {
            this.setVelocityX(-150)
        }

    }
}
