// SuperNest - game
'use strict'

class Game extends Phaser.Game {
    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth * window.devicePixelRatio,
            height: window.innerHeight * window.devicePixelRatio,
            // The first scene is loaded automatically upon the game start.
            scene: [ MainMenuScene, LevelScene ],
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                  debug: false,
                },
            },
        }
        super(config)
        
    }
}
