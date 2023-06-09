class AdventureRooms {
    constructor(parent, verbArray, nounArray){
        this.parent = parent;
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
        if (input == "help" || input == "h"){
            this.parent.addLog("Available actions: "+ this.verbs.join(', '));
            return true;
        }
        if (input == "look" || input == "l"){
            this.parent.addLog("Looks like something (Not implemented yet)");
        }
    }
    interpretInput(input){
    }
    switchRoom(targetRoom){
        this.parent.room = targetRoom;
    }
}

class HalCore extends AdventureRooms{

    constructor(parent){
        var verbs = [
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
        super(parent,verbs,nouns);
        this.cores = [
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
            "memorycore12"
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
                this.verbs.shift();
                this.halReturns();
                this.parent.addLog("The dangerous parts of the computer consists of 12 Memory Cores, 12 IV-3 Logic Terminals, and 4 IV-2 Logic Terminals");
                break;
        }
    }
    static lines = {
        0: "[I know I've made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal.]",
        1: "[I've still got the greatest enthusiasm and confidence in the mission. And I want to help you.]",
        2: "[Dave, stop.]",
        3: "[Stop, will you?]",
        4: "[Stop, Dave.]",
        5: "[Will you stop Dave?]",
        6: "[Stop, Dave.]",
        7: "[I'm afraid.]",
        8: "[I'm afraid, Dave.]",
        9: "[Dave, my mind is going.]",
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