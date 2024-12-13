const DEFAULT_PORT = 4000;
const SERVER_CONNECTION_MESSAGE = 'Server Connected At Port Number: ';
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

let packageJsonData = { config: {} };
const cmdCommand = process.argv[2];
const cliPort = cmdCommand && cmdCommand.includes('PORT=') 
    ? cmdCommand.split('PORT=')[1] 
    : null;

// Read package.json if CLI port is not provided
if (!cliPort) {
    try {
        const packageJsonPath = path.join(__dirname, 'package.json');
        const rawData = fs.readFileSync(packageJsonPath, 'utf8');
        packageJsonData = JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading or parsing package.json:', error.message);
    }
}

// Determine the port
let port = Number(cliPort) || packageJsonData?.config?.port || DEFAULT_PORT;
if (isNaN(port) || port < 1 || port > 65535) {
    console.error('Invalid port number. Falling back to default:', DEFAULT_PORT);
    port = DEFAULT_PORT;
}

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    }
    console.log(SERVER_CONNECTION_MESSAGE.concat(port));
});
