// SuperNest - background
'use strict'

const BG_CLOUD_WIDTH   = 1200
const BG_CLOUD_HEIGHT  = 900
const BG_GROUND_WIDTH  = 200
const BG_GROUND_HEIGHT = 150
const TREE_WIDTH       = 320
const TREE_HEIGHT      = 600
const BRANCH_WIDTH     = 600
const BRANCH_HEIGHT    = 100

class Background {
    static preload(scene) {
        scene.load.image('bg-cloud', 'assets/bg-cloud.png')
        scene.load.image('bg-ground', 'assets/bg-ground.png')
        scene.load.image('tree', 'assets/tree.png')
        scene.load.image('branch', 'assets/branch.png')
    }

    constructor(scene) {
        this.cloudImage = scene.add.tileSprite(0, 0, scene.cameras.main.width + BG_CLOUD_WIDTH * 3, BG_CLOUD_HEIGHT * 3, 'bg-cloud')
        this.cloudImage.depth = -1000
        this.groundImage = scene.add.tileSprite(0, -75, scene.cameras.main.width + BG_GROUND_WIDTH * 20, BG_GROUND_HEIGHT, 'bg-ground')
        this.groundImage.depth = -900
        this.treeImage = scene.add.tileSprite(-150, 0, TREE_WIDTH, TREE_HEIGHT * 3, 'tree')
        this.treeImage.depth = -800
        this.branchImage = scene.add.tileSprite(150, -1200, BRANCH_WIDTH, BRANCH_HEIGHT, 'branch')
        this.branchImage.depth = -800
        this.currentAnchor = new Phaser.Math.Vector2()
    }

    updateCloud(scene) {
        this.cloudImage.x = this.currentAnchor.x  - (this.currentAnchor.x % BG_CLOUD_WIDTH) -  BG_CLOUD_WIDTH
        this.cloudImage.y = this.currentAnchor.y  - (this.currentAnchor.y % BG_CLOUD_HEIGHT) - BG_CLOUD_HEIGHT
    }

    updateGround(scene) {
        this.groundImage.x = this.currentAnchor.x  - (this.currentAnchor.x % BG_GROUND_WIDTH) - BG_GROUND_WIDTH
    }

    updateTree(scene) {
        this.treeImage.y = this.currentAnchor.y  - (this.currentAnchor.y % TREE_HEIGHT) - TREE_HEIGHT * 1 - TREE_HEIGHT / 2 - 19
    }

    update(scene)  {
        scene.cameras.main.getWorldPoint(this.cloudImage.width / 2,this.cloudImage.height / 2, this.currentAnchor)
        this.updateCloud(scene)
        this.updateGround(scene)
        this.updateTree(scene)
    }
}
