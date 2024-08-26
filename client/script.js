const ws = new WebSocket('ws://localhost:5000/game');

ws.onopen = () => {
    console.log('Connected to the WebSocket server');
};

ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    if (data.error) {
        alert(data.error);
    } else {
        updateGameBoard(data.board);
    }
};

function sendMove(player, character, direction) {
    ws.send(JSON.stringify({
        'move': true,
        'player': player,
        'character': character,
        'direction': direction
    }));
}

function updateGameBoard(board) {
    const boardDiv = document.getElementById('game-board');
    boardDiv.innerHTML = '';  // Clear existing board

    board.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        row.forEach((cell, j) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.textContent = cell;
            rowDiv.appendChild(cellDiv);
        });

        boardDiv.appendChild(rowDiv);
    });
}