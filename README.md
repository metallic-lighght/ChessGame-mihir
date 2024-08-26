# Turn-Based Chess-like Game with WebSocket Communication

## Overview

This project is a turn-based chess-like game set on a 5x5 grid, utilizing WebSocket communication for real-time interaction between players. The game involves strategic movement of characters, each with unique abilities, and is designed for two players.

## Game Setup

1. **Grid Size**: 5x5
2. **Players**: 2
3. **Teams**: Each player controls a team of 5 characters.
4. **Character Types**:
   - **Pawns**
   - **Hero1**
   - **Hero2**

Players start by arranging their characters on their respective rows.

## Character Types and Movement

### Pawn
- **Movement**: Moves one block in any direction (Left, Right, Forward, Backward).
- **Move Commands**: `L` (Left), `R` (Right), `F` (Forward), `B` (Backward)

### Hero1
- **Movement**: Moves two blocks straight in any direction.
- **Ability**: Can eliminate any opponent’s character in its path.
- **Move Commands**: `L` (Left), `R` (Right), `F` (Forward), `B` (Backward)

### Hero2
- **Movement**: Moves two blocks diagonally in any direction.
- **Ability**: Can eliminate any opponent’s character in its path.
- **Move Commands**: `FL` (Forward-Left), `FR` (Forward-Right), `BL` (Backward-Left), `BR` (Backward-Right)

**Note**: All movements are relative to the player’s perspective.

## WebSocket Communication

The game employs WebSocket for real-time communication between players. Ensure that the WebSocket server is running to enable live interactions.

## Installation and Setup
1. Navigate to the project directory:
    cd /server
2. Install the required dependencies:
   pip install -r requirements.txt
3. Start the WebSocket server:
   python server.py
4. Launch the game client in /client  
