// SuperNest - game
'use strict';

class Game extends Phaser.Game {
    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            // The first scene is loaded automatically upon the game start.
            scene: [ MainMenuScene, LevelScene ],
        };
        super(config);
    }
}
