class Game:
    def __init__(self):
        self.board = [["" for _ in range(5)] for _ in range(5)]
        self.players = {"A": [], "B": []}
        self.current_turn = "A"
        self.game_over = False

    def initialize_game(self, player_a, player_b):
        self.players["A"] = player_a
        self.players["B"] = player_b
        self.setup_board()

    def setup_board(self):
        for i in range(5):
            self.board[0][i] = f"A-{self.players['A'][i]}"
            self.board[4][i] = f"B-{self.players['B'][i]}"

    def move_character(self, player, character, direction):
        # Implement move logic here, including invalid move checks and capturing opponent characters.
        pass

    def check_winner(self):
        # Implement logic to check if a player has won the game.
        pass

    def get_board_state(self):
        return self.board

    def next_turn(self):
        self.current_turn = "B" if self.current_turn == "A" else "A"
