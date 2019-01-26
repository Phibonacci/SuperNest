// SuperNest - game
'use strict';

class Game extends Phaser.Game {
    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: [ MainMenuScene, LevelScene ],
        };
        super(config);
    }
}
