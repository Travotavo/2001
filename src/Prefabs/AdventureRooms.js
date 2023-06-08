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
        this.interpretInput(input);
    }
    interpretInput(input){
        this.switchRoom(new HalCore(this.parent));
    }
    switchRoom(targetRoom){
        this.parent.room = targetRoom;
    }
}

class HalCore extends AdventureRooms{
    constructor(parent){
        var verbs = [
            "advance",
            "remove",
            "yes"
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
        this.parent.addLog("");
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
    }
    handleInput(input){
        var temp = input.toLowerCase().split(" ");
        var temp2 = temp[0];
        temp.shift();
        temp = [temp2, temp.join('')];
        if (!this.verbs.includes(temp[0])){
            this.parent.addLog("\""+temp[0]+"\" is not recognized");
            this.parent.addLog("Try: " + this.verbs.join(', '));
            return;
        }
        if (!this.nouns.includes(temp[1])){
            this.parent.addLog("\""+temp[1]+"\" is not recognized");
            return;
        }
        this.interpretInput(temp);
    }
    interpretInput(input){ //Input is an array of 1 or 2
        switch(input[0]){
            case "remove":
                if (!this.cores.includes(input[1])){
                    this.parent.addLog("\""+input[1]+"\" cannot be removed");
                    return;
                }
                var index = this.cores.indexOf(input[1]);
                if (index !== -1) {
                    this.cores.splice(index, 1);
                }
                this.coresRemaining -= 1;
                break;
            case "yes":
                this.parent.addLog("Do do do do yes");
                break;
            case "advance":
                this.parent.addLog("Swimming");
                break;
        }
    }
}