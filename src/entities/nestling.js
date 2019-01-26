// SuperNest - nestling entity
'use strict'

const HUNGER_MIN_TIME = 2000;
const HUNGER_MAX_TIME = 5000;

const STARVATION_TIME = 3000;

class Nestling {
    constructor(scene, id) {
        this.id = id;
        this.scene = scene
        this.sprite = scene.add.sprite(150 + id * 75, 100, 'nestling')
        this.speechBubble = scene.add.sprite(this.sprite.x + 30, this.sprite.y - 50, 'speech_bubble')
        this.speechBubble.visible = false
        this.foodSprite = scene.add.sprite(this.speechBubble.x, this.speechBubble.y - 5, 'apple')
        this.foodSprite.visible = false
        this.isDead = false;
        this.fillStomach();
    }

    update(timestamp, elapsed) {
        if (!this.isDead) {
            this.hunger -= elapsed;
            if (this.hunger < 0) {
                if (!this.isStarving) {
                    this.askForFood();
                } else {
                    this.dieOfStarvation();
                }
            }
        }
    }

    fillStomach() {
        console.log(`[Nestling ${this.id}] Filling stomach`)
        this.isStarving = false;
        this.requestedFood = null;
        this.hunger = Phaser.Math.Between(HUNGER_MIN_TIME, HUNGER_MAX_TIME);
    }

    askForFood() {
        console.log(`[Nestling ${this.id}] Asking for food`)
        this.isStarving = true;
        this.hunger = STARVATION_TIME;
        this.requestedFood = 'apple'
        this.speechBubble.visible = true
        this.foodSprite.visible = true
    }

    dieOfStarvation() {
        console.log(`[Nestling ${this.id}] Dying of starvation`)
        this.isDead = true
        this.speechBubble.visible = false
        this.foodSprite.visible = false
        this.sprite.setTexture('nestling_dead')
    }
}
