const R = require('ramda');
const knex = require('knex')({
  client: 'pg',
  asyncStackTraces: true,
  connection: {
    host: '35.236.47.240',
    user: 'postgres',
    password: 'basicallycodenames',
    database: 'postgres',
    port: 5432,
  }
});

const getWords = async (req, res) => {
  const results = await knex.select('*').from('words');
  res.status(200).json(results);
};

const addWordToDb = async (name, difficulty) => { 
  const lowerCasedName = R.toLower(name);
  const retrieved = await knex
    .select('*')
    .from('words')
    .where({ name: lowerCasedName });
  
  if (R.isEmpty(retrieved)) {
    const result = await knex
      .insert({ name: lowerCasedName, difficulty })
      .into('words');
    return result;
  } else {
    return false;
  }
}

const postWordScript = R.curry(async (name, difficulty) => knex
  .insert({ name, difficulty })
  .into('words'));

const matchPassword = async (pw) => knex
  .select('password')
  .from('passwords')
  .where({ password: pw });

const getRandomWords = async (num) => knex
  .raw(
    `SELECT name FROM words ORDER BY random() LIMIT ${num || 25}`
  );

const addBoardToDb = async () => knex
    .insert(board)
    .into('boards');

module.exports = {
  getWords,
  addWordToDb,
  postWordScript,
  matchPassword,
  getRandomWords,
  addBoardToDb,
}
