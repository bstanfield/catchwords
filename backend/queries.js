require('dotenv').config();
const knex = require('knex')({
  client: 'pg',
  asyncStackTraces: true,
  connection: {
    host: '127.0.0.1',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_NAME,
    port: 5432,
  }
});

const addWordToDb = async (name) => {
  const lowerCasedName = name.toLowerCase();
  const retrieved = await knex
    .select('*')
    .from('words')
    .where({ name: lowerCasedName });

  if (!retrieved.length) {
    const result = await knex
      .insert({ name: lowerCasedName })
      .into('words');
    return result;
  } else {
    return false;
  }
}

const getExistingBoard = async (id) => knex.select().from('free_boards').where({ board_id: id });

const saveBoardAndPlayerKeys = async (board) => {
  // deletes boards older than 1 week
  await knex.raw(
    `DELETE FROM boards WHERE timestamp < NOW() - INTERVAL '7 days'`
  );
  return knex.insert(board).into('boards').returning(['board_url']);
};

const getBoardByBoardUrl = async (url) => knex.select().from('boards').where({ board_url: url });

const getRandomWords = async (num) => knex
  .raw(
    `SELECT name FROM words ORDER BY random() LIMIT ${num || 25}`
  );

const updateBoardWord = async (words, board_url) => knex
  .update({ words })
  .from('boards')
  .where({ board_url });

module.exports = {
  addWordToDb,
  getRandomWords,
  getExistingBoard,
  saveBoardAndPlayerKeys,
  getBoardByBoardUrl,
  updateBoardWord,
}
