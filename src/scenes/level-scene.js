// SuperNest - level scene
'use strict'

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
        this.background = new Background(this)
        this.player = new Player(this)
        this.cameras.main.zoom = 1.5
        this.initializeNestlings()
        this.initializeFood()
        this.input.on('pointerdown', () => this.onPointerDown())
        this.input.on('pointerup', () => this.onPointerUp())
        this.tempNestlingTimer = 0
        this.cameras.main.startFollow(this.player.sprite, false, 0.225, 0.225)
        this.cameras.main.setBounds(-50000, -50000, 100000, 50000)
    }

    update(timestamp, elapsed) {
        this.player.update(this)
        for (const nestling of this.nestlings) {
            nestling.update(timestamp, elapsed)
        }
        //this.cameras.main.centerOn(this.player.x, this.player.y)
        this.foods.forEach(food => food.update(elapsed))
        this.tempNestlingTimer += elapsed;
        if (this.tempNestlingTimer > 1400) {
            this.tempNestlingTimer = 0
            this.addNestling()
        }
        this.background.update(this)
    }

    initializeNestlings() {
        this.nestlings = []
        this.addNestling()
        this.addNestling()
        this.addNestling()
        this.addNestling()
    }

    addNestling() {
        const nestling = new Nestling(this, this.nestlings.length)
        this.nestlings.push(nestling)
        this.physics.add.overlap(this.player.carriedItemSprite, nestling.sprite, () => this.giveFood(nestling), null, null)
    }

    initializeFood() {
        this.foods = [];
        for (let i = 0; i < 100; ++i) {
            this.addFood();
        }
    }

    addFood() {
        const food = new Food(this)
        this.foods.push(food)
        this.physics.add.overlap(this.player.sprite, food.sprite, () => this.collectItem(food), null, null)
    }

    collectItem(food) {
        if (!this.isPointerDown || this.player.isCarryingItem()) {
            return
        }
        const index = this.foods.indexOf(food)
        if (index < 0) {
            return
        }
        this.foods.splice(index, 1)
        this.player.takeItem(food)
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
        this.foods.push(item)
        item.sprite.x = this.player.carriedItemSprite.x
        item.sprite.y = this.player.carriedItemSprite.y
        console.log(`Dropped item at ${item.sprite.x}, ${item.sprite.y}`)
    }
}
