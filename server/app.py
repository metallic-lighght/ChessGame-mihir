from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from game import Game

app = Flask(__name__)
socketio = SocketIO(app)
game = Game()

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('initialize')
def handle_initialize(data):
    player_a = data['player_a']
    player_b = data['player_b']
    game.initialize_game(player_a, player_b)
    emit('game_state', game.get_board_state(), broadcast=True)

@socketio.on('move')
def handle_move(data):
    player = data['player']
    character = data['character']
    direction = data['direction']
    if game.current_turn == player and not game.game_over:
        game.move_character(player, character, direction)
        game.check_winner()
        game.next_turn()
        emit('game_state', game.get_board_state(), broadcast=True)
    else:
        emit('invalid_move', {"message": "Invalid move!"}, room=request.sid)

if __name__ == '__main__':
    socketio.run(app)
