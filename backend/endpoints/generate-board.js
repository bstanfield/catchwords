const R = require('ramda');
const { matchPassword, getRandomWords, saveBoardAndPlayerKeys } = require('../queries');
const randomWords = require('random-words');

// 0 = neutral (13)
// 1 = correct (9)
// 2 = assassin (3)

const simpleArr = () => {
  let i = 25;
  let arr = [];
  while(i > 0) {
    arr.push('x');
    i--;
  }
  return arr;
};

const findPositions = (item, arr) => {
  let i = 25; // arr.length
  let positions = [];
  while (i >= 0) {
    if (arr[i] === item) {
      positions.push(i); 
    }
    i--;
  }
  return positions;
};

const getRandomNum = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

const placeNumbersInArr = R.curry((item, amount, arr, overlap) => {
  let i = amount;
  let newArr = arr;
  let positionsOfX = findPositions('x', newArr);
  if (overlap) {
    R.map(index => newArr.splice(index, 1, item), overlap);
  } else {
    while (i > 0) {
      let randNum;
      if (positionsOfX.length === 1) {
        randNum = 0;
      } else {
        randNum = getRandomNum(positionsOfX.length - 1, 0);
      }

      const randomX = positionsOfX[randNum];
      newArr.splice(randomX, 1, item);
      positionsOfX = findPositions('x', newArr);
      i--;
    }
  }
  return newArr;
});

const numNeutral = 13; // = 0
const numCorrect = 6; // = 1
const numAssassin = 3; /// = 2

// PLAYER ONE
const baseArr = simpleArr();
const playerOne = R.pipe(
  placeNumbersInArr(0, numNeutral, R.__, false),
  placeNumbersInArr(1, 9, R.__, false),
  placeNumbersInArr(2, numAssassin, R.__, false),
)(baseArr);

// PLAYER TWO
const findOverlap = R.curry((p1, max) => {
  // MAKE THIS PURE
  let i = p1.length;
  let i2 = max;
  let overlap = [];
  let allGreenIndexes = [];
  while (i >= 0) {
    if (p1[i] === 1) {
      allGreenIndexes.push(i);
    }
    i--;
  }

  while (i2 > 0) {
    const randIndex = getRandomNum(allGreenIndexes.length - 1, 0);
    if (!R.includes(allGreenIndexes[randIndex], overlap)) {
      overlap.push(allGreenIndexes[randIndex]);
      i2--;
    }
  }
  return overlap;
});

const overlap = findOverlap(playerOne, 3);
const arrWithOverlap = placeNumbersInArr(1, overlap.length, simpleArr(), overlap);

const playerTwo = R.pipe(
  placeNumbersInArr(0, numNeutral, R.__, false),
  placeNumbersInArr(1, numCorrect, R.__, false),
  placeNumbersInArr(2, numAssassin, R.__, false),
)(arrWithOverlap);

exports.generateBoard = async (req, res) => {
  const { password, numberOfWords } = req.body;
  if (!password) {
    res.status(422).send({ error: 'permission denied (needs pw)' });
    return;
  }
  const validate = await matchPassword(password);
  if (R.isEmpty(validate)) {
    res.status(422).send({ error: 'permission denied (needs pw)' });
    return;
  }

  const wordsObjs = await getRandomWords(numberOfWords || 25);
  const wordsArr = R.pluck('name', wordsObjs.rows);

  const findNumOfOverlap = (p1, p2) => {
    let i = 0;
    let overlap = 0;
    let conjoinedArr = [];
    while(i < 25) {
      if (p1[i] === 1 && p2[i] === 1) {
        overlap++;
      }
      conjoinedArr.push([p1[i], p2[i]]);
      i++;
    }
    return { overlap, conjoinedArr };
  };

  const boardIdAndUrl = await saveBoardAndPlayerKeys({
    board_url: R.join('-', randomWords(5)),
    words: wordsArr,
    player_one: playerOne,
    player_two: playerTwo,
  });
  const { board_id, board_url } = boardIdAndUrl;

  res.status(200).send({ 
    words: wordsArr,
    boardId: board_id,
    boardUrl: board_url,
    playerOne,
    // statsOne: {
    //   1: R.reduce((acc, tile) => tile === 1 ? acc + 1 : acc, 0, playerOne),
    //   2: R.reduce((acc, tile) => tile === 2 ? acc + 1 : acc, 0, playerOne),
    //   0: R.reduce((acc, tile) => tile === 0 ? acc + 1 : acc, 0, playerOne),
    // },
    playerTwo,
    // statsTwo: {
    //   1: R.reduce((acc, tile) => tile === 1 ? acc + 1 : acc, 0, playerTwo),
    //   2: R.reduce((acc, tile) => tile === 2 ? acc + 1 : acc, 0, playerTwo),
    //   0: R.reduce((acc, tile) => tile === 0 ? acc + 1 : acc, 0, playerTwo),
    //   overlap: findNumOfOverlap(playerOne, playerTwo),
    // },
  });
};