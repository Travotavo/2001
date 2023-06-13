class Management extends Phaser.Scene {

    preload(){
        this.load.image('storyframe', './assets/sprites/ui/frames/story-frame.png');
        this.load.audio('hover', './assets/sounds/selects/hover.wav');
        this.load.audio('select', './assets/sounds/selects/action.wav');
        this.load.image('dialogue', './assets/sprites/ui/story-popup.png')
    }

    constructor(){
        super("management_scene");
    }

    create(){
        this.frame = this.add.sprite(0,0, 'storyframe').setOrigin(0,0);

        this.months = this.add.bitmapText(550, 30, 'pixelfont', '28 Months Remain', 10). setOrigin(0.5, 0.5);
        this.months.setTint(0xFF6600);
        this.months.maxWidth = 433;

        var actionList = [
            "Perambulation",
            "Engagement",
            "Pictograph",
            "Maintenance"
        ];

        this.monthCount = 28;

        this.buttonList = [];
        var temp = 1;
        for (let i in actionList){
            this.buttonList = this.buttonList.concat(
                [this.add.bitmapText(550, (105* temp), 'pixelfont', actionList[i], 10).setOrigin(0.5, 0.5).setTint(0xFF6600)]
            );
            this.buttonList[i].setInteractive({ useHandCursor: true });
            this.buttonList[i].on('pointerover', () => { this.buttonHover(this.buttonList[i]); });
            this.buttonList[i].on('pointerout', () => { this.buttonOut(this.buttonList[i]); });
            this.buttonList[i].on('pointerdown', () => { this.buttonDown(actionList[i], this.buttonList[i]); });
            temp += 1;
        }
        //550  Y:26
    }

    buttonHover(button) {
        button.setTint(0x000000);
        this.sound.play('hover', {volume: 0.25});
    }

    buttonDown(button, reset) {
        this.sound.play('select', {volume: 0.25});
        this.buttonOut(reset);
        if (this.updateMonth()){
            this.spawnDialogue(button);
        }
        else{
            this.scene.start('adventure_scene');
        }
    }

    enableButtons(){
        this.buttonList.forEach(element => {
            element.setInteractive();
        });
    }

    spawnDialogue(choice){
        this.buttonList.forEach(element => {
            element.disableInteractive();
        });
        this.game.scene.add('dialogue_subscene', new Dialogue());
        let dialogue = this.scene.launch('dialogue_subscene', {dialoguePath: choice, superScene: this});
    }

    updateMonth(){
        this.monthCount -= 1;
        this.months.text = this.monthCount + ' Months Remain';
        if (this.monthCount < 10){
            this.buttonList[3].text = '! Maintenance !'
            return false;
        }
        return true;
    }

    buttonOut(button) {
        button.setTint(0xFF6600);
    }
}