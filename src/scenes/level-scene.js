// SuperNest - level scene
'use strict'

class LevelScene extends Phaser.Scene {
    constructor() {
        super('Level')
        window.level = this
    }

    preload() {
        console.log('[Level] Preloading')
        this.load.image('nestling', 'assets/nestling.png')
        this.load.image('nestling-dead', 'assets/nestling-dead.png')
        this.load.image('speech-bubble', 'assets/speech-bubble.png')
        this.load.image('apple', 'assets/apple.png')
        this.load.spritesheet('bird', 'assets/bird-sheet.png', { frameWidth: 32, frameHeight: 32 })
    }

    create() {
        console.log('[Level] Creating')
        this.player = new Player(this)
        this.nestlings = []
        this.addNestling()
        this.addNestling()
        this.addNestling()
        this.cameras.main.zoom = 1.5
    }

    update(timestamp, elapsed) {
        this.player.update(this)
        for (const nestling of this.nestlings) {
            nestling.update(timestamp, elapsed)
        }
        this.cameras.main.centerOn(this.player.x, this.player.y)
    }

    addNestling() {
        this.nestlings.push(new Nestling(this, this.nestlings.length))
    }
}
