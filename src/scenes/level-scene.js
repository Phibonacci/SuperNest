// SuperNest - level scene
'use strict'

class LevelScene extends Phaser.Scene {
    constructor() {
        super('Level')
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
        this.add.text(0, 0, 'This is the game scene.', { fill: '#fff' })
        this.player = new Player(this)
        this.initializeNestlings()
        this.tempNestlingTimer = 0;
    }

    update(timestamp, elapsed) {
        this.player.update()
        for (const nestling of this.nestlings) {
            nestling.update(timestamp, elapsed)
        }
        this.tempNestlingTimer += elapsed;
        if (this.tempNestlingTimer > 1400) {
            this.tempNestlingTimer = 0;
            this.addNestling();
        }
    }

    initializeNestlings() {
        this.nestlings = []
        this.addNestling()
    }

    addNestling() {
        this.nestlings.push(new Nestling(this, this.nestlings.length))
    }
}
