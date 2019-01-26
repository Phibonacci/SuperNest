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
    }

    create() {
        console.log('[Level] Creating')
        this.add.text(0, 0, 'This is the game scene.', { fill: '#fff' })
        this.nestlings = []
        this.addNestling()
        this.addNestling()
        this.addNestling()
    }

    update(timestamp, elapsed) {
        for (const nestling of this.nestlings) {
            nestling.update(timestamp, elapsed)
        }
    }

    addNestling() {
        this.nestlings.push(new Nestling(this, this.nestlings.length))
    }
}
