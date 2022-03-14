require('dotenv').config(); // Configure the user environments
// Project Imports
const Server = require("./models/server");

const server = new Server();

server.listen();    // Start the server