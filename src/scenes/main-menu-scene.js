// SuperNest - main menu scene
'use strict';

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        console.log('[MainMenu] Preloading');
        // TODO: load the menu assets.
    }

    create() {
        console.log('[MainMenu] Creating');
        this.add.text(100, 50, 'SuperNESt', { fill: '#fff' });

        // TODO: create a button class if we intend to have multiple buttons.
        this.startButton = this.add.text(100, 100, '[ Click to Start ]', { fill: '#fff' });
        this.startButton.setInteractive({ useHandCursor: true });
        this.startButton.on('pointerup', () => this.onStartButtonClicked());
        this.startButton.on('pointerover', () => this.onStartButtonHover());
        this.startButton.on('pointerout', () => this.onStartButtonLeave());
    }

    update(timestamp, elapsed) {
        // TODO: animate what can be animated on the menu.
    }

    onStartButtonClicked() {
        this.scene.start('Level');
    }

    onStartButtonHover() {
        this.startButton.setStyle({ fill: '#f00' });
    }

    onStartButtonLeave() {
        this.startButton.setStyle({ fill: '#fff' });
    }
}