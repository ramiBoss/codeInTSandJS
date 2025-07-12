class Player {
    name;
    position;

    constructor(name){
        this.name = name;
        this.position = 0;
    }

    setPosition(position){
        this.position = position;
        return;
    }

    getPosition(){
        return this.position;
    }

    setName(name){
        this.name = name;
        return;
    }

    getName(){
        return this.name;
    }
}