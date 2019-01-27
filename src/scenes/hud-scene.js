// SuperNest - hud scene
'use strict'

class HudScene extends Phaser.Scene {
    constructor() {
        super('HUD')
        window.level = this
    }

    preload() {
        console.log('[HUD] Preloading')
        CompassArrow.preload(this)
        this.load.image('check-mark', 'assets/check-mark.png')
    }

    create() {
        console.log('[HUD] Creating')
        this.level = game.scene.getScene('Level')
        this.player = this.level.player
        this.compass = new CompassArrow(this)

        const rect = new Phaser.Geom.Rectangle(640, 0, 1024 - 640, 100)
        const graphics = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } })
        graphics.fillRectShape(rect)

        this.nestlingHeads = []
        this.speechBubbles = []
        this.level.nestlings.forEach((nestling, index) => {
            const x = 670 + index * 70
            const y = 80
            const headSprite = this.add.sprite(x, y, 'nestling')
            headSprite.isDead = false
            headSprite.isFlyingAway = false
            this.nestlingHeads.push(headSprite)
            this.speechBubbles.push(new SpeechBubble(this, nestling, x, y))
        })
    }

    update(_timestamp, _elapsed) {
        this.compass.update(this.player.x, this.player.y)
        this.level.nestlings.forEach((nestling, index) => {
            if (nestling.isDead !== this.nestlingHeads[index].isDead) {
                this.nestlingHeads[index].isDead = nestling.isDead
                this.nestlingHeads[index].setTexture(nestling.isDead ? 'nestling-dead' : 'nestling')
            }
            if (nestling.isFlyingAway !== this.nestlingHeads[index].isFlyingAway) {
                this.nestlingHeads[index].isFlyingAway = nestling.isFlyingAway
                this.nestlingHeads[index].setTexture(nestling.isFlyingAway ? 'check-mark' : 'nestling')
            }
        })
        this.speechBubbles.forEach(x => x.update())
    }
}
