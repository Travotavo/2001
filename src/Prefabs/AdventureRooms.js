class AdventureRooms {
    constructor(parent){
        this.parent = parent;
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
        this.switchRoom(new HalCore());
    }
    switchRoom(targetRoom){
        this.parent.room =  targetRoom;
    }
}

class HalCore extends AdventureRooms{
    handleInput(input){
        console.log("plz don't kill")
    }
}