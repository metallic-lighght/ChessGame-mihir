from flask import Flask, render_template
from flask_sockets import Sockets
from websocket_server import GameWebSocketServer
import os
app = Flask(__name__, template_folder='/server')
sockets = Sockets(app)

# Initialize the WebSocket server
game_server = GameWebSocketServer()

@sockets.route('/game')
def game_socket(ws):
    game_server.handle_client(ws)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
