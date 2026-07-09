/**
 * game.js — Core game state and logic
 * Manages board state, turn tracking, win/draw detection.
 * No DOM access here — purely logic.
 */

const WIN_LINES = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

const Game = (() => {

  let board   = Array(9).fill(null); // null | 'X' | 'O'
  let current = 'X';
  let over    = false;
  let scores  = { X: 0, O: 0, D: 0 };
  let history = []; // 'X' | 'O' | 'D' per game

  /* ── STATE ACCESSORS ── */
  function getBoard()   { return [...board]; }
  function getCurrent() { return current; }
  function isOver()     { return over; }
  function getScores()  { return { ...scores }; }
  function getHistory() { return [...history]; }

  /* ── PLACE A MARK ── */
  function place(index) {
    if (over || board[index]) return false;
    board[index] = current;
    return true;
  }

  /* ── CHECK WIN ── */
  function checkWin(b) {
    b = b || board;
    for (const line of WIN_LINES) {
      const [a, bb, c] = line;
      if (b[a] && b[a] === b[bb] && b[a] === b[c]) {
        return { winner: b[a], line };
      }
    }
    return null;
  }

  /* ── CHECK DRAW ── */
  function checkDraw(b) {
    b = b || board;
    return b.every(Boolean) && !checkWin(b);
  }

  /* ── SWAP TURN ── */
  function swapTurn() {
    current = current === 'X' ? 'O' : 'X';
  }

  /* ── RECORD RESULT ── */
  function recordWin(winner) {
    over = true;
    scores[winner]++;
    history.push(winner);
  }

  function recordDraw() {
    over = true;
    scores.D++;
    history.push('D');
  }

  /* ── RESET ROUND (keep scores) ── */
  function resetRound() {
    board   = Array(9).fill(null);
    current = 'X';
    over    = false;
  }

  /* ── RESET ALL ── */
  function resetAll() {
    scores  = { X: 0, O: 0, D: 0 };
    history = [];
    resetRound();
  }

  /* ── EMPTY CELLS ── */
  function emptyCells(b) {
    b = b || board;
    return b.map((v, i) => v ? null : i).filter(v => v !== null);
  }

  return {
    getBoard, getCurrent, isOver, getScores, getHistory,
    place, checkWin, checkDraw, swapTurn,
    recordWin, recordDraw,
    resetRound, resetAll, emptyCells,
    WIN_LINES
  };

})();
