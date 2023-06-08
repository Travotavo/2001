class Adventure extends Phaser.Scene {
    preload(){
        this.load.image('ui', './assets/sprites/ui/frames/adventure-frame.png');
        this.load.image('hal', './assets/sprites/ui/hal.png');
        let file = 'thick_8x8';
        this.load.bitmapFont('pixelfont', 'assets/fonts/' + file + '.png', 'assets/fonts/' + file + '.xml');
    }

    constructor(){
        super("adventure_scene");
        this.room = new AdventureRooms(this);
    }

    create(){
        this.frame = this.add.sprite(0,0, 'ui').setOrigin(0,0);
        this.hal = this.add.sprite(0,0, 'hal').setOrigin(0,0);
        this.hal.setTint(0xFF6600);

        this.log = this.add.bitmapText(16, 448, 'pixelfont', '', 10). setOrigin(0, 1);
        this.log.setTint(0xFF6600);
        this.log.maxWidth = 433;

        this.promptText = this.add.bitmapText(14, 461, 'pixelfont', '>', 10).setOrigin(0,0.5);
        this.promptText.setTint(0xFF6600);


        this.inputText = this.add.bitmapText(22, 461, 'pixelfont', '', 10).setOrigin(0,0.5);
        this.inputText.setTint(0xFF6600);
        
        //Simulate Keyboard Functions
        this.input.keyboard.on('keydown', function(input) {
            //handles backspace
            if (input.keyCode == 8){
                this.inputText.text = this.inputText.text.substring(0, this.inputText.text.length-1);
            }

            //handles enter
            if (input.keyCode == 13){
                this.log.text += "> " + this.inputText.text + "\n";
                this.room.handleInput(this.inputText.text);
                this.inputText.text = '';
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

    addLog(input){
        this.log.text += input + "\n";
    }
}