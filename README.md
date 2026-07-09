# Tic Tac Toe — v2

A fully responsive Tic Tac Toe game built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies.

## Features

- 2 Player local mode
- vs CPU mode with 3 difficulty levels
  - **Easy** — random moves
  - **Medium** — smart but beatable
  - **Hard** — perfect minimax AI (unbeatable)
- Score tracking across rounds (X wins, O wins, Draws)
- Game history dots (last 30 games)
- Dark mode support (auto via system preference)
- Fully responsive — works on mobile, tablet, desktop

## Project Structure

```
tictactoe/
│
├── index.html              ← Main HTML, links all CSS and JS
│
├── css/
│   ├── reset.css           ← Base browser reset
│   ├── variables.css       ← Design tokens (colors, fonts, spacing)
│   ├── layout.css          ← Page and section layout
│   ├── components.css      ← Buttons, cards, cells, marks
│   ├── animations.css      ← All keyframe animations
│   └── responsive.css      ← Mobile breakpoints
│
└── js/
    ├── game.js             ← Core game state and logic (no DOM)
    ├── ai.js               ← CPU player, minimax algorithm
    ├── ui.js               ← All DOM rendering and updates
    └── app.js              ← Main controller, wires everything together
```

## How to Run Locally

### Option 1 — VS Code Live Server (recommended)
1. Install [VS Code](https://code.visualstudio.com)
2. Install the **Live Server** extension by Ritwick Dey
3. Open the `tictactoe/` folder in VS Code
4. Right-click `index.html` → **Open with Live Server**

### Option 2 — Python
```bash
cd tictactoe
python -m http.server 8000
# Open http://localhost:8000
```

### Option 3 — Node.js
```bash
cd tictactoe
npx serve .
```

> Do not open `index.html` by double-clicking — browsers block JS features on `file://` URLs.

## How to Deploy (Netlify)

1. Go to [netlify.com](https://netlify.com) and create a free account
2. Drag and drop the `tictactoe/` folder onto the Netlify dashboard
3. Your site goes live instantly at a `*.netlify.app` URL

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, grid, animations) |
| Logic | Vanilla JavaScript (ES6 modules pattern) |
| Font | Space Grotesk + Space Mono (Google Fonts) |
| AI | Minimax algorithm |

## Admin / Game Controls

| Button | Action |
|---|---|
| **↺ New Round** | Clears the board, keeps scores |
| **Reset Scores** | Clears board and all scores |
| **2 Players / vs CPU** | Switch game mode |
| **Easy / Medium / Hard** | Switch CPU difficulty (CPU mode only) |

---

Built by Shashank · Kanpur, India
