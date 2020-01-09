const R = require('ramda');
const { matchPassword, getRandomWords } = require('../queries');

// 0 = neutral (13)
// 1 = correct (9)
// 2 = assassin (3)

const getRandomNum = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

const countOccurences = (max, number, arr) => R.equals(
  max,
  R.reduce((i, num) => num === number ? i + 1 : i, 0, arr),
);

const addTile = (arr) => {
  const neutral = countOccurences(13, 0, arr);
  const correct = countOccurences(9, 1, arr);
  const assassin = countOccurences(3, 2, arr);

  if (assassin && correct) {
    return R.append(0, arr);
  } else if (assassin && neutral) {
    return R.append(1, arr);
  } else if (neutral && correct) {
    return R.append(2, arr);
  } else if (assassin) {
    return R.append(getRandomNum(1, 0), arr);
  } else if (neutral) {
    return R.append(getRandomNum(2, 1), arr);
  } else if (correct) {
    return Math.random() < 0.5 ? 0 : 2;
  } else {
    return R.append(getRandomNum(2, 0), arr);
  }
}

const getAllIndexes = (arr, val) => {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}

const generatePlayerOneKeyCard = words => R.reduce(addTile, [], words);

const generatePlayerTwoKeyCard = (p1, words) => {
  // maybe use indexOf to find location of occurences of correct?
  let allIndexes = getAllIndexes(p1, 1);
  console.log('indexes: ', allIndexes);
  const random1 = allIndexes[getRandomNum(allIndexes.length, 0)];
  // trim off that number and so on...
  const random2 = allIndexes[getRandomNum(allIndexes.length, 0)];
  const random3 = allIndexes[getRandomNum(allIndexes.length, 0)];
};

exports.generateBoard = async (req, res) => {
  const { password } = req.body;
  if (!password) {
    res.status(422).send({ error: 'permission denied (needs pw)' });
    return;
  }
  const validate = await matchPassword(password);
  if (R.isEmpty(validate)) {
    res.status(422).send({ error: 'permission denied (needs pw)' });
    return;
  }

  const wordsObjs = await getRandomWords(25);
  const wordsArr = R.pluck('name', wordsObjs.rows);
  const playerOne = generatePlayerOneKeyCard(wordsArr);
  const PlayerTwo = generatePlayerTwoKeyCard(playerOne, wordsArr);

  res.status(200).send({ 
    words: wordsArr,
    playerOne,
    // player2,
  });
};