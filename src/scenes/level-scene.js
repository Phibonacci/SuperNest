// SuperNest - level scene
'use strict'

class LevelScene extends Phaser.Scene {
    constructor() {
        super('Level')
    }

    preload() {
        console.log('[Level] Preloading')
        this.load.image('nestling', 'assets/nestling.png')
    }

    create() {
        console.log('[Level] Creating')
        this.add.text(0, 0, 'This is the game scene.', { fill: '#fff' })
        this.nestlings = []
        this.nestlings.push(new Nestling(this))
    }

    update(timestamp, elapsed) {
        // TODO update entities with the elapsed time.
    }
}
