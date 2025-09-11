import { GameEngine } from './GameEngine';
import { HumanPlayer, AIPlayer, GameObserver, GameState, GameResult, Move } from './types';

/**
 * Example game observer for logging
 */
class GameLogger implements GameObserver {
  onGameStateChanged(gameState: GameState): void {
    console.log(`Game State Changed: ${gameState.status}`);
    if (gameState.currentPlayer) {
      console.log(`Current Player: ${gameState.currentPlayer.name}`);
    }
  }

  onMoveAttempted(move: Move, result: GameResult): void {
    console.log(`Move by ${move.player.name} at (${move.position.row}, ${move.position.col}): ${result.message}`);
  }

  onGameEnded(result: GameResult): void {
    console.log(`Game Ended: ${result.message}`);
  }
}

/**
 * Example game observer for UI updates
 */
class GameUI implements GameObserver {
  onGameStateChanged(gameState: GameState): void {
    this.displayBoard(gameState.board);
  }

  onMoveAttempted(move: Move, result: GameResult): void {
    if (!result.success) {
      console.log(`❌ ${result.message}`);
    }
  }

  onGameEnded(result: GameResult): void {
    console.log(`🎉 ${result.message}`);
  }

  private displayBoard(board: (string | null)[][]): void {
    console.log('\n' + '─'.repeat(13));
    board.forEach((row, rowIndex) => {
      const displayRow = row.map(cell => cell || ' ').join(' │ ');
      console.log(`│ ${displayRow} │`);
      if (rowIndex < board.length - 1) {
        console.log('├─' + '┼─'.repeat(board.length - 1) + '┤');
      }
    });
    console.log('─'.repeat(13) + '\n');
  }
}

/**
 * Demo function showing basic game flow
 */
function demoBasicGame(): void {
  console.log('=== Basic Tic Tac Toe Game Demo ===\n');

  // Create players
  const playerX = new HumanPlayer('Alice', 'X');
  const playerO = new HumanPlayer('Bob', 'O');

  // Create game engine
  const game = new GameEngine(3, [playerX, playerO]);

  // Add observers
  const logger = new GameLogger();
  const ui = new GameUI();
  game.addObserver(logger);
  game.addObserver(ui);

  // Start game
  console.log(game.startGame().message);

  // Simulate game moves
  const moves = [
    { row: 0, col: 0 }, // X
    { row: 0, col: 1 }, // O
    { row: 1, col: 1 }, // X
    { row: 0, col: 2 }, // O
    { row: 2, col: 2 }  // X wins
  ];

  moves.forEach(move => {
    const result = game.makeMove(move);
    if (result.gameState.status === 'WON' || result.gameState.status === 'DRAW') {
      console.log(`Final result: ${result.message}`);
      console.log(`Winning positions:`, game.getWinningPositions());
    }
  });
}

/**
 * Demo function showing game with AI
 */
function demoAIGame(): void {
  console.log('\n=== Human vs AI Game Demo ===\n');

  const human = new HumanPlayer('Human', 'X');
  const ai = new AIPlayer('AI', 'O');

  const game = new GameEngine(3, [human, ai]);
  const ui = new GameUI();
  game.addObserver(ui);

  console.log(game.startGame().message);

  // Human makes first move
  console.log(game.makeMove({ row: 1, col: 1 }).message);

  // AI makes moves automatically
  while (game.getGameState().status === 'IN_PROGRESS') {
    const availableMoves = game.getAvailableMoves();
    if (availableMoves.length > 0) {
      const aiMove = availableMoves[0]!; // Simple AI: take first available
      const result = game.makeMove(aiMove);
      console.log(`AI plays at (${aiMove.row}, ${aiMove.col}): ${result.message}`);
      
      if (result.gameState.status !== 'IN_PROGRESS') {
        break;
      }

      // Human move (simulated)
      const humanMoves = game.getAvailableMoves();
      if (humanMoves.length > 0) {
        const humanMove = humanMoves[Math.floor(Math.random() * humanMoves.length)]!;
        const humanResult = game.makeMove(humanMove);
        console.log(`Human plays at (${humanMove.row}, ${humanMove.col}): ${humanResult.message}`);
      }
    }
  }
}

/**
 * Demo function showing undo functionality
 */
function demoUndoFunction(): void {
  console.log('\n=== Undo Functionality Demo ===\n');

  const playerX = new HumanPlayer('Player X', 'X');
  const playerO = new HumanPlayer('Player O', 'O');

  const game = new GameEngine(3, [playerX, playerO]);
  const ui = new GameUI();
  game.addObserver(ui);

  console.log(game.startGame().message);

  // Make some moves
  game.makeMove({ row: 0, col: 0 });
  game.makeMove({ row: 1, col: 1 });
  game.makeMove({ row: 0, col: 1 });

  console.log('Move history length:', game.getMoveHistory().length);

  // Undo last move
  console.log('\nUndoing last move...');
  console.log(game.undoMove().message);
  console.log('Move history length:', game.getMoveHistory().length);

  // Continue game
  game.makeMove({ row: 2, col: 2 });
  console.log('Game continues...');
}

/**
 * Demo function showing game statistics
 */
function demoGameAnalytics(): void {
  console.log('\n=== Game Analytics Demo ===\n');

  const playerX = new HumanPlayer('Alice', 'X');
  const playerO = new HumanPlayer('Bob', 'O');

  const game = new GameEngine(3, [playerX, playerO]);

  game.startGame();

  // Simulate a complete game
  const moves = [
    { row: 0, col: 0 }, // X
    { row: 0, col: 1 }, // O  
    { row: 1, col: 0 }, // X
    { row: 0, col: 2 }, // O
    { row: 2, col: 0 }  // X wins (left column)
  ];

  moves.forEach(move => game.makeMove(move));

  // Show game analytics
  const finalState = game.getGameState();
  const history = game.getMoveHistory();

  console.log('Game Analytics:');
  console.log(`- Final Status: ${finalState.status}`);
  console.log(`- Winner: ${finalState.winner?.name || 'None'}`);
  console.log(`- Total Moves: ${finalState.moveCount}`);
  console.log(`- Game Duration: ${history.length > 0 ? history[history.length - 1]!.timestamp - history[0]!.timestamp : 0}ms`);
  console.log(`- Winning Pattern: ${game.getWinningPositions().map(p => `(${p.row},${p.col})`).join(', ')}`);
  
  console.log('\nMove History:');
  history.forEach((move, index) => {
    console.log(`  ${index + 1}. ${move.player.name} (${move.player.symbol}) -> (${move.position.row}, ${move.position.col})`);
  });
}

// Run all demos
export function runAllDemos(): void {
  demoBasicGame();
  demoAIGame();
  demoUndoFunction();
  demoGameAnalytics();
}

// Auto-run if this file is executed directly
// Note: This would work in a Node.js environment with proper setup
runAllDemos();
