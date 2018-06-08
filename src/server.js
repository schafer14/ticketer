const app = require('./express');
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

const io = require('./ws')(wss);

const port = process.env.PORT  || 3555;

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
