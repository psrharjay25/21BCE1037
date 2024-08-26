Game Setup Instructions

Prerequisites

Before running the game, ensure that you have the following installed on your system:

	•	Node.js (version 14 or higher)
	•	Git (for cloning the repository)

Step 1: Clone the Repository
First, clone the repository from GitHub to your local machine using the following command:
        git clone https://github.com/your-username/your-repository-name.git

Replace your-username and your-repository-name with your actual GitHub username and repository name.

Step 2: Navigate to the Project Directory
After cloning the repository, navigate to the project directory:
        cd your-repository-name

Step 3: Install Dependencies
Install the necessary Node.js dependencies using npm:
        npm install

This will install the required packages, including the ws WebSocket library.

Step 4: Start the Server
To start the game server, run the following command:
        node server/server.js

This will start the server and it will be listening on http://localhost:8080.

Step 5: Run the Client
To play the game, open the index.html file in your browser. You can either open it directly from your file explorer or use a simple HTTP server to serve the file.
If you prefer using a local server, you can use the Live Server extension in VSCode or install a simple HTTP server via npm:
       npm install -g http-server
       http-server -c-1 ./client

Then, open your browser and navigate to http://localhost:8080 (or the URL provided by http-server).

Step 6: Play the Game
Once both the server and client are running, you can start playing the game. Follow the game rules displayed on the interface, and enjoy the game!
