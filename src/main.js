/*
* Code and Art by Travis Carlen
*
* 2001: A Game
*
* Project time including Art, 40 Hours
*
* Five Major Phaser Components:
* 1. Concurrently running scenes (See Dialogue)
* 2. Keydown Listeners (See Intro and Adventure for reference)
* 3. Text Objects (Custom Type text object)
* 4. Sprites (Primarily WEBGL tint)
* 5. Canvas
*
* I really wanted to point out the workaround I made for typing text. I couldn't find any
* built in methods for receiving keys in general and so this work around was quite impressive to me.
*
*/

let config = {
    type:Phaser.AUTO,
    width: 640,
    height: 480,
    zoom: 1,
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [Menu, Management, Adventure, Intro, Credits],
}
let metaDat = {
    name:"Dave"
}
let game = new Phaser.Game(config);
