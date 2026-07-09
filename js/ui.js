/**
 * ui.js — DOM rendering and UI updates
 * Depends on: game.js (Game)
 * All document.getElementById / DOM manipulation lives here.
 */

const UI = (() => {

  /* ── BUILD BOARD CELLS ── */
  function buildBoard(onCellClick) {
    const el = document.getElementById('board');
    el.innerHTML = '';
    el.style.animation = 'none';
    // Force reflow so animation restarts
    void el.offsetWidth;
    el.style.animation = '';

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      cell.addEventListener('click', () => onCellClick(i));
      el.appendChild(cell);
    }
  }

  /* ── PLACE A MARK ON CELL ── */
  function placeMark(index, player) {
    const cell = _cell(index);
    if (!cell) return;
    const span = document.createElement('span');
    span.className = 'mark mark-' + player.toLowerCase();
    span.textContent = player;
    cell.appendChild(span);
    cell.classList.add('taken');
  }

  /* ── HIGHLIGHT WIN LINE ── */
  function highlightWin(line, winner) {
    line.forEach(i => {
      _cell(i).classList.add('win-' + winner.toLowerCase());
    });
  }

  /* ── DRAW FADE ── */
  function showDraw() {
    document.querySelectorAll('.cell').forEach(c => c.classList.add('draw-fade'));
  }

  /* ── BLOCK ALL CELLS (during CPU thinking or game over) ── */
  function blockBoard(blocked) {
    document.querySelectorAll('.cell:not(.taken)').forEach(c => {
      c.classList.toggle('blocked', blocked);
    });
  }

  /* ── STATUS TEXT ── */
  function setStatus(html, cls) {
    const el = document.getElementById('status');
    el.innerHTML = html;
    el.className = 'status-txt ' + (cls || '');
  }

  function setThinkingStatus() {
    document.getElementById('status').innerHTML =
      '<span style="color:var(--o-color)">CPU</span> thinking' +
      '<span class="thinking-dot"></span>' +
      '<span class="thinking-dot"></span>' +
      '<span class="thinking-dot"></span>';
    document.getElementById('status').className = 'status-txt';
  }

  /* ── SCORES ── */
  function updateScores(scores) {
    _flash('sX',    scores.X);
    _flash('sO',    scores.O);
    _flash('sDraw', scores.D);
  }

  function _flash(id, value) {
    const el = document.getElementById(id);
    const prev = parseInt(el.textContent) || 0;
    el.textContent = value;
    if (value > prev) {
      el.classList.remove('score-flash');
      void el.offsetWidth;
      el.classList.add('score-flash');
    }
  }

  /* ── ACTIVE TURN HIGHLIGHT ── */
  function setActiveTurn(player) {
    const bx = document.getElementById('scoreBoxX');
    const bo = document.getElementById('scoreBoxO');
    bx.classList.remove('active-turn', 'active-turn-o');
    bo.classList.remove('active-turn', 'active-turn-o');
    if (player === 'X') {
      bx.classList.add('active-turn');
    } else {
      bo.classList.add('active-turn-o');
    }
  }

  /* ── PLAYER LABELS (P1 / CPU etc.) ── */
  function setPlayerLabels(cpuMode) {
    document.getElementById('lblX').textContent = cpuMode ? 'You'   : 'Player 1';
    document.getElementById('lblO').textContent = cpuMode ? 'CPU'   : 'Player 2';
  }

  /* ── DIFFICULTY ROW ── */
  function showDifficultyRow(visible) {
    document.getElementById('diffRow').style.display = visible ? 'flex' : 'none';
  }

  /* ── DIFFICULTY BUTTON HIGHLIGHT ── */
  function setDiffButtons(active) {
    const map = { easy: 'dEasy', medium: 'dMed', hard: 'dHard' };
    ['easy','medium','hard'].forEach(d => {
      const btn = document.getElementById(map[d]);
      btn.className = 'diff-btn' + (d === active ? ' active-' + d : '');
    });
  }

  /* ── HINT TEXT ── */
  function showHint(text) {
    const el = document.getElementById('hintRow');
    el.textContent = text;
    el.classList.remove('hint-anim');
    void el.offsetWidth;
    el.classList.add('hint-anim');
    setTimeout(() => { el.textContent = ''; el.classList.remove('hint-anim'); }, 2700);
  }

  /* ── HISTORY DOTS ── */
  function renderHistory(history) {
    const bar = document.getElementById('histBar');
    bar.innerHTML = history.slice(-30).map(r => {
      const color = r === 'X' ? 'var(--x-color)' : r === 'O' ? 'var(--o-color)' : '#999';
      const label = r === 'X' ? 'X won' : r === 'O' ? 'O won' : 'Draw';
      return `<div class="hist-dot" style="background:${color}" title="${label}"></div>`;
    }).join('');
  }

  /* ── HELPER ── */
  function _cell(i) {
    return document.querySelector(`.cell[data-index="${i}"]`);
  }

  return {
    buildBoard, placeMark, highlightWin, showDraw,
    blockBoard, setStatus, setThinkingStatus,
    updateScores, setActiveTurn, setPlayerLabels,
    showDifficultyRow, setDiffButtons, showHint, renderHistory
  };

})();
