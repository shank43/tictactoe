/**
 * ai.js — CPU player logic
 * Depends on: game.js (Game, WIN_LINES)
 *
 * Easy:   random moves
 * Medium: 65% minimax, 35% random
 * Hard:   perfect minimax (unbeatable)
 */

const AI = (() => {

  let difficulty = 'easy'; // 'easy' | 'medium' | 'hard'

  function setDifficulty(d) {
    difficulty = d;
  }

  function getDifficulty() {
    return difficulty;
  }

  /* ── PICK BEST MOVE ── */
  function pickMove() {
    const empty = Game.emptyCells();
    if (!empty.length) return -1;

    if (difficulty === 'easy') {
      return randomMove(empty);
    }

    if (difficulty === 'medium') {
      // 35% chance of random to make it beatable
      if (Math.random() < 0.35) return randomMove(empty);
      return minimaxMove();
    }

    // Hard — always minimax
    return minimaxMove();
  }

  /* ── RANDOM MOVE ── */
  function randomMove(empty) {
    return empty[Math.floor(Math.random() * empty.length)];
  }

  /* ── MINIMAX BEST MOVE ── */
  function minimaxMove() {
    const board = Game.getBoard();
    let bestScore = -Infinity;
    let bestMove  = -1;

    for (const i of Game.emptyCells(board)) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove  = i;
      }
    }
    return bestMove;
  }

  /* ── MINIMAX ALGORITHM ── */
  function minimax(board, depth, isMaximizing) {
    const win = checkWinFor(board);
    if (win === 'O') return 10 - depth;  // CPU wins
    if (win === 'X') return depth - 10;  // Human wins
    if (board.every(Boolean)) return 0;  // Draw

    const empty = board.map((v, i) => v ? null : i).filter(v => v !== null);

    if (isMaximizing) {
      let best = -Infinity;
      for (const i of empty) {
        board[i] = 'O';
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = null;
      }
      return best;
    } else {
      let best = Infinity;
      for (const i of empty) {
        board[i] = 'X';
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = null;
      }
      return best;
    }
  }

  /* ── WIN CHECK FOR MINIMAX (uses a board snapshot) ── */
  function checkWinFor(board) {
    for (const [a, b, c] of WIN_LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  /* ── CPU THINKING DELAY (ms) ── */
  function thinkDelay() {
    if (difficulty === 'easy')   return 350;
    if (difficulty === 'medium') return 550;
    return 750; // hard — feels more deliberate
  }

  return { setDifficulty, getDifficulty, pickMove, thinkDelay };

})();
