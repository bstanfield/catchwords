const { getValidWords, addWord } = require("../db");

exports.addWord = async (req, res) => {
  const { word, weight } = req.body;

  const wordObjs = await getValidWords();
  // i.e. { word: 'Ben', weight: 1, id: 99 }
  const justWords = wordObjs.map(obj => obj.word);

  if (justWords.includes(word)) {
    return res.status(422).send('Error: word already exists in database');
  }
  
  addWord(word, weight);
  res.status(200).send({ success: `word ${word} added` });
};