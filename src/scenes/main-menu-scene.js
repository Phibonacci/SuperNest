// SuperNest - main menu scene
'use strict'

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu')
    }

    preload() {
        console.log('[MainMenu] Preloading')
        // TODO: load the menu assets.
    }

    create() {
        console.log('[MainMenu] Creating')
        this.add.text(100, 50, 'Super NESt', { fill: '#fff' })

        // TODO: create a button class if we intend to have multiple buttons.
        this.startButton = this.add.text(100, 100, '[ Click anywhere to Start ]', { fill: '#fff' })
        this.startButton.setInteractive({ useHandCursor: true })
        this.input.on('pointerup', () => this.onStartButtonClicked())
    }

    update(timestamp, elapsed) {
        // TODO: animate what can be animated on the menu.
    }

    onStartButtonClicked() {
        this.scene.start('Level')
    }
}
