
// const ws = new WebSocket('ws://localhost:8080');

// let selectedPiece = null;

// ws.onopen = () => {
//     console.log('Connected to the WebSocket server');
// };

// ws.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     console.log('Received:', data);

//     if (data.type === 'init') {
//         initializeBoard(data.state);
//     } else if (data.type === 'update') {
//         updateBoard(data.state);
//     } else if (data.type === 'invalid') {
//         alert('Invalid move!');
//     }
// };

// ws.onerror = (error) => {
//     console.error('WebSocket error:', error);
// };

// ws.onclose = () => {
//     console.log('WebSocket connection closed');
// };

// function initializeBoard(state) {
//     const boardDiv = document.getElementById('board');
//     boardDiv.innerHTML = ''; // Reset the board
//     for (let row = 0; row < 5; row++) {
//         for (let col = 0; col < 5; col++) {
//             const cell = document.createElement('div');
//             cell.classList.add('board-cell');
//             cell.dataset.row = row;
//             cell.dataset.col = col;

//             const character = state.board[row][col];
//             if (character) {
//                 cell.textContent = character;
//                 cell.classList.add('occupied');
//                 cell.onclick = () => selectPiece(row, col, character);
//             } else {
//                 cell.onclick = () => movePiece(row, col);
//             }

//             boardDiv.appendChild(cell);
//         }
//     }

//     // Display the current player's turn
//     document.getElementById('current-player').textContent = `Current Player: ${state.currentTurn}`;

//     // Display move history
//     const historyList = document.getElementById('history-list');
//     historyList.innerHTML = '';
//     state.moveHistory.forEach(move => {
//         const li = document.createElement('li');
//         li.textContent = move;
//         historyList.appendChild(li);
//     });

//     // Handle game over
//     if (state.gameOver) {
//         document.getElementById('game-over').style.display = 'block';
//         document.getElementById('winner').textContent = `Player ${state.winner}`;
//     } else {
//         document.getElementById('game-over').style.display = 'none';
//     }
// }

// function updateBoard(state) {
//     initializeBoard(state);
//     selectedPiece = null;
//     document.getElementById('selected').textContent = 'Selected: None';
// }

// function selectPiece(row, col, character) {
//     selectedPiece = { row, col, character };
//     document.getElementById('selected').textContent = `Selected: ${character}`;
// }

// function movePiece(row, col) {
//     if (selectedPiece) {
//         const moveCommand = { from: { row: selectedPiece.row, col: selectedPiece.col }, to: { row, col } };
//         ws.send(JSON.stringify(moveCommand));
//         selectedPiece = null;
//         document.getElementById('selected').textContent = 'Selected: None';
//     }
// }

// function restartGame() {
//     ws.send(JSON.stringify({ type: 'restart' }));
// }








// const gameBoard = document.getElementById('game-board');
// let gameState = initializeGame();

// // Render the game board
// function renderBoard(state) {
//     gameBoard.innerHTML = ''; // Clear the board
//     state.board.forEach((row, rowIndex) => {
//         row.forEach((cell, colIndex) => {
//             const cellDiv = document.createElement('div');
//             cellDiv.classList.add('cell');
//             if (cell) {
//                 const playerClass = cell.startsWith('A') ? 'player-A' : 'player-B';
//                 cellDiv.classList.add(playerClass);
//                 cellDiv.innerText = cell;
//             }
//             gameBoard.appendChild(cellDiv);
//         });
//     });
// }

// // Example of processing a move and updating the board
// function processMoveAndUpdateUI(moveCommand) {
//     const result = processMove(gameState, moveCommand);
//     gameState = result.newState;
//     renderBoard(gameState);
//     if (result.type === 'update') {
//         console.log('Move history:', gameState.moveHistory);
//     }
// }

// // Initial render
// renderBoard(gameState);



const ws = new WebSocket('ws://localhost:8080');

let selectedPiece = null;

ws.onopen = () => {
    console.log('Connected to the WebSocket server');
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received:', data);

    if (data.type === 'init') {
        initializeBoard(data.state);
    } else if (data.type === 'update') {
        updateBoard(data.state);
    } else if (data.type === 'invalid') {
        alert('Invalid move!');
    }
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
};

function initializeBoard(state) {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = ''; // Reset the board
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement('div');
            cell.classList.add('board-cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            const character = state.board[row][col];
            if (character) {
                cell.textContent = character;
                cell.classList.add('occupied');
                cell.onclick = () => selectPiece(row, col, character);
            } else {
                cell.onclick = () => movePiece(row, col);
            }

            boardDiv.appendChild(cell);
        }
    }

    document.getElementById('current-player').textContent = `Current Player: ${state.currentTurn}`;

    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    state.moveHistory.forEach(move => {
        const li = document.createElement('li');
        li.textContent = move;
        historyList.appendChild(li);
    });

    if (state.gameOver) {
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('winner').textContent = `Player ${state.winner}`;
    } else {
        document.getElementById('game-over').style.display = 'none';
    }
}

function updateBoard(state) {
    initializeBoard(state);
    selectedPiece = null;
    document.getElementById('selected').textContent = 'Selected: None';
}

function selectPiece(row, col, character) {
    selectedPiece = { row, col, character };
    document.getElementById('selected').textContent = `Selected: ${character}`;
}

function movePiece(row, col) {
    if (selectedPiece) {
        const moveCommand = { from: { row: selectedPiece.row, col: selectedPiece.col }, to: { row, col } };
        ws.send(JSON.stringify(moveCommand));
        selectedPiece = null;
        document.getElementById('selected').textContent = 'Selected: None';
    }
}

function restartGame() {
    ws.send(JSON.stringify({ type: 'restart' }));
}

