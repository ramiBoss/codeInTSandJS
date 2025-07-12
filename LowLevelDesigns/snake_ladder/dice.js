class Dice {
    maxValue;
    constructor(maxValue){
        this.maxValue = maxValue;
    }

    rollDice(){
        return Math.floor(Math.random()*this.maxValue) +1;
    }
}