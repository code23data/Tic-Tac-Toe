const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const logContainer = document.getElementById('moveLog');

let playerTurn = "X"; // Assume that the first player plays "X"
let boardData = Array(9).fill("");
let isGameActive = true;
let historyStack = []; // Stores move objects for Undo

// Array to store all the winning combinations
const WIN_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Main Click Handler
const handleSquareClick = (event) => {
    const square = event.target;
    const squareIndex = square.getAttribute('data-index');

    if (boardData[squareIndex] !== "" || !isGameActive) return;

    recordMove(squareIndex);
    updateSquare(square, squareIndex);
    evaluateGame();
};

function recordMove(index) {
    // Save state before current player finishes turn
    historyStack.push({
        player: playerTurn,
        index: index
    });

    // Add to Sidebar UI
    const logItem = document.createElement('li');
    logItem.innerHTML = `<strong>${playerTurn}</strong> moved to #${parseInt(index) + 1}`;
    logContainer.appendChild(logItem);
    logContainer.scrollTop = logContainer.scrollHeight;
}

function updateSquare(element, index) {
    boardData[index] = playerTurn;
    element.innerText = playerTurn;
    element.classList.add('taken');
    element.style.color = playerTurn === "X" ? "blue" : "red";
}

function evaluateGame() {
    let hasWon = false;

    for (let combo of WIN_COMBOS) {
        const [a, b, c] = combo;
        if (boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
            hasWon = true;
            break;
        }
    }

    if (hasWon) {
        statusText.innerText = `Player ${playerTurn} Wins!!`;
        isGameActive = false;
        return;
    }

    if (!boardData.includes("")) {
        statusText.innerText = "The Game is a Draw!";
        isGameActive = false;
        return;
    }

    // Switch turns
    playerTurn = playerTurn === "X" ? "O" : "X";
    statusText.innerText = `Turn: Player ${playerTurn}`;
}

function revertMove() {
    if (historyStack.length === 0 || !isGameActive) return;

    const lastMove = historyStack.pop();

    // Reset Data
    boardData[lastMove.index] = "";
    playerTurn = lastMove.player;

    // Reset UI Square
    const cellElement = document.querySelector(`[data-index="${lastMove.index}"]`);
    cellElement.innerText = "";
    cellElement.classList.remove('taken');

    // Reset UI Sidebar & Status
    logContainer.removeChild(logContainer.lastChild);
    statusText.innerText = `Turn: Player ${playerTurn}`;
}

function resetGame() {
    playerTurn = "X";
    boardData = Array(9).fill("");
    isGameActive = true;
    historyStack = [];
    statusText.innerText = "Turn: Player X";
    logContainer.innerHTML = "";

    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('taken');
    });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleSquareClick));
document.getElementById('undoBtn').addEventListener('click', revertMove);
document.getElementById('resetBtn').addEventListener('click', resetGame);
