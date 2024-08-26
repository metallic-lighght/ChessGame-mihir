class Game:
    def __init__(self):
        self.board = self.initialize_board()
        self.current_turn = 'A'  # Player A starts

    def initialize_board(self):
        # Initial board setup
        return [['' for _ in range(5)] for _ in range(5)]

    def move(self, player, character, direction):
        # Validate and process the move
        # Update the board and game state
        pass

    def is_valid_move(self, player, character, direction):
        # Implement the logic to validate moves
        pass

    def get_game_state(self):
        # Return the current game state as a dict
        return {
            'board': self.board,
            'current_turn': self.current_turn
        }