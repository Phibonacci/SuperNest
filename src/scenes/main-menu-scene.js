// SuperNest - main menu scene
'use strict'

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu')
    }

    preload() {
        console.log('[MainMenu] Preloading')
        this.load.audio('river-nymphs', 'assets/river-nymphs.ogg')
        this.load.image('test-text', 'assets/test-text.png')
        this.load.image('bg-cloud', 'assets/bg-cloud.png')
        this.load.spritesheet('bird', 'assets/bird-sheet.png', { frameWidth: 64, frameHeight: 64 })
    }

    create() {
        console.log('[MainMenu] Creating')
        this.bg = this.add.tileSprite(0, -600, 1024 * 3, 900 * 3, 'bg-cloud').setOrigin(0, 0)
        this.add.image(100, 100, 'test-text').setScale(2).setOrigin(0, 0)

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
