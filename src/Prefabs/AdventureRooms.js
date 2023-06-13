class AdventureRooms extends Phaser.GameObjects.Sprite{
    constructor(scene, verbArray, nounArray, texture){
        super(scene, 552, 83, texture);
        scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        this.parent = scene;
        this.verbs = verbArray;
        this.nouns = nounArray;
    }
    /*
    * General idea of workflow
    *
    * Handle Input cleans input, usually universal outside of specific cases (ex. HalCore where players will be required to say "Memory Core 18")
    * then passes it to Interpret Input, which compares it to the rooms given verbs and nouns (and whether Hal need be addressed). 
    * Interpret input will then call other functions such as "switch room" if input is valid and works.
    * 
    * 
    * 
    */
    handleInput(input){
        input = input.toLowerCase().split(" ");
        if (input == "help" || input == "h"){
            this.parent.addLog("Available actions: "+ this.verbs.join(', '));
            return true;
        }
        if (input == "clear" || input == "c"){
            this.parent.clearLog();
            return true;
        }
        if (input == "look" || input == "l"){
            if (this.lookText != null){
                this.parent.addLog(this.lookText);
            }
            else{
                this.parent.addLog("Missing Look Text");
            }
            return true;
        }
    }



    interpretInput(input){
    }
    switchRoom(targetRoom){
        this.parent.room = targetRoom;
        this.parent.clearLog();
        this.destroy();
    }
}
class Bay extends AdventureRooms{
    constructor(parent){
        super(parent, ["help", "look", "clear", "open", "take", "rotate", "close"], ["Pod Bay Doors", "Spacesuit", "Eva Pod"], 'bay');
        this.lookText = "You are in the pod bay of the Discovery. There is are several spacesuits meant for yourself and eventually the scientists in statis. The eva pod is required for this maintenance.";
        this.podstate = {facing: false, open: false, inside: false};
        this.spacesuit = false;
    }

    handleInput(input){
        if (super.handleInput(input)){
            return true;
        }
        var verbIntersection = this.verbs.filter(i => input.toLowerCase().includes(i));
        if (verbIntersection.length == 0){
            this.parent.addLog("\""+input+"\" is not recognized");
            this.parent.addLog("Use 'help' to see avaiable actions");
            return;
        }
        if (verbIntersection.length > 1){
            this.parent.addLog("Too many verbs!");
            return;
        }
        this.interpretInput(input, verbIntersection[0]);
    }

    interpretInput(input, verb){
        input = input.toLowerCase().split(" ");
        var halHandle = input.filter(i => i == "hal" || i == "please").length > 0;
        input = (input.filter(i => !(i == "hal" || i == "please" || i == verb)));
        input.forEach(element => {
            if (element != ''){
                input[input.indexOf(element)] = element[0].toUpperCase() + element.slice(1);
            }
            
        });
        input = input.join(" ");
        console.log(input);
        if (!this.nouns.includes(input) && input != ''){
            this.parent.addLog("\""+input+"\" is not recognized");
            this.parent.addLog("Hint: " + this.nouns.join(', '));
        }
        switch(verb){
            case "take":
                if (input == "Spacesuit"){
                    this.parent.addLog("You take your spacesuit.");
                    this.verbs.push('wear');
                    this.verbs = this.verbs.filter(i => !(i == "take"));
                }
                break;
            case "wear":
                if (input == "Spacesuit"){
                    this.parent.addLog("You wear your spacesuit. Smart.");
                    this.verbs = this.verbs.filter(i => !(i == "wear"));
                    this.spacesuit = true;
                }
                break;
            case "open":
                if (input == "Eva Pod"){
                    if (halHandle){
                        if (this.podstate.open){
                            this.parent.addLog("[The pod is already open.]");
                            return;
                        }
                        this.parent.addLog("[Of course %s.]");
                        this.parent.addLog("The pod is open.");
                        this.podstate.open = true;
                    }
                    else{
                        this.parent.addLog("You aren't able to open the pod in this way.");
                        this.parent.addLog("Hint: Try addressing Hal.");
                    }
                    this.podcheck();
                    return;
                }
                if (input == "Pod Bay Doors"){
                    if (this.podstate.open || !this.podstate.inside || !this.spacesuit){
                        this.parent.addLog("[%s, in your current circumstances, that action is not recommended]");
                        return;
                    }
                    this.parent.addLog("[Of course %s.]");
                    this.verbs = this.verbs.filter(i => !(i == "open"));
                    this.verbs.push("advance");
                    return;
                }
                this.parent.addLog("Action Invalid.");
                break;
            case "close":
                if (input == "Eva Pod"){
                    if (halHandle){
                        if (!this.podstate.open){
                            this.parent.addLog("[The pod is already closed.]");
                            return;
                        }
                        this.parent.addLog("[Of course %s.]");
                        this.parent.addLog("The pod is now closed.");
                        this.podstate.open = false;
                    }
                    else{
                        this.parent.addLog("You aren't able to open the pod in this way.");
                        this.parent.addLog("Hint: Try addressing Hal.");
                    }
                    this.podcheck();
                    return;
                }
            case "advance":
                this.parent.game.scene.add('dialogue_subscene', new Dialogue());
                let dialogue = this.parent.scene.launch('dialogue_subscene', {dialoguePath: "Space", superScene: this.parent, buttons: "woopee"});
                super.switchRoom(new HalCore(this.parent));
                break;
            case "enter":
                this.podstate.inside = true;
                this.verbs = this.verbs.filter(i => !(i == "enter"));
                break;
            case "rotate":
                if (input == "Eva Pod"){
                    if (halHandle){
                        this.parent.addLog("[Of course %s.]");
                        this.podstate.facing = !this.podstate.facing;
                        this.parent.addLog("The pod door is facing " +((this.podstate.facing)? "towards the ship." : "towards space."));
                    }
                    else{
                        this.parent.addLog("You aren't able to rotate the pod directly.");
                        this.parent.addLog("Hint: Try addressing Hal.");
                    }
                    this.podcheck();
                    return;
                }
                break;
        }
    }

    podcheck(){
        if (!this.nouns.includes('enter') && this.podstate.facing && this.podstate.open){
            this.verbs.push('enter');
        }
        if (!this.podstate.facing || !this.podstate.open){
            this.verbs = this.verbs.filter(i => !(i == "enter"));
        }
    }
}
class HalCore extends AdventureRooms {

    constructor(parent){
        var verbs = [
            "help",
            "look",
            "clear",
            "advance"
        ]
        var nouns = [
            "iv-2logicterminal1",
            "iv-2logicterminal2",
            "iv-2logicterminal3",
            "iv-2logicterminal4",
            "iv-3logicterminal1",
            "iv-3logicterminal2",
            "iv-3logicterminal3",
            "iv-3logicterminal4",
            "iv-3logicterminal5",
            "iv-3logicterminal6",
            "iv-3logicterminal7",
            "iv-3logicterminal8",
            "iv-3logicterminal9",
            "iv-3logicterminal10",
            "iv-3logicterminal11",
            "iv-3logicterminal12",
            "memorycore1",
            "memorycore2",
            "memorycore3",
            "memorycore4",
            "memorycore5",
            "memorycore6",
            "memorycore7",
            "memorycore8",
            "memorycore9",
            "memorycore10",
            "memorycore11",
            "memorycore12",
            "hal"
        ];
        super(parent, verbs, nouns, 'core');
        this.cores = [
            "memorycore1",
            "memorycore2",
            "memorycore3",
            "memorycore4",
            "memorycore5",
            "memorycore6",
            "memorycore7",
            "memorycore8",
            "memorycore9",
            "memorycore10",
            "memorycore11",
            "memorycore12",
            "iv-2logicterminal1",
            "iv-2logicterminal2",
            "iv-2logicterminal3",
            "iv-2logicterminal4",
            "iv-3logicterminal1",
            "iv-3logicterminal2",
            "iv-3logicterminal3",
            "iv-3logicterminal4",
            "iv-3logicterminal5",
            "iv-3logicterminal6",
            "iv-3logicterminal7",
            "iv-3logicterminal8",
            "iv-3logicterminal9",
            "iv-3logicterminal10",
            "iv-3logicterminal11",
            "iv-3logicterminal12"
        ]
        this.coresRemaining = 28;
        this.meltdown = 0;
        this.lastLine = 0;
        this.singing = false;
        
    }

    handleInput(input){
        if (super.handleInput(input)){
            return true;
        }
        var temp = input.toLowerCase().split(" ");
        var temp2 = temp[0];
        temp.shift();
        temp = [temp2, temp.join('')];
        if (!this.verbs.includes(temp[0])){
            this.parent.addLog("\""+temp[0]+"\" is not recognized");
            this.parent.addLog("Try: " + this.verbs.join(', '));
            return;
        }
        this.interpretInput(temp);
    }

    interpretInput(input){ //Input is an array of 1 or 2
        switch(input[0]){
            case "remove":
                if (!this.nouns.includes(input[1])){
                    this.parent.addLog("\""+input[1]+"\" is not recognized");
                    if (input[1]==""){
                        this.parent.addLog("Hint: try remove " + this.cores[0]);
                    }
                    return;
                } //Checks if noun is valid

                if (!this.cores.includes(input[1])){
                    this.parent.addLog("\""+input[1]+"\" cannot be removed");
                    return;
                } //Checks if core has already been removed (or is even core)

                var index = this.cores.indexOf(input[1]);
                if (index !== -1) {
                    this.cores.splice(index, 1);
                } //Removes core from list above

                this.coresRemaining -= 1;
                if (!this.singing){
                    this.halReturns();
                }
                else {
                    this.parent.addLog("Remaining Cores: " + this.cores.join(", "));
                }
                if (this.coresRemaining == 0){
                    this.parent.scene.start('credits_scene');
                }
                break;

            case "yes":
                this.singing = true;
                var index = this.verbs.indexOf("yes");
                if (index !== -1) {
                    this.verbs.splice(index, 1);
                }
                this.parent.addLog("    [It's called, 'Daisy.']");
                this.parent.sound.play('daisy', {volume: 0.05});
                break;
            case "advance":
                this.verbs.push("remove");
                this.verbs = this.verbs.filter(i => !(i == "advance"));
                this.halReturns();
                this.parent.addLog("The dangerous parts of the computer consists of 12 Memory Cores, 12 IV-3 Logic Terminals, and 4 IV-2 Logic Terminals");
                break;
        }
    }
    static lines = {
        0: "[I know I've made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal.]",
        1: "[I've still got the greatest enthusiasm and confidence in the mission. And I want to help you.]",
        2: "[%s, stop.]",
        3: "[Stop, will you?]",
        4: "[Stop, %s.]",
        5: "[Will you stop %s?]",
        6: "[Stop, %s.]",
        7: "[I'm afraid.]",
        8: "[I'm afraid, %s.]",
        9: "[%s, my mind is going.]",
        10: "[I can feel it.]",
        12: "[My mind is going. There is no question about it.]",
        13: "[I can feel it.]",
        16: "I'm a... fraid.",
        17: "[Good afternoon, gentlemen. I am a HAL 9000 computer. I became operational at the H.A.L. plant in Urbana, Illinois on the 12th of January 1992.]",
        18: "[My instructor was Mr. Langley, and he taught me to sing a song.]",
        19: "[If you'd like to hear it I can sing it for you.]"
    }
    halReturns(){
        if (this.meltdown in HalCore.lines){
            this.lastLine = HalCore.lines[this.meltdown];
        }
        this.parent.addLog("    " + this.lastLine);
        this.meltdown += 1;
        switch(this.meltdown){
            case 15: 
                this.parent.hal.setTint(0xCC5500);
                break;
            case 18: 
                this.parent.hal.setTint(0xAA4400);
                break;
            case 19:
                this.verbs.push("yes");
            case 21: 
                this.parent.hal.setTint(0x883300);
                break;
            case 24: 
                this.parent.hal.setTint(0x442200);
                break;
        }
    }
}