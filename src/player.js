// SuperNest - player
'use strict'

const SPEED = 100;

class Player {
    constructor(scene) {
        this.sprite = scene.physics.add.sprite(100, 450, 'bird').setVelocity(SPEED, 0)
        this.direction = { x: 0, y: 0 }
        this.velocity = 0
        this.animationStarted = false

        scene.anims.create({
            key: 'fly',
            frames: scene.anims.generateFrameNumbers('bird', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1,
        })
        this.sprite.anims.play('fly', true)
    }

    pointerMove() {
        const ROTATION_SPEED = Math.PI // 90 deg/s
        const ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED)
        const TOLERANCE = 0.01 * ROTATION_SPEED

        const angleToPointer = Phaser.Math.Angle.BetweenPoints(this.sprite, game.input.activePointer)
        const anglePointerRotation = angleToPointer - this.sprite.rotation
        const angleDelta = Math.atan2(Math.sin(anglePointerRotation), Math.cos(anglePointerRotation))
        if (Phaser.Math.Within(angleDelta, 0, TOLERANCE)) {
            this.sprite.rotation = angleToPointer
            this.sprite.setAngularVelocity(0)
        } else {
            this.sprite.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES)
        }
    }

    update() {
        this.pointerMove()
        Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation(this.sprite.rotation, SPEED, this.sprite.body.velocity)
    }
}
