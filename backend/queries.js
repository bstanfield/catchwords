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

const updateTurn = async (turn_count, board_url) => {
  await knex
    .update({ turn_count })
    .from('boards')
    .where({ board_url });
}

const updateGuessesArr = async (player, board_url, guessesArr) => {
  if (player == 'red') {
    await knex
      .update({ red_guesses: guessesArr })
      .from('boards')
      .where({ board_url });
  } else {
    await knex
      .update({ blue_guesses: guessesArr })
      .from('boards')
      .where({ board_url });
  }
}

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

const updateBoardWord = async (words, board_url) => knex
  .update({ words })
  .from('boards')
  .where({ board_url });

module.exports = {
  addWordToDb,
  getExistingBoard,
  saveBoardAndPlayerKeys,
  getBoardByBoardUrl,
  updateBoardWord,
  updateGuessesArr,
  updateTurn,
}
