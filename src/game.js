// SuperNest - game
'use strict'

class Game extends Phaser.Game {
    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 1024,
            height: 600,
            // The first scene is loaded automatically upon the game start.
            scene: [ MainMenuScene, LevelScene, HudScene ],
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                  debug: false,
                },
            },
            callbacks: {
                postBoot: () => {
                    this.canvas.style.width = '100%'
                    this.canvas.style.height = '100%'
                    this.canvas.style.objectFit = 'contain'
                }
            }
        }
        super(config)
    }
}
