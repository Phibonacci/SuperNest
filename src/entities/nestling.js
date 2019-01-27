// SuperNest - nestling entity
'use strict'

const HUNGER_MIN_TIME = 3000
const HUNGER_MAX_TIME = 15000
const STARVATION_MIN_TIME = 15000
const STARVATION_MAX_TIME = 30000

const FEED_REQUIRED = 3

class Nestling {
    static preload(scene) {
        scene.load.image('nestling', 'assets/nestling.png')
        scene.load.image('nestling-dead', 'assets/nestling-dead.png')
        scene.load.image('speech-bubble', 'assets/speech-bubble.png')
        scene.load.image('danger-bubble', 'assets/danger-bubble.png')

        scene.load.audio('nestling-hungry', 'assets/nestling-hungry.wav')
        scene.load.audio('nestling-eat', 'assets/nestling-eat.wav')
        scene.load.audio('nestling-ko', 'assets/nestling-ko.wav')
        scene.load.audio('nestling-revive', 'assets/nestling-revive.wav')
    }

    constructor(scene, id) {
        this.id = id
        this.scene = scene
        this.sprite = scene.physics.add.sprite(id * 75, -1250, 'nestling')
        this.sprite.depth = -10
        this.speechBubble = new SpeechBubble(scene, this, this.sprite.x, this.sprite.y)
        this.isDead = false
        this.isFlyingAway = false
        this.fillStomach()
        this.timesFeed = 0
        this.velocity = 1.0
    }

    update(elapsed) {
        if (!this.isDead && !this.isFlyingAway) {
            this.hunger -= elapsed
            if (this.hunger < 0) {
                if (!this.isStarving) {
                    this.askForFood()
                } else {
                    this.dieOfStarvation()
                }
            }
        }
        if (this.isFlyingAway) {
            this.velocity += elapsed * 0.002
            this.sprite.y -= this.velocity * elapsed * 0.05
            this.sprite.x += this.velocity * elapsed * 0.005
        }
        this.speechBubble.update()
    }

    eatFood() {
        this.fillStomach()
        this.timesFeed += 1
        this.sprite.setScale(1.0 + this.timesFeed / 4.0)
        this.scene.sound.play('nestling-eat')
        if (this.timesFeed >= FEED_REQUIRED) {
            this.flyAway()
        }
    }

    fillStomach() {
        console.log(`[Nestling ${this.id}] Filling stomach`)
        this.isStarving = false
        this.requestedFood = null
        this.hunger = Phaser.Math.Between(HUNGER_MIN_TIME, HUNGER_MAX_TIME)
    }

    revive() {
        console.log(`[Nestling ${this.id}] Reviving`)
        this.isDead = false
        this.timesFeed = 0
        this.sprite.setTexture('nestling').setScale(1)
        this.fillStomach()
        this.scene.sound.play('nestling-revive')
    }

    askForFood() {
        console.log(`[Nestling ${this.id}] Asking for food`)
        this.isStarving = true
        this.starvationTime = Phaser.Math.Between(STARVATION_MIN_TIME, STARVATION_MAX_TIME)
        this.hunger = this.starvationTime
        this.requestedFood = FRUITS[Phaser.Math.Between(0, FRUITS.length - 1)]
        this.scene.sound.play('nestling-hungry')
    }

    dieOfStarvation() {
        console.log(`[Nestling ${this.id}] Dying of starvation`)
        this.isDead = true
        this.sprite.setTexture('nestling-dead')
        this.scene.sound.play('nestling-ko')
    }

    flyAway() {
        console.log(`[Nestling ${this.id}] Fly away`)
        this.isFlyingAway = true
        this.sprite.setTexture('bird').setScale(1)
        this.sprite.anims.play('fly', true)
    }
}
