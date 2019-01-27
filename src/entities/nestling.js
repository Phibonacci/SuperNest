// SuperNest - nestling entity
'use strict'

const HUNGER_MIN_TIME = 1000
const HUNGER_MAX_TIME = 10000
const STARVATION_MIN_TIME = 15000
const STARVATION_MAX_TIME = 30000

class Nestling {
    static preload(scene) {
        scene.load.image('nestling', 'assets/nestling.png')
        scene.load.image('nestling-dead', 'assets/nestling-dead.png')
        scene.load.image('speech-bubble', 'assets/speech-bubble.png')
        scene.load.image('danger-bubble', 'assets/danger-bubble.png')
    }

    constructor(scene, id) {
        this.id = id
        this.scene = scene
        this.sprite = scene.physics.add.sprite(id * 75, -1250, 'nestling')
        this.sprite.depth = -10
        this.speechBubble = scene.add.sprite(this.sprite.x + 30, this.sprite.y - 50, 'speech-bubble')
        this.speechBubble.depth = 10
        this.dangerBubble = scene.add.sprite(this.sprite.x + 30, this.sprite.y - 50, 'danger-bubble')
        this.dangerBubble.depth = 11
        this.foodSprite = scene.add.sprite(this.speechBubble.x, this.speechBubble.y - 5, 'apple')
        this.foodSprite.depth = 12
        this.isDead = false
        this.fillStomach()
    }

    update(elapsed) {
        if (!this.isDead) {
            const elapsedPercent = this.hunger / this.starvationTime;
            this.dangerBubble.setCrop(0, elapsedPercent * 48, 48, 48 - elapsedPercent * 48)
            this.hunger -= elapsed
            if (this.hunger < 0) {
                if (!this.isStarving) {
                    this.askForFood()
                } else {
                    this.dieOfStarvation()
                }
            }
        }
    }

    fillStomach() {
        console.log(`[Nestling ${this.id}] Filling stomach`)
        this.isStarving = false
        this.requestedFood = null
        this.speechBubble.visible = false
        this.dangerBubble.visible = false
        this.foodSprite.visible = false
        this.hunger = Phaser.Math.Between(HUNGER_MIN_TIME, HUNGER_MAX_TIME)
    }

    askForFood() {
        console.log(`[Nestling ${this.id}] Asking for food`)
        this.isStarving = true;
        this.starvationTime = Phaser.Math.Between(STARVATION_MIN_TIME, STARVATION_MAX_TIME)
        this.hunger = this.starvationTime
        this.requestedFood = FRUITS[Phaser.Math.Between(0, FRUITS.length - 1)]
        this.speechBubble.visible = true
        this.dangerBubble.visible = true
        this.foodSprite.setTexture(this.requestedFood)
        this.foodSprite.visible = true
    }

    dieOfStarvation() {
        console.log(`[Nestling ${this.id}] Dying of starvation`)
        this.isDead = true
        this.speechBubble.visible = false
        this.dangerBubble.visible = false
        this.foodSprite.visible = false
        this.sprite.setTexture('nestling-dead')
    }
}
