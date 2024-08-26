const http = require('http');
const WebSocket = require('ws');
const { processMove, initializeGame } = require('./gameLogic');

// Create a basic HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running\n');
});

// Initialize WebSocket server instance
const wss = new WebSocket.Server({ server });

let gameState = initializeGame();

wss.on('connection', ws => {
    console.log('New client connected');

    // Send the initial game state to the new client
    ws.send(JSON.stringify({ type: 'init', state: gameState }));

    // Handle messages received from the client
    ws.on('message', message => {
        const command = JSON.parse(message);
        let response;

        if (command.type === 'restart') {
            gameState = initializeGame();
            response = { type: 'init', state: gameState };
        } else {
            response = processMove(gameState, command);
        }

        gameState = response.newState;

        // Broadcast the updated game state to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(response));
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server on port 8080
server.listen(8080, () => {
    console.log('Server is listening on http://localhost:8080');
});







