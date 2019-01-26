// SuperNest - nestling entity
'use strict'

class Nestling {
    constructor(scene) {
        this.scene = scene;
        this.sprite = scene.add.sprite(50, 50, 'nestling');
    }
}