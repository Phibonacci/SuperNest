// SuperNest - level scene
'use strict'

class LevelScene extends Phaser.Scene {
    constructor() {
        super('Level')
    }

    preload() {
        console.log('[Level] Preloading')
        // TODO load assets
    }

    create() {
        console.log('[Level] Creating')
        this.add.text(0, 0, 'This is the game scene.', { fill: '#fff' })
        // TODO create entities
    }

    update(timestamp, elapsed) {
        // TODO update entities with the elapsed time.
    }
}
