// SuperNest - background
'use strict'

class Background {
    static preload(scene) {
        scene.load.image('bg-cloud', 'assets/bg-cloud.png')
        scene.load.image('bg-ground', 'assets/bg-ground.png')
    }

    constructor(scene) {
        this.width = 200
        this.height = 150
        this.cloudImage = scene.add.tileSprite(0, 0, scene.cameras.main.width + this.width * 2, scene.cameras.main.height + this.height * 2, 'bg-cloud')
        this.cloudImage.depth = -1000
        this.groundImage = scene.add.tileSprite(0, -75, scene.cameras.main.width + this.width * 2, this.height, 'bg-ground')
        this.groundImage.depth = -900
        this.currentAnchor = new Phaser.Math.Vector2()
    }

    updateCloud(scene) {
        this.cloudImage.x = this.currentAnchor.x  - (this.currentAnchor.x % this.width)
        this.cloudImage.y = this.currentAnchor.y  - (this.currentAnchor.y % this.height)
    }

    updateGround(scene) {
        this.groundImage.x = this.currentAnchor.x  - (this.currentAnchor.x % this.width)
    }

    update(scene)  {
        scene.cameras.main.getWorldPoint(this.cloudImage.width / 2,this.cloudImage.height / 2, this.currentAnchor)
        this.updateCloud(scene)
        this.updateGround(scene)
    }
}
