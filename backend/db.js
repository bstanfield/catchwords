const dotenv = require('dotenv');
dotenv.config();

const pgp = require('pg-promise')({
  // Init details
});

const cn = process.env.DATABASE_URL;
const testing = process.env.TESTING;

const db = pgp({
  connectionString: cn,
  ssl:{
      rejectUnauthorized: false
    },
});

const getValidWords = async () => db.query('SELECT * FROM words');

const getWord = async (word) => db.query(`SELECT * FROM words WHERE word = ${word}`)

const sqrtWordWeight = (word) => db.query(`UPDATE words SET weight = SQRT(weight) WHERE word = '${word}'`);

const addWord = (word, weight = 1) => db.query(`INSERT INTO words(word, weight) VALUES('${word}', ${weight})`);

const addBoard = (id, board) => db.query(`INSERT INTO boards(board_id, words, red, blue, red_guesses, blue_guesses, turn_count) VALUES( '${id}', '${JSON.stringify(board.words)}', '${JSON.stringify(board.red)}', '${JSON.stringify(board.blue)}', '${JSON.stringify(board.redGuesses)}', '${JSON.stringify(board.blueGuesses)}', ${board.turnCount})`);

const getBoard = async (id) => db.query(`SELECT * FROM boards WHERE board_id = '${id}'`);

const getBoards = async () => db.query(`SELECT * FROM boards`);

module.exports = {
  db,
  getValidWords,
  getWord,
  sqrtWordWeight,
  addWord,
  addBoard,
  getBoard,
  getBoards
}
