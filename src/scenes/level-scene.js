// SuperNest - level scene
'use strict'

const NESTLING_COUNT = 5

class LevelScene extends Phaser.Scene {
    constructor() {
        super('Level')
        window.level = this
    }

    preload() {
        console.log('[Level] Preloading')
        Background.preload(this)
        Nestling.preload(this)
        Player.preload(this)
        Food.preload(this)
    }

    create() {
        console.log('[Level] Creating')
        this.player = new Player(this)
        this.cameras.main.zoom = 1.5
        this.cameras.main.startFollow(this.player.sprite, false, 0.225, 0.225)
        this.cameras.main.setBounds(-50000, -50000, 100000, 50000)
        this.background = new Background(this)
        this.initializeNestlings()
        this.initializeFood()
        this.input.on('pointerdown', () => this.onPointerDown())
        this.input.on('pointerup', () => this.onPointerUp())
        this.scene.launch('HUD')
    }

    update(_, elapsed) {
        this.player.update(this)
        for (const nestling of this.nestlings) {
            nestling.update(elapsed)
        }
        this.fallingFoods.forEach(food => {
            food.update(elapsed)
            if (!food.isFalling) {
                this.staticFoods.push(food)
                this.fallingFoods.splice(this.fallingFoods.indexOf(food), 1)
            }
        })
        this.background.update(this)
    }

    initializeNestlings() {
        this.nestlings = []
        for (let i = 0; i < NESTLING_COUNT; ++i) {
            this.addNestling()
        }
    }

    addNestling() {
        const nestling = new Nestling(this, this.nestlings.length)
        this.nestlings.push(nestling)
        this.physics.add.overlap(this.player.carriedItemSprite, nestling.sprite, () => this.giveFood(nestling), null, null)
    }

    initializeFood() {
        this.staticFoods = [];
        this.fallingFoods = [];
        for (let i = 0; i < 100; ++i) {
            this.addFood();
        }
    }

    addFood() {
        const food = new Food(this)
        this.staticFoods.push(food)
        this.physics.add.overlap(this.player.sprite, food.sprite, () => this.collectItem(food), null, null)
        for (const nestling of this.nestlings) {
            this.physics.add.overlap(nestling.sprite, food.sprite, () => this.eatFallingFood(nestling, food), null, null)
        }
    }

    collectItem(food) {
        if (!this.isPointerDown || this.player.isCarryingItem()) {
            return
        }
        let index = this.staticFoods.indexOf(food)
        if (index >= 0) {
            this.staticFoods.splice(index, 1)
            this.player.takeItem(food)
            return
        }
        index = this.fallingFoods.indexOf(food)
        if (index >= 0) {
            this.fallingFoods.splice(index, 1)
            this.player.takeItem(food)
        }
    }

    giveFood(nestling) {
        if (nestling.isDead || !this.player.isCarryingItem()) {
            return
        }
        if (this.player.carriedItem.type !== nestling.requestedFood) {
            return
        }
        nestling.fillStomach()
        this.player.deleteItem()
    }

    eatFallingFood(nestling, food) {
        if (nestling.isDead) {
            return
        }
        if (food.type !== nestling.requestedFood) {
            return
        }
        nestling.fillStomach()
        let index = this.fallingFoods.indexOf(food)
        if (index >= 0) {
            this.fallingFoods.splice(index, 1)
        }
        food.destroy()
    }

    onPointerDown() {
        this.isPointerDown = true;
    }

    onPointerUp() {
        this.isPointerDown = false;
        this.dropItem()
    }

    dropItem() {
        if (!this.player.isCarryingItem()) {
            return
        }
        let item = this.player.dropItem()
        this.fallingFoods.push(item)
        item.sprite.x = this.player.carriedItemSprite.x
        item.sprite.y = this.player.carriedItemSprite.y
        console.log(`Dropped item at ${item.sprite.x}, ${item.sprite.y}`)
    }
}
