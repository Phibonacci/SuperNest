// SuperNest - main menu scene
'use strict'

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu')
    }

    preload() {
        console.log('[MainMenu] Preloading')
        this.load.audio('river-nymphs', 'assets/river-nymphs.ogg')
        this.load.image('test-text', 'assets/test-text.png')
    }

    create() {
        console.log('[MainMenu] Creating')
        this.startButton = this.add.image(100, 100, 'test-text').setScale(2).setOrigin(0, 0)
        this.input.on('pointerup', () => this.onStartButtonClicked())
    }

    update(timestamp, elapsed) {
        // TODO: animate what can be animated on the menu.
    }

    onStartButtonClicked() {
        this.scene.start('Level')
    }
}
