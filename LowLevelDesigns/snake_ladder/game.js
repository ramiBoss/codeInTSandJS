const GameStatus = {
    NOT_STARTED: 'Not started',
    RUNNING: 'Running',
    FINISHED: 'Finished',
} 

class Game {
    board;    
    players;
    gameStatus;
    dice;
    
    constructor(board, dice){
        this.board = board;
        this.dice = dice;
        this.gameStatus = GameStatus.NOT_STARTED;
        this.players = [];
    }

    makeMove(player){
        console.log()
    }

    addPlayers(allPlayers){
        if(this.gameStatus === GameStatus.NOT_STARTED){
            for(let player of allPlayers){
                this.players.push(player);
            }
        }else {
            throw new Error('Players cannot be added when the game is already started')
        }
    }

}