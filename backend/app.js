const express = require('express');
var cors = require('cors')
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const port = 3333;

// websocket
const index = require("./endpoints/index.js");
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  socket.on('message', () => {
    getApiAndEmit(socket);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(4242, () => console.log(`Socket listening on port localhost:4242`));

// end websocket

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
