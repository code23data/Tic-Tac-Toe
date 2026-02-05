# Tic-Tac-Toe
A user-friendly, responsive, web-based interface for the classic Tic-Tac-Toe game. This project blends a minimalist **HTML5/CSS3** UI with a vanilla **JavaScript** engine to handle game logic, turn tracking, and win-state detection.

## Features
The game contains the following features:
- **Grid:** A well structured 3 by 3 grid layout, initially consisting of empty cells, prividing a clean interface for the game.
- **Status Bar:** Real-time updates on whose turn it is and instant notification of wins or draws.
- **Responsive Design:** An interface designed to ensure that the game works on various screen sizes, be it screens of desktops, tablets or smartphones.
- **Move History and Undo:** A built-in move log which records each move made by the players. Also included adjacent to it is an undo button which allows players to backtrack and rethink their strategy.
- **Game Integrity:** Prevents players from making further moves after the game has ended.

## Technical Overview
The application is structured into three core layers:
1. **Structure (`index.html`):** Semantic layout, structure and game containers.
2. **Aesthetics (`style.css`):** Modern, responsive styling and interactive hover states. Also manages the responsive design.
3. **Logic (`script.js`):** Manages the logic, state transitions, win-condition algorithms, and the move log.

## Playing the Game
1. **Collect the Files:** Download `index.html`, `style.css`, and `script.js` into a single folder.
2. **Launch:** Double-click `index.html` to open it in your preferred web browser.
3. **Play:** Click any empty cell in the grid to start. Strategize, undo if needed, and aim for the win!
