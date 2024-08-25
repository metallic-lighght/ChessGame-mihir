const socket = io();
let currentPlayer = 'A'; // Example, can be determined by server later

socket.on('connect', () => {
    socket.emit('initialize', { player_a: ['P1', 'H1', 'P2', 'H2', 'P3'], player_b: ['P1', 'H1', 'P2', 'H2', 'P3'] });
});

socket.on('game_state', (board) => {
    renderBoard(board);
});

socket.on('invalid_move', (data) => {
    alert(data.message);
});

function renderBoard(board) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    board.forEach(row => {
        row.forEach(cell => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell ' + (cell ? `player-${cell[0]}` : '');
            cellDiv.textContent = cell || '';
            gameBoard.appendChild(cellDiv);
        });
    });
}
