const express = require('express');
var cors = require('cors')
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const port = 3333;

app.use(cors());

const bodyParser = require('body-parser');
const { getExistingBoard } = require('./endpoints/get-existing-board');
const { addWord } = require('./endpoints/add-word');
const { getNewBoard } = require('./endpoints/get-new-board');
const { swapWord } = require('./endpoints/swap-word');

// bodyParser middleware to help parse JSON
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => console.log(`Listening on port localhost:${port}`));
// websocket
const index = require("./endpoints/index.js");
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

server.listen(4242, () => console.log(`Socket listening on port localhost:4242`));

let connections = 0;
io.on("connection", (socket) => {
  console.log('new connection');
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  connections++;
  socket.broadcast.emit('log', connections);

  socket.on('message', (message) => {
    if (message.join) {
      console.log('Joined room: ', message.join);
      socket.join(message.join);
      // io.to(message.join).emit('welcome', `Welcome to room ${message.join}`);
    }

    if (message.alert) {
      io.to(message.id).emit('welcome', `Hello room ${message.id}`);
    }
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.broadcast.emit("FromAPI", response);
};

// end websocket

// Standard messages
app.get('/', (req, res) => {
  res.json({ info: 'Hello world!' })
});

app.get('/api/get-existing-board/:board', async (req, res) => {
  await getExistingBoard(req, res);
});

app.post('/api/add-word', async (req, res) => {
  await addWord(req, res);
});

app.get('/api/get-new-board', async (req, res) => {
  await getNewBoard(req, res);
});

app.get('/api/swap-word/:board/:index', async (req, res) => {
  await swapWord(req, res);
});
