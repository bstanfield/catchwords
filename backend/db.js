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


module.exports = {
  db,
  getValidWords,
  getWord,
  sqrtWordWeight,
  addWord,
}
