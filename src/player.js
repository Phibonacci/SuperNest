// SuperNest - player
'use strict'

class Player {
    static preload(scene) {
        scene.load.spritesheet('bird', 'assets/bird-sheet.png', { frameWidth: 64, frameHeight: 64 })
        scene.load.audio('hit', 'assets/hit.wav')
    }

    constructor(scene) {
        this.scene = scene
        this.sprite = scene.physics.add.sprite(0, -400, 'bird')
        this.carriedItemSprite = scene.physics.add.sprite(0, 0, 'apple')
        this.carriedItemSprite.visible = false
        this.carriedItem = null
        this.slowTimer = 0
        this.speedModifier = 1

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

    impact() {
        if (this.slowTimer <= 0) {
            this.sprite.tint = 0xc05050
            this.slowTimer = 3000
            this.speedModifier = 0.4
            this.scene.sound.play('hit')
        }
    }

    get x() {
        return this.sprite.x
    }

    get y() {
        return this.sprite.y
    }

    update(scene, elapsed) {
        if (this.slowTimer > 0) {
            this.slowTimer -= elapsed
            if (this.slowTimer <= 0) {
                this.sprite.tint = 0xffffff
                this.speedModifier = 1
            }
        }

        const vx = Math.cos(this.sprite.rotation)
        const vy = Math.sin(this.sprite.rotation)
        this.pointerMove(scene)

        const speed = (2.7 + vy) * 170 * this.speedModifier
        Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation(this.sprite.rotation, speed, this.sprite.body.velocity)
        this.sprite.flipY = !(Math.abs(this.sprite.rotation) < Math.PI / 2)
        if (this.sprite.y > 0) {
            this.sprite.y = 0
        }
        this.carriedItemSprite.x = this.sprite.x + vx * 45;
        this.carriedItemSprite.y = this.sprite.y + vy * 45;
        this.carriedItemSprite.rotation = this.sprite.rotation
        this.carriedItemSprite.flipY = this.sprite.flipY
    }

    isCarryingItem() {
        return !!this.carriedItem
    }

    takeItem(item) {
        console.log(`[Player] Taking item ${item.type}`)
        this.carriedItemSprite.visible = true
        this.carriedItemSprite.setTexture(item.type)
        this.carriedItem = item
        this.carriedItem.hide()
    }

    dropItem() {
        if (!this.carriedItem) {
            return
        }
        const item = this.carriedItem
        console.log(`[Player] Dropping item ${item.type}`)
        this.carriedItem = null
        this.carriedItemSprite.visible = false
        item.show()
        return item
    }

    deleteItem() {
        console.log(`[Player] Deleting item ${this.carriedItem.type}`)
        this.carriedItem.destroy()
        this.carriedItem = null
        this.carriedItemSprite.visible = false
    }
}
