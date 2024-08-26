import json
from game_logic import Game

class GameWebSocketServer:
    def __init__(self):
        self.clients = []
        self.game = Game()

    def handle_client(self, ws):
        self.clients.append(ws)
        while not ws.closed:
            message = ws.receive()
            if message:
                self.process_message(ws, message)

    def process_message(self, ws, message):
        data = json.loads(message)
        if 'move' in data:
            # Process the player's move
            player = data['player']
            character = data['character']
            direction = data['direction']

            if self.game.is_valid_move(player, character, direction):
                self.game.move(player, character, direction)
                self.broadcast_game_state()
            else:
                self.send_invalid_move(ws)

    def broadcast_game_state(self):
        game_state = json.dumps(self.game.get_game_state())
        for client in self.clients:
            client.send(game_state)

    def send_invalid_move(self, ws):
        ws.send(json.dumps({'error': 'Invalid move'}))