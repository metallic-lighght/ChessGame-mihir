const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Game state
let gameState = {
  board: Array(5).fill().map(() => Array(5).fill(null)),
  currentPlayer: 'A',
  players: {},
  gameOver: false
};

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Assign player identifier (A or B)
  const playerId = Object.keys(gameState.players).length === 0 ? 'A' : 'B';
  gameState.players[playerId] = ws;

  // Send initial game state
  ws.send(JSON.stringify({ type: 'gameState', data: gameState }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'move':
        handleMove(data.move, playerId);
        break;
      case 'reset':
        resetGame();
        break;
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    delete gameState.players[playerId];
    if (Object.keys(gameState.players).length === 0) {
      resetGame();
    }
  });
});

function handleMove(move, playerId) {
  // Implement move validation and game state update logic here
  // This is a placeholder implementation
  if (gameState.currentPlayer === playerId && !gameState.gameOver) {
    // Update game state based on the move
    // Check for game over conditions
    // Switch current player
    gameState.currentPlayer = gameState.currentPlayer === 'A' ? 'B' : 'A';

    // Broadcast updated game state to all clients
    broadcastGameState();
  }
}

function resetGame() {
  gameState = {
    board: Array(5).fill().map(() => Array(5).fill(null)),
    currentPlayer: 'A',
    players: gameState.players,
    gameOver: false
  };
  broadcastGameState();
}

function broadcastGameState() {
  const message = JSON.stringify({ type: 'gameState', data: gameState });
  Object.values(gameState.players).forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});