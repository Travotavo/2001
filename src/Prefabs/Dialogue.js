class Dialogue extends Phaser.Scene {
    constructor(){
        super("dialogue_subscene");
    }

    preload(){
        this.load.json('script_text', 'data/events/dialogues.json');
    }

    init(data){
        this.scriptPath = data.dialoguePath;
        this.superScene = data.superScene;
    }

    create(){
        this.cd = 50;
        this.time = 0;
        this.iter = 0;
        var data = this.cache.json.get('script_text');
        this.script = data[this.scriptPath].scripts[
            Math.floor(Math.random() * data[this.scriptPath].scripts.length)
        ].replace("%s", metaDat.name);
        this.dialogue = this.add.sprite(0,0, 'dialogue').setOrigin(0,0);
        this.dialogue.setInteractive();
        this.dialogue.on('pointerdown', () => { (this.dialogueDown()); });
        this.text = this.add.bitmapText(45, 50, 'pixelfont', '', 20). setOrigin(0, 0);
        this.text.setTint(0xFF6600);
        this.text.maxWidth = 550;
        this.wordsFinished = false;
    }

    update(time, delta){
        this.time += 1 * delta;
        if (this.time > this.cd && this.iter < this.script.length){
            this.text.text += this.script[this.iter];
            this.iter += 1;
            this.time = 0;
        }
        if (this.iter >= this.script.length){
            this.wordsFinished = true;
        }
    }

    dialogueDown(){
        if(this.wordsFinished){
            if (this.buttons != null){
                this.superScene.enableButtons();
            }
            this.scene.remove('dialogue_subscene');
        }
    }
}