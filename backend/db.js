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
 
// Queries
// const updateGame = (room, guesses, scores) => {
//   const stringifiedGuesses = JSON.stringify(guesses);
//   const stringifiedScores = JSON.stringify(scores);

//   db.query('UPDATE rooms SET guesses = ${guesses}, scores = ${scores} WHERE room_name = ${room} AND created_at in (select max(created_at) from rooms WHERE room_name = ${room})', {
//     room,
//     guesses: stringifiedGuesses,
//     scores: stringifiedScores,
//   });
// }

// const insertCompletionTimestamp = (room, completed_at) => {
//   db.query('UPDATE rooms SET completed_at = ${completed_at} WHERE room_name = ${room} AND created_at in (select max(created_at) from rooms WHERE room_name = ${room})', {
//     room,
//     completed_at,
//   });
// }

// const getPuzzle = async (room) => db.query('SELECT * FROM rooms WHERE room_name = ${room} AND created_at in (select max(created_at) from rooms WHERE room_name = ${room})', {
//   room,
// });

// const insertPuzzle = (created_at, completed_at, room, board, mappings, guesses, scores) => {
//   console.log('inserting room: ', room)
//   const stringifiedGuesses = JSON.stringify(guesses);
//   const stringifiedScores = JSON.stringify(scores);

//   db.query('INSERT INTO rooms(room_name, board, mappings, created_at, completed_at, guesses, scores) VALUES(${room}, ${board}, ${mappings}, ${created_at}, ${completed_at}, ${guesses}, ${scores})', {
//     room,
//     board,
//     mappings,
//     created_at,
//     completed_at,
//     guesses: stringifiedGuesses,
//     scores: stringifiedScores,
//   });
// }


module.exports = {
  db,
  getValidWords,
  getWord,
  sqrtWordWeight,
  addWord,
}
