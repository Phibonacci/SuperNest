// SuperNest - level scene
'use strict'

const NESTLING_COUNT = 5
const GAME_OVER_FADEOUT = 3000

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

        this.music = this.sound.add('river-nymphs')
        this.music.play({ loop: true })

        this.gameOverStarted = false
        this.gameOverTimer = 0
    }

    update(_, elapsed) {
        this.player.update(this)
        let aliveNestlings = 0
        for (const nestling of this.nestlings) {
            nestling.update(elapsed)
            if (!nestling.isDead) {
                aliveNestlings += 1
            }
        }
        this.fallingFoods.forEach(food => {
            food.update(elapsed)
            if (!food.isFalling) {
                this.fallingFoods.splice(this.fallingFoods.indexOf(food), 1)
                if (food.type === 'egg') {
                    food.destroy()
                } else {
                    this.staticFoods.push(food)
                }
            }
        })
        this.background.update(this)
        if (aliveNestlings == 0 && !this.gameOverStarted) {
            this.gameOver()
        }
        if (this.gameOverStarted) {
            this.gameOverTimer -= elapsed
            this.music.volume = this.gameOverTimer / GAME_OVER_FADEOUT
            if (this.gameOverTimer < 0) {
                console.log(`[Level] Game over fade done, reloading main menu`)
                this.music.stop()
                this.scene.start('MainMenu')
            }
        }
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
        this.staticFoods = []
        this.fallingFoods = []
        for (let i = 0; i < 100; ++i) {
            this.addFood()
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
        if (!this.player.isCarryingItem()) {
            return
        }
        if (nestling.isDead) {
            if (this.player.carriedItem.type !== 'egg') {
                return
            }
            nestling.revive()
        } else {
            if (this.player.carriedItem.type !== nestling.requestedFood) {
                return
            }
            nestling.fillStomach()
        }
        this.player.deleteItem()
    }

    eatFallingFood(nestling, food) {
        if (nestling.isDead) {
            if (food.type !== 'egg') {
                return
            }
            nestling.revive()
        } else {
            if (food.type !== nestling.requestedFood) {
                return
            }
            nestling.fillStomach()
        }
        let index = this.fallingFoods.indexOf(food)
        if (index >= 0) {
            this.fallingFoods.splice(index, 1)
        }
        food.destroy()
    }

    onPointerDown() {
        this.isPointerDown = true
    }

    onPointerUp() {
        this.isPointerDown = false
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

    gameOver() {
        console.log(`[Level] Game over starting`)
        this.gameOverStarted = true
        this.gameOverTimer = GAME_OVER_FADEOUT
        this.cameras.main.fade(GAME_OVER_FADEOUT, 0, 0, 0)
        this.scene.stop('HUD')
    }
}
