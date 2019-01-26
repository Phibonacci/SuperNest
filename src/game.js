// SuperNest - game
'use strict'

class Game extends Phaser.Game {
    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 1024,
            height: 600,
            // The first scene is loaded automatically upon the game start.
            scene: [ MainMenuScene, LevelScene ],
            pixelArt: true,
            physics: {
                default: "arcade",
                arcade: {
                  debug: true,
                  fps: 100
                }
              },
        };
        super(config)
    }
}
