class Intro extends Phaser.Scene {
    constructor(){
        super("start");
    }
    
    create(){
        this.promptText = this.add.bitmapText(game.config.width/2, game.config.height/4, 'pixelfont', 'Please Input Your Name Intrepid Explorer', 20).setOrigin(0.5,0.5);
        this.promptText.setTint(0xFF6600);
        
        this.inputText = this.add.bitmapText(game.config.width/2, 350, 'pixelfont', '', 10).setOrigin(0.5,0.5);
        this.inputText.setTint(0xFF6600);

        this.input.keyboard.on('keydown', function(input) {

            //handles backspace
            if (input.keyCode == 8){
                this.inputText.text = this.inputText.text.substring(0, this.inputText.text.length-1);
            }

            //handles enter
            if (input.keyCode == 13){
                metaDat.name = this.inputText.text;
                this.scene.start('management_scene');
            }

            //Handles Text and Important Special Characters
            if ((
                input.keyCode >= 65  && input.keyCode <= 90  //A-Z
                || [32, 109, 189].includes(input.keyCode) // Space, -
                || input.keyCode >= 48  && input.keyCode <= 57) // 0-9
                && this.inputText.text.length < 54){
                this.inputText.text += input.key;
            }
        }, this);
    }
}