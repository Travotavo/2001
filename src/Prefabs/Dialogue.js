class Dialogue extends Phaser.Scene {
    constructor(){
        super("dialogue_subscene");
    }

    preload(){
        this.load.json('script_text', 'files/'+ this.script + '/1.json');
    }

    init(data){
        this.script = data.dialoguePath;
        this.superScene = data.superScene;
    }

    create(){
        this.cd = 500;
        this.time = 0;
        this.iter = 0;
        this.dialogue = this.add.sprite(0,0, 'dialogue').setOrigin(0,0);
        this.dialogue.setInteractive();
        this.dialogue.on('pointerdown', () => { (this.dialogueDown()); });
        this.text = this.add.bitmapText(45, 50, 'pixelfont', '', 20). setOrigin(0, 0);
        this.text.setTint(0xFF6600);
        this.text.maxWidth = 550;
    }

    update(time, delta){
        this.time += 1 * delta;
        if (this.time > this.cd && this.iter < this.script.length){
            console.log('adding text');
            this.text.text += this.script[this.iter];
            this.iter += 1;
        }
    }

    dialogueDown(){
        this.superScene.enableButtons();
        this.scene.stop('dialogue_subscene');
    }
}