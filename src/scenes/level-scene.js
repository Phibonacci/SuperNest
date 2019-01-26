// SuperNest - level scene
'use strict'

class LevelScene extends Phaser.Scene {
    constructor() {
        super('Level')
    }

    preload() {
        console.log('[Level] Preloading')
        this.load.spritesheet('bird', 
        'assets/bird-sheet.png',
        { frameWidth: 32, frameHeight: 32 }
    );
        // TODO load assets
    }

    create() {
        console.log('[Level] Creating')
        this.add.text(0, 0, 'This is the game scene.', { fill: '#fff' })
        this.player = new Player(this)
        // TODO create entities
    }

    update(timestamp, elapsed) {
        this.player.update()
        // TODO update entities with the elapsed time.
    }
}
