class Snake extends SpecialEntity{
    constructor(start, end){
        super(start,end)
    }

    getId(){
        return 'S_'+this.endPosition;
    }
}