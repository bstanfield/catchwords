const R = require('ramda');
const knex = require('knex')({
  client: 'pg',
  asyncStackTraces: true,
  connection: {
    host: '127.0.0.1',
    user: 'ben',
    password: '',
    database: 'catchwords_local',
    port: 5432,
  }
});

const getWords = async (req, res) => {
  const results = await knex.select('*').from('words');
  res.status(200).json(results);
};

const addWordToDb = async (name) => {
  const lowerCasedName = R.toLower(name);
  const retrieved = await knex
    .select('*')
    .from('words')
    .where({ name: lowerCasedName });

  if (R.isEmpty(retrieved)) {
    const result = await knex
      .insert({ name: lowerCasedName })
      .into('words');
    return result;
  } else {
    return false;
  }
}

// for simple free endpoint
const saveBoardId = async (words) => knex.insert({ words_array: words }).into('free_boards').returning('board_id');
const getExistingBoard = async (id) => knex.select().from('free_boards').where({ board_id: id });

// for app
const saveBoardAndPlayerKeys = async (board) => {
  await knex.raw(
    `DELETE FROM boards WHERE timestamp < NOW() - INTERVAL '7 days'`
  );
  return knex.insert(board).into('boards').returning(['board_url']);
};

const getBoardByBoardUrl = async (url) => knex.select().from('boards').where({ board_url: url });

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

const updateBoardWord = async (words, board_url) => knex
  .update({ words })
  .from('boards')
  .where({ board_url });

module.exports = {
  getWords,
  addWordToDb,
  postWordScript,
  matchPassword,
  getRandomWords,
  addBoardToDb,
  saveBoardId,
  getExistingBoard,
  saveBoardAndPlayerKeys,
  getBoardByBoardUrl,
  updateBoardWord,
}
