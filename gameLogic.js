// // server/gameLogic.js

// // Initialize the game state
// function initializeGame() {
//     return {
//         board: [
//             ['A-P1', 'A-P2', 'A-H1', 'A-H2', 'A-P3'],
//             [null, null, null, null, null],
//             [null, null, null, null, null],
//             [null, null, null, null, null],
//             ['B-P1', 'B-P2', 'B-H1', 'B-H2', 'B-P3']
//         ],
//         currentTurn: 'A',
//         moveHistory: [],
//         gameOver: false,
//         winner: null,
//     };
// }

// // Process a move
// function processMove(gameState, moveCommand) {
//     const { from, to } = moveCommand;
//     const piece = gameState.board[from.row][from.col];

//     if (!piece || !piece.startsWith(gameState.currentTurn)) {
//         return { newState: gameState, type: 'invalid' };
//     }

//     const targetPiece = gameState.board[to.row][to.col];

//     // Validate move
//     if (!validateMove(gameState, piece, from, to)) {
//         return { newState: gameState, type: 'invalid' };
//     }

//     // Execute the move
//     gameState.board[from.row][from.col] = null;
//     gameState.board[to.row][to.col] = piece;

//     // Handle capturing an opponent's piece
//     if (targetPiece) {
//         gameState.moveHistory.push(`${piece}: ${getMoveDirection(from, to)} (Captured ${targetPiece})`);
//     } else {
//         gameState.moveHistory.push(`${piece}: ${getMoveDirection(from, to)}`);
//     }

//     // Check for game over
//     if (isGameOver(gameState)) {
//         gameState.gameOver = true;
//         gameState.winner = gameState.currentTurn;
//     } else {
//         // Switch turn
//         gameState.currentTurn = gameState.currentTurn === 'A' ? 'B' : 'A';
//     }

//     return { newState: gameState, type: 'update' };
// }

// // Validate moves based on the piece type
// function validateMove(gameState, piece, from, to) {
//     const moveDirection = getMoveDirection(from, to);

//     switch (piece.split('-')[1]) {
//         case 'P1':
//         case 'P2':
//         case 'P3':
//             return validatePawnMove(from, to, moveDirection);
//         case 'H1':
//             return validateHero1Move(gameState, from, to, moveDirection);
//         case 'H2':
//             return validateHero2Move(gameState, from, to, moveDirection);
//         default:
//             return false;
//     }
// }

// // Determine the direction of the move
// function getMoveDirection(from, to) {
//     const rowDiff = to.row - from.row;
//     const colDiff = to.col - from.col;

//     if (rowDiff === 0 && colDiff === -1) return 'L';
//     if (rowDiff === 0 && colDiff === 1) return 'R';
//     if (rowDiff === -1 && colDiff === 0) return 'F';
//     if (rowDiff === 1 && colDiff === 0) return 'B';
//     if (rowDiff === -2 && colDiff === -2) return 'FL';
//     if (rowDiff === -2 && colDiff === 2) return 'FR';
//     if (rowDiff === 2 && colDiff === -2) return 'BL';
//     if (rowDiff === 2 && colDiff === 2) return 'BR';
//     return null;
// }

// // Validation logic for Pawn moves
// function validatePawnMove(from, to, moveDirection) {
//     const validMoves = ['L', 'R', 'F', 'B'];
//     return validMoves.includes(moveDirection) && isMoveWithinBounds(to);
// }

// // Validation logic for Hero1 moves
// function validateHero1Move(gameState, from, to, moveDirection) {
//     const validMoves = ['L', 'R', 'F', 'B'];
//     if (validMoves.includes(moveDirection) && Math.abs(from.row - to.row) <= 2 && Math.abs(from.col - to.col) <= 2) {
//         return checkPathClear(gameState, from, to, moveDirection, 2);
//     }
//     return false;
// }

// // Validation logic for Hero2 moves
// function validateHero2Move(gameState, from, to, moveDirection) {
//     const validMoves = ['FL', 'FR', 'BL', 'BR'];
//     if (validMoves.includes(moveDirection) && Math.abs(from.row - to.row) === 2 && Math.abs(from.col - to.col) === 2) {
//         return checkPathClear(gameState, from, to, moveDirection, 2);
//     }
//     return false;
// }

// // Check if the path is clear for Hero1 and Hero2
// function checkPathClear(gameState, from, to, moveDirection, steps) {
//     const rowStep = (to.row - from.row) / steps;
//     const colStep = (to.col - from.col) / steps;

//     for (let i = 1; i < steps; i++) {
//         const intermediateRow = from.row + rowStep * i;
//         const intermediateCol = from.col + colStep * i;

//         if (gameState.board[intermediateRow][intermediateCol]) {
//             return false;
//         }
//     }
//     return true;
// }

// // Check if the position is within bounds
// function isMoveWithinBounds(position) {
//     return position.row >= 0 && position.row < 5 && position.col >= 0 && position.col < 5;
// }

// // Determine if the game is over
// function isGameOver(gameState) {
//     const opponent = gameState.currentTurn === 'A' ? 'B' : 'A';
//     const opponentPieces = gameState.board.flat().filter(piece => piece && piece.startsWith(opponent));
//     return opponentPieces.length === 0;
// }

// module.exports = { initializeGame, processMove };








// Initialize the game state
// function initializeGame() {
//     return {
//         board: [
//             ['A-P1', 'A-P2', 'A-H1', 'A-H2', 'A-P3'],
//             [null, null, null, null, null],
//             [null, null, null, null, null],
//             [null, null, null, null, null],
//             ['B-P1', 'B-P2', 'B-H1', 'B-H2', 'B-P3']
//         ],
//         currentTurn: 'A',
//         moveHistory: [],
//         gameOver: false,
//         winner: null,
//     };
// }

// // Process a move
// function processMove(gameState, moveCommand) {
//     const { from, to } = moveCommand;
//     const piece = gameState.board[from.row][from.col];

//     if (!piece || !piece.startsWith(gameState.currentTurn)) {
//         return { newState: gameState, type: 'invalid' };
//     }

//     const targetPiece = gameState.board[to.row][to.col];

//     // Validate move
//     if (!validateMove(gameState, piece, from, to)) {
//         return { newState: gameState, type: 'invalid' };
//     }

//     // Execute the move
//     gameState.board[from.row][from.col] = null;
//     gameState.board[to.row][to.col] = piece;

//     // Handle capturing an opponent's piece
//     if (targetPiece) {
//         gameState.moveHistory.push(`${piece}: ${getMoveDirection(from, to)} (Captured ${targetPiece})`);
//     } else {
//         gameState.moveHistory.push(`${piece}: ${getMoveDirection(from, to)}`);
//     }

//     // Check if the game is over
//     const opponentPrefix = gameState.currentTurn === 'A' ? 'B' : 'A';
//     const opponentHasCharacters = gameState.board.flat().some(c => c && c.startsWith(opponentPrefix));

//     if (!opponentHasCharacters) {
//         gameState.gameOver = true;
//         gameState.winner = gameState.currentTurn;
//     } else {
//         // Switch turns
//         gameState.currentTurn = opponentPrefix;
//     }

//     return { newState: gameState, type: 'update' };
// }

// // Validate move based on character type and movement rules
// function validateMove(gameState, piece, from, to) {
//     const characterType = piece.split('-')[1];

//     const rowDiff = to.row - from.row;
//     const colDiff = to.col - from.col;

//     switch (characterType) {
//         case 'P1':
//         case 'P2':
//         case 'P3': // Pawn movement: 1 block in any direction
//             return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;

//         case 'H1': // Hero1 movement: 2 blocks straight
//             return (Math.abs(rowDiff) === 2 && colDiff === 0) || (Math.abs(colDiff) === 2 && rowDiff === 0);

//         case 'H2': // Hero2 movement: 2 blocks diagonally
//             return Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2;

//         default:
//             return false;
//     }
// }

// // Determine the direction of the move for logging purposes
// function getMoveDirection(from, to) {
//     const rowDiff = to.row - from.row;
//     const colDiff = to.col - from.col;

//     if (rowDiff === 0 && colDiff === -1) return 'L';
//     if (rowDiff === 0 && colDiff === 1) return 'R';
//     if (rowDiff === -1 && colDiff === 0) return 'F';
//     if (rowDiff === 1 && colDiff === 0) return 'B';

//     if (rowDiff === -2 && colDiff === -2) return 'FL';
//     if (rowDiff === -2 && colDiff === 2) return 'FR';
//     if (rowDiff === 2 && colDiff === -2) return 'BL';
//     if (rowDiff === 2 && colDiff === 2) return 'BR';

//     return 'Unknown';
// }

// module.exports = { initializeGame, processMove };





// Initialize the game state
function initializeGame() {
    return {
        board: [
            ['A-P1', 'A-P2', 'A-H1', 'A-H2', 'A-P3'],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            ['B-P1', 'B-P2', 'B-H1', 'B-H2', 'B-P3']
        ],
        currentTurn: 'A',
        moveHistory: [],
        gameOver: false,
        winner: null,
    };
}

// Process a move
function processMove(gameState, moveCommand) {
    const { from, to } = moveCommand;
    const piece = gameState.board[from.row][from.col];

    if (!piece || !piece.startsWith(gameState.currentTurn)) {
        return { newState: gameState, type: 'invalid' };
    }

    const targetPiece = gameState.board[to.row][to.col];

    if (!validateMove(gameState, piece, from, to)) {
        return { newState: gameState, type: 'invalid' };
    }

    gameState.board[from.row][from.col] = null;
    gameState.board[to.row][to.col] = piece;

    if (targetPiece) {
        gameState.moveHistory.push(`${piece}: ${getMoveDirection(from, to)} (Captured ${targetPiece})`);
    } else {
        gameState.moveHistory.push(`${piece}: ${getMoveDirection(from, to)}`);
    }

    const opponentPrefix = gameState.currentTurn === 'A' ? 'B' : 'A';
    const opponentHasCharacters = gameState.board.flat().some(c => c && c.startsWith(opponentPrefix));

    if (!opponentHasCharacters) {
        gameState.gameOver = true;
        gameState.winner = gameState.currentTurn;
    } else {
        gameState.currentTurn = opponentPrefix;
    }

    return { newState: gameState, type: 'update' };
}

// Validate move based on character type and movement rules
function validateMove(gameState, piece, from, to) {
    const characterType = piece.split('-')[1];

    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;

    switch (characterType) {
        case 'P1':
        case 'P2':
        case 'P3': // Pawn movement: 1 block in any direction
            return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;

        case 'H1': // Hero1 movement: 2 blocks straight
            return (Math.abs(rowDiff) === 2 && colDiff === 0) || (Math.abs(colDiff) === 2 && rowDiff === 0);

        case 'H2': // Hero2 movement: 2 blocks diagonally
            return Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2;

        default:
            return false;
    }
}

// Determine the direction of the move for logging purposes
function getMoveDirection(from, to) {
    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;

    if (rowDiff === 0 && colDiff === -1) return 'L';
    if (rowDiff === 0 && colDiff === 1) return 'R';
    if (rowDiff === -1 && colDiff === 0) return 'F';
    if (rowDiff === 1 && colDiff === 0) return 'B';

    if (rowDiff === -2 && colDiff === -2) return 'FL';
    if (rowDiff === -2 && colDiff === 2) return 'FR';
    if (rowDiff === 2 && colDiff === -2) return 'BL';
    if (rowDiff === 2 && colDiff === 2) return 'BR';

    return null;
}


module.exports = { initializeGame, processMove };