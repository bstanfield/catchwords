const R = require('ramda');
const knex = require('knex')({
  client: 'pg',
  asyncStackTraces: true,
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'basicallycodenames',
    database: 'postgres',
    port: 8888,
  }
});

const getWords = async (req, res) => {
  const results = await knex.select('*').from('words');
  res.status(200).json(results);
};

const postWord = async (req, res) => {
  const { name, difficulty } = req.body;
  const result = await knex
    .insert({ name, difficulty })
    .into('words');
  res.status(200).json(result);
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

module.exports = {
  getWords,
  postWord,
  postWordScript,
  matchPassword,
  getRandomWords,
}