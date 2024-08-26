from flask import Flask, render_template
from flask_sockets import Sockets
from websocket_server import GameWebSocketServer

app = Flask(__name__)
sockets = Sockets(app)

# Initialize the WebSocket server
game_server = GameWebSocketServer()

@sockets.route('/game')
def game_socket(ws):
    game_server.handle_client(ws)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)