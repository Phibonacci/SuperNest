// SuperNest - level scene
'use strict'

class LevelScene extends Phaser.Scene {
    constructor() {
        super('Level')
    }

    preload() {
        console.log('[Level] Preloading')
        this.load.image('nestling', 'assets/nestling.png')
        this.load.image('nestling_dead', 'assets/nestling_dead.png')
        this.load.image('speech_bubble', 'assets/speech_bubble.png')
        this.load.image('apple', 'assets/apple.png')
        this.load.spritesheet('bird', 'assets/bird-sheet.png', { frameWidth: 32, frameHeight: 32 })
    }

    create() {
        console.log('[Level] Creating')
        this.add.text(0, 0, 'This is the game scene.', { fill: '#fff' })
        this.player = new Player(this)
        this.nestlings = []
        this.addNestling()
        this.addNestling()
        this.addNestling()
    }

    update(timestamp, elapsed) {
        this.player.update()
        for (const nestling of this.nestlings) {
            nestling.update(timestamp, elapsed)
        }
    }

    addNestling() {
        this.nestlings.push(new Nestling(this, this.nestlings.length))
    }
}
