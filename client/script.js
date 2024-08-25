const gameBoard = document.getElementById('game-board');
const moveOptions = document.getElementById('move-options');
const turnIndicator = document.getElementById('turn-indicator');
const moveHistory = document.getElementById('move-history');
const resetButton = document.getElementById('reset-button');

let gameState = null;
let selectedPiece = null;

const socket = new WebSocket(`ws://${window.location.host}`);

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'gameState') {
        gameState = message.data;
        renderGameBoard();
        updateTurnIndicator();
    }
};

function renderGameBoard() {
    gameBoard.innerHTML = '';
    gameState.board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell || '';
            cellElement.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
            gameBoard.appendChild(cellElement);
        });
    });
}

function handleCellClick(row, col) {
    const piece = gameState.board[row][col];
    if (piece && piece.startsWith(gameState.currentPlayer)) {
        selectedPiece = { row, col, piece };
        showMoveOptions(piece);
    } else if (selectedPiece) {
        // Implement move logic here
        console.log(`Move ${selectedPiece.piece} to (${row}, ${col})`);
        // Send move to server
        socket.send(JSON.stringify({
            type: 'move',
            move: { from: selectedPiece, to: { row, col } }
        }));
        selectedPiece = null;
        moveOptions.innerHTML = '';
    }
}

function showMoveOptions(piece) {
    moveOptions.innerHTML = '';
    const moves = getMoveOptions(piece);
    moves.forEach(move => {
        const button = document.createElement('button');
        button.textContent = move;
        button.addEventListener('click', () => handleMove(move));
        moveOptions.appendChild(button);
    });
}

function getMoveOptions(piece) {
    // Implement this function based on the piece type
    // Return an array of valid move options
    return ['L', 'R', 'F', 'B'];
}

function handleMove(move) {
    // Implement move logic here
    console.log(`Move ${selectedPiece.piece} ${move}`);
    // Send move to server
    socket.send(JSON.stringify({
        type: 'move',
        move: { piece: selectedPiece, direction: move }
    }));
    selectedPiece = null;
    moveOptions.innerHTML = '';
}

function updateTurnIndicator() {
    turnIndicator.textContent = `Current Turn: Player ${gameState.currentPlayer}`;
}

resetButton.addEventListener('click', () => {
    socket.send(JSON.stringify({ type: 'reset' }));
});

// Initial render
renderGameBoard();