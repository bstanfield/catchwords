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

// for simple free endpoint
const saveBoardId = async (words) => knex.insert({ words_array: words }).into('free_boards').returning('board_id');
const getExistingBoard = async (id) => knex.select().from('free_boards').where({ board_id: id });

// for app
const saveBoardAndPlayerKeys = async (board) => {
  const selectedRows = knex.raw(
    `SELECT * FROM boards WHERE ts_insert < now()`
  );
  console.log('satisfies timestamp: ', selectedRows.rows);
  return knex.insert(board).into('boards').returning(['board_id', 'board_url']);
}

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
}
