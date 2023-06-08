let config = {
    type:Phaser.AUTO,
    width: 640,
    height: 480,
    zoom: 1,
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [Menu, Management, Adventure, Credits]
}

let game = new Phaser.Game(config);
