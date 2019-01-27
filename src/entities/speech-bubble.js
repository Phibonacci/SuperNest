// SuperNest - speech bubble entity
'use strict'

class SpeechBubble {
    static preload(scene) {
        scene.load.image('speech-bubble', 'assets/speech-bubble.png')
        scene.load.image('danger-bubble', 'assets/danger-bubble.png')
    }

    constructor(scene, nestling, x, y) {
        this.parent = parent
        this.nestling = nestling
        this.speechBubble = scene.add.sprite(x + 30, y - 50, 'speech-bubble')
        this.speechBubble.depth = 10
        this.speechBubble.visible = false
        this.dangerBubble = scene.add.sprite(this.speechBubble.x, this.speechBubble.y, 'danger-bubble')
        this.dangerBubble.depth = 11
        this.dangerBubble.visible = false
        this.foodSprite = scene.add.sprite(this.speechBubble.x, this.speechBubble.y - 5, 'apple')
        this.foodSprite.depth = 12
        this.foodSprite.visible = false
        this.currentFood = null
    }

    update() {
        this.speechBubble.visible = !!this.nestling.requestedFood
        this.dangerBubble.visible = this.speechBubble.visible || this.nestling.isDead
        this.foodSprite.visible = this.speechBubble.visible || this.dangerBubble.visible
        if (!this.nestling.isDead) {
            const elapsedPercent = this.nestling.hunger / this.nestling.starvationTime
            this.dangerBubble.setCrop(0, elapsedPercent * 48, 48, 48 - elapsedPercent * 48)
        }
        const foodType = this.nestling.isDead ? 'egg' : this.nestling.requestedFood;
        if (foodType && foodType != this.currentFood) {
            this.currentFood = foodType
            this.foodSprite.setTexture(foodType);
        }
    }
}
