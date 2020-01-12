const R = require('ramda');
const { matchPassword, addWordToDb } = require('../queries');

exports.addWord = async (req, res) => {
  const { name, difficulty, password } = req.body;
  if (!password) {
    res.status(422).send({ error: 'permission denied (needs pw)' });
    return;
  }
  const validate = await matchPassword(password);
  if (R.isEmpty(validate)) {
    res.status(422).send({ error: 'permission denied (needs pw)' });
    return;
  }

  const result = await addWordToDb(name, difficulty);
  if (!result) {
    res.status(422).send( { err: `word ${name} already exists.`});
    return;
  }
  res.status(200).send({ success: `word ${name} added` });
};