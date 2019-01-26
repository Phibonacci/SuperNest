// SuperNest - background
'use strict'

class Background {
    static preload(scene) {
        scene.load.image('bg-cloud', 'assets/bg-cloud.png')
        scene.load.image('bg-ground', 'assets/bg-ground.png')
    }

    constructor(scene) {
        this.images = []
        this.images.push(scene.add.tileSprite(0, 0, 200 * 10, 150 * 10, 'bg-cloud'))

        for (const image of this.images) {
            image.depth = -1000
        }
    }

    update()  {

    }
}
