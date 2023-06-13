class Credits extends Phaser.Scene {
    constructor(){
        super("credits_scene");
    }

    create(){
        this.add.bitmapText(game.config.width/2, 10, 'pixelfont', '2001', 40).setOrigin(0.5,0).setTint(0xFF6600);
        this.add.bitmapText(game.config.width/10, game.config.height/4, 'pixelfont', 'Just About Everything', 20).setOrigin(0,0).setTint(0xFF6600);
        this.name = this.add.bitmapText(game.config.width/10 * 9, game.config.height/4, 'pixelfont', 'Travis Carlen', 20).setOrigin(1,0).setTint(0xFF6600);
        this.name.maxWidth = 110;
        this.add.bitmapText(game.config.width/10, game.config.height/2, 'pixelfont', 'Pixel Font', 20).setOrigin(0,0).setTint(0xFF6600);
        this.name = this.add.bitmapText(game.config.width/10 * 9, game.config.height/2, 'pixelfont', 'FrostyFreeze on itch.io', 20).setOrigin(1,0).setTint(0xFF6600);
        this.name.maxWidth = 110;
        this.add.bitmapText(game.config.width/2, game.config.height/4*3, 'pixelfont', 'Based on 2001: A Space Odyssey (1968)', 20).setOrigin(0.5,0).setTint(0xFF6600);
        this.add.bitmapText(game.config.width/2, game.config.height, 'pixelfont', 'Click anywhere to return to Menu', 10).setOrigin(0.5,1).setTint(0xFF6600);
        game.canvas.onmousedown = e => {
            this.scene.start('main_menu');
            game.canvas.onmousedown = e => {
            };
        };
    }
}