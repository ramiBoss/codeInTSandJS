class Ladder extends SpecialEntity{
    constructor(start, end){
        super(start,end)
    }

    getId(){
        return 'L_'+this.endPosition;
    }
}