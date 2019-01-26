// SuperNest - player
'use strict'

const SPEED = 100;

class Player {
    constructor(scene) {
        this.sprite = scene.physics.add.sprite(100, 450, 'bird').setVelocity(SPEED, 0).setScale(2)
        this.carriedItem = scene.add.sprite(0, 0, 'apple')
        this.carriedItem.visible = true

        scene.anims.create({
            key: 'fly',
            frames: scene.anims.generateFrameNumbers('bird', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1,
        })
        this.sprite.anims.play('fly', true)
        this.vector = new Phaser.Math.Vector2()
    }

    pointerMove(scene) {
        const ROTATION_SPEED = Math.PI // 180 deg/s
        const ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED)
        const TOLERANCE = 0.01 * ROTATION_SPEED

        scene.cameras.main.getWorldPoint(game.input.activePointer.x, game.input.activePointer.y, this.vector)
        const angleToPointer = Phaser.Math.Angle.BetweenPoints(this.sprite, this.vector)
        const anglePointerRotation = angleToPointer - this.sprite.rotation
        const angleDelta = Math.atan2(Math.sin(anglePointerRotation), Math.cos(anglePointerRotation))
        if (Phaser.Math.Within(angleDelta, 0, TOLERANCE)) {
            this.sprite.rotation = angleToPointer
            this.sprite.setAngularVelocity(0)
        } else {
            this.sprite.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES)
        }
    }

    get x() {
        return this.sprite.x
    }

    get y() {
        return this.sprite.y
    }

    update(scene) {
        this.pointerMove(scene)
        Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation(this.sprite.rotation, SPEED, this.sprite.body.velocity)
        this.sprite.flipY = !(Math.abs(this.sprite.rotation) < Math.PI / 2)
        const vx = Math.cos(this.sprite.rotation)
        const vy = Math.sin(this.sprite.rotation)
        this.carriedItem.x = this.sprite.x + vx * 45;
        this.carriedItem.y = this.sprite.y + vy * 45;
        this.carriedItem.rotation = this.sprite.rotation
        this.carriedItem.flipY = this.sprite.flipY
    }
}
