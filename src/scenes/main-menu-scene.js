// SuperNest - main menu scene
'use strict'

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu')
    }

    preload() {
        console.log('[MainMenu] Preloading')
        this.load.audio('river-nymphs', 'assets/river-nymphs.ogg')
        this.load.image('bg-cloud', 'assets/bg-cloud.png')
        this.load.image('tuto-move', 'assets/tuto-move.png')
        this.load.image('tuto-take', 'assets/tuto-take.png')
        this.load.image('tuto-eat', 'assets/tuto-eat.png')
        this.load.image('tuto-revive', 'assets/tuto-revive.png')
        this.load.image('logo', 'assets/supernest.png')
        this.load.spritesheet('bird', 'assets/bird-sheet.png', { frameWidth: 64, frameHeight: 64 })
    }

    create() {
        console.log('[MainMenu] Creating')
        this.bg = this.add.tileSprite(0, -600, 1024 * 3, 900 * 3, 'bg-cloud').setOrigin(0, 0)
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 128, 'logo').setScale(5)

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1,
        })
        this.birdA = this.add.sprite(100, 450, 'bird')
        this.birdA.anims.play('fly', true)
        this.birdB = this.add.sprite(150, 500, 'bird')
        this.birdB.anims.play('fly', true)
        this.birdC = this.add.sprite(200, 400, 'bird')
        this.birdC.anims.play('fly', true)

        const rect = new Phaser.Geom.Rectangle(1024 / 2 - 200, 360, 370, 230)
        const graphics = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.3 } })
        graphics.fillRectShape(rect);

        this.add.image(1024 / 2 - 30, 400, 'tuto-move')
        this.add.image(1024 / 2 - 18, 450, 'tuto-take')
        this.add.image(1024 / 2, 500, 'tuto-eat')
        this.add.image(1024 / 2, 550, 'tuto-revive')

        this.birdTuto = this.add.sprite(1024 / 2 + 90, 400, 'bird')
        this.birdTuto.anims.play('fly', true)

        this.input.on('pointerup', () => this.onPointerUp())
        this.locked = false;

        this.cameras.main.fadeIn(500)
    }

    update(_, elapsed) {
        this.bg.x -= elapsed * 0.3;
        if (this.bg.x < -1200) {
            this.bg.x = 0
        }
        this.bg.y += elapsed * 0.1;
        if (this.bg.y > 0) {
            this.bg.y = -900
        }
    }

    onPointerUp() {
        if (this.locked) return
        this.locked = true
        this.cameras.main.fadeOut(500)
        this.cameras.main.on('camerafadeoutcomplete', () => {
            this.scene.start('Level')
        });
    }
}
