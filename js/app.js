/**
 * app.js — Main application controller
 * Depends on: game.js, ai.js, ui.js
 *
 * Wires game logic + AI + UI together.
 * Exposes global functions called by HTML onclick attributes.
 */

let cpuMode    = false;
let cpuBusy    = false;

/* ── BOOTSTRAP ── */
document.addEventListener('DOMContentLoaded', () => {
  startRound();
});

/* ── START / RESET ROUND ── */
function startRound() {
  cpuBusy = false;
  Game.resetRound();
  UI.buildBoard(handleCellClick);
  UI.updateScores(Game.getScores());
  UI.setActiveTurn('X');
  UI.renderHistory(Game.getHistory());
  UI.setStatus('<i class="fa-solid fa-play"></i> X\'s Turn');
  UI.blockBoard(false);
}

/* ── NEW ROUND (button) ── */
function newRound() {
  startRound();
}

/* ── RESET ALL SCORES (button) ── */
function resetAll() {
  cpuBusy = false;
  Game.resetAll();
  UI.buildBoard(handleCellClick);
  UI.updateScores(Game.getScores());
  UI.setActiveTurn('X');
  UI.renderHistory(Game.getHistory());
  UI.setStatus(`<i class="fa-solid fa-play"></i> ${next}'s Turn`);
  UI.blockBoard(false);
}

/* ── CELL CLICK ── */
function handleCellClick(index) {
  if (Game.isOver() || cpuBusy) return;
  if (cpuMode && Game.getCurrent() === 'O') return; // not player's turn

  doPlay(index);

  // Schedule CPU move after player plays
  if (cpuMode && !Game.isOver() && Game.getCurrent() === 'O') {
    scheduleCPU();
  }
}

/* ── DO PLAY (place mark + check result) ── */
function doPlay(index) {
  const player = Game.getCurrent();

  if (!Game.place(index)) return; // cell occupied
  UI.placeMark(index, player);

  const win = Game.checkWin();
  if (win) {
    Game.recordWin(win.winner);
    UI.highlightWin(win.line, win.winner);
    UI.updateScores(Game.getScores());
    UI.renderHistory(Game.getHistory());
    const label = cpuMode
      ? (win.winner === 'X' ? 'You won! 🎉' : 'CPU wins!')
      : `Player ${win.winner} wins!`;
    UI.setStatus(label, 'win-' + win.winner.toLowerCase());
    UI.setActiveTurn(null);
    return;
  }

  if (Game.checkDraw()) {
    Game.recordDraw();
    UI.showDraw();
    UI.updateScores(Game.getScores());
    UI.renderHistory(Game.getHistory());
    UI.setStatus("It's a draw!", 'draw');
    UI.setActiveTurn(null);
    return;
  }

  // Continue — swap turn
  Game.swapTurn();
  const next = Game.getCurrent();
  UI.setActiveTurn(next);

  if (!cpuMode) {
    UI.setStatus(`${next}'s turn`);
  }
}

/* ── SCHEDULE CPU MOVE ── */
function scheduleCPU() {
  cpuBusy = true;
  UI.blockBoard(true);
  UI.setThinkingStatus();

  setTimeout(() => {
    if (!Game.isOver()) {
      const move = AI.pickMove();
      if (move !== -1) doPlay(move);
    }
    cpuBusy = false;
    UI.blockBoard(false);
  }, AI.thinkDelay());
}

/* ── MODE SWITCH (2P / CPU) ── */
function setMode(mode) {
  cpuMode = mode === 'cpu';

  document.getElementById('btn2p').classList.toggle('active',  !cpuMode);
  document.getElementById('btnCpu').classList.toggle('active',  cpuMode);

  UI.showDifficultyRow(cpuMode);
  UI.setPlayerLabels(cpuMode);

  resetAll();
}

/* ── DIFFICULTY SWITCH ── */
function setDiff(level, btn) {
  AI.setDifficulty(level);
  UI.setDiffButtons(level);

  const hints = {
    easy:   'Easy — CPU plays randomly',
    medium: 'Medium — CPU sometimes slips up',
    hard:   'Hard — CPU plays perfectly, try to draw!'
  };
  UI.showHint(hints[level]);

  resetAll();
}
