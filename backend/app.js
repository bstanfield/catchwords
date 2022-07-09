const express = require('express');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 3333;
const http = require("http");
const socketIo = require("socket.io")
const index = require("./routes/index");

app.use(cors());

const bodyParser = require('body-parser');
const { getExistingBoard } = require('./endpoints/get-existing-board');
const { addWord } = require('./endpoints/add-word');
const { getNewBoard } = require('./endpoints/get-new-board');
const { swapWord } = require('./endpoints/swap-word');
const { updateGuesses } = require('./endpoints/update-guesses');
const { updateTurn } = require('./endpoints/update-turn');
const { getBoards } = require('./endpoints/get-boards');
const { getWords } = require('./endpoints/get-words');

app.use(bodyParser.json());
app.use(index);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Socket
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

console.log('Socket server starting!');
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

app.listen(port, () => console.log(`Listening on port localhost:${port}`));

// Standard messages
app.get('/api/get-existing-board/:board', async (req, res) => {
  await getExistingBoard(req, res);
});

app.post('/api/add-word', async (req, res) => {
  await addWord(req, res);
});

app.get('/api/get-words', async (req, res) => {
  await getWords(req, res);
});

app.post('/api/update-guesses', async (req, res) => {
  await updateGuesses(req, res);
});

app.post('/api/update-turn', async (req, res) => {
  await updateTurn(req, res);
});

app.get('/api/get-new-board', async (req, res) => {
  await getNewBoard(req, res);
});

app.get('/api/get-boards', async (req, res) => {
  await getBoards(req, res);
});

app.get('/api/swap-word/:id/:index', async (req, res) => {
  await swapWord(req, res);
});
