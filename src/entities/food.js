// SuperNest - nestling entity
'use strict'

const HUNGER_MIN_TIME = 2000
const HUNGER_MAX_TIME = 5000
const STARVATION_TIME = 3000

class Food {
    constructor(scene) {
        this.id = id
        this.scene = scene
        this.sprite = scene.add.sprite(150 + id * 75, 100, 'nestling')
        this.speechBubble = scene.add.sprite(this.sprite.x + 30, this.sprite.y - 50, 'speech-bubble')
        this.speechBubble.visible = false
        this.foodSprite = scene.add.sprite(this.speechBubble.x, this.speechBubble.y - 5, 'apple')
        this.foodSprite.visible = false
        this.isDead = false
        this.fillStomach()
    }

    update(timestamp, elapsed) {
        if (!this.isDead) {
            this.hunger -= elapsed
            if (this.hunger < 0) {
                if (!this.isStarving) {
                    this.askForFood()
                } else {
                    this.dieOfStarvation()
                }
            }
        }
    }]
}
