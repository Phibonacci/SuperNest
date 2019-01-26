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
    }

    create() {
        console.log('[Level] Creating')
        this.background = new Background(this)
        this.player = new Player(this)
        this.nestlings = []
        this.cameras.main.zoom = 1.5
        this.initializeNestlings()
        this.tempNestlingTimer = 0
        this.initializeFood();
    }

    update(timestamp, elapsed) {
        this.player.update(this)
        for (const nestling of this.nestlings) {
            nestling.update(timestamp, elapsed)
        }
        this.cameras.main.centerOn(this.player.x, this.player.y)
        this.tempNestlingTimer += elapsed;
        if (this.tempNestlingTimer > 1400) {
            this.tempNestlingTimer = 0
            this.addNestling()
        }
    }

    initializeNestlings() {
        this.nestlings = []
        this.addNestling()
    }

    addNestling() {
        this.nestlings.push(new Nestling(this, this.nestlings.length))
    }

    initializeFood() {
        this.foods = [];
        for (let i = 0; i < 30; ++i) {
            this.addFood();
        }
    }

    addFood() {
        this.foods.push(new Food(this));
    }
}
