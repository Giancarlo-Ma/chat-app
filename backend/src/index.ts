import express from 'express';
import { WebSocketServer } from 'ws';
import { generateRandomPushMsg } from './util';

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});
const rooms = [
  { id: 1, name: 'General Chat', createdAt: new Date() },
  { id: 2, name: 'Random Chat', createdAt: new Date() },
];

// Routes
app.get('/api/rooms', (req, res) => {
  res.json(rooms);
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


const wss = new WebSocketServer({ server });

// Broadcast function to send updates to all connected clients
const broadcast = (message: any) => {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

// Set interval to send room updates every 30 seconds
setInterval(() => {
  const updateMessage = generateRandomPushMsg()
  broadcast(updateMessage);
}, 30000);

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');

  // Handle messages received from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Add handling for different message types if needed
  });

  // Send initial room update to new clients
  ws.send(JSON.stringify(generateRandomPushMsg()));
});