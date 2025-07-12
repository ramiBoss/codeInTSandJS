class SpecialEntity {
    startPosition;
    endPosition;

    constructor(start, end){
        this.startPosition = start;
        this.endPosition = end;
    }

    getEndPosition(){
        return this.endPosition;
    }

    getActionPosition(){
        return this.startPosition;
    }

    getID(){}
}