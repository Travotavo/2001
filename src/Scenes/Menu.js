class Menu extends Phaser.Scene {
    preload(){
        this.load.image('title', './assets/sprites/ui/title.png');
        let file = 'thick_8x8';
        this.load.bitmapFont('pixelfont', 'assets/fonts/' + file + '.png', 'assets/fonts/' + file + '.xml');
    }

    constructor(){
        super("main_menu");
    }

    create(){
        this.title = this.add.sprite(0,0, 'title').setOrigin(0,0);
        game.canvas.onmousedown = e => {
            this.scene.start('management_scene');
            game.canvas.onmousedown = e => {
                //Screen Location Debug
                const mouseX = e.clientX - game.canvas.offsetLeft;
                const mouseY = e.clientY - game.canvas.offsetTop;
                console.log("Pressed X: " + mouseX, " Y:" + mouseY);
            };
        };
    }

    update(){
        
    }
}