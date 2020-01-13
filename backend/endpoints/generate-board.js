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

const addTile = R.curry((arr, overlap, p1) => {
  // ARR = ACCUMULATOR
  const safeArr = typeof arr === 'number' ? [arr] : arr;
  
  const neutral = countOccurences(13, 0, safeArr);
  const assassin = countOccurences(3, 2, safeArr);
  const correct = overlap 
    ? countOccurences(6, 1, safeArr) 
    : countOccurences(9, 1, safeArr);

  if (overlap) {
    if (R.any(
      overlap => overlap === safeArr.length
    )(overlap)) {
      return R.append(1, safeArr);
    }
  }

  if (p1) {
    if (assassin && correct) {
      return R.append(0, safeArr);
    } else if (assassin && neutral && !(p1[R.length(safeArr)] === 1)) {
      return R.append(1, safeArr);
    } else if (neutral && correct) {
      return R.append(2, safeArr);
    } else if (assassin && !(p1[R.length(safeArr)] === 1)) {
      const rand = getRandomNum(1, 0);
      return R.append(rand, safeArr);
    } else if (neutral && !(p1[R.length(safeArr)] === 1)) {
      // RARE
      const rand = getRandomNum(2, 1);
      return R.append(rand, safeArr);
    } else if (correct) {
      const rand = Math.random() < 0.5 ? 0 : 2;
      return R.append(rand, safeArr);
    } else if (!(p1[R.length(safeArr)] === 1)) {
      const rand = getRandomNum(2, 0);
      return R.append(rand, safeArr);
    } else {
      if ((p1[R.length(safeArr)] === 1)) {
        const rand = Math.random() < 0.5 ? 0 : 2;
        return R.append(rand, safeArr);
      }
    }
  }

  if (assassin && correct) {
    return R.append(0, safeArr);
  } else if (assassin && neutral) {
    return R.append(1, safeArr);
  } else if (neutral && correct) {
    return R.append(2, safeArr);
  } else if (assassin) {
    return R.append(getRandomNum(1, 0), safeArr);
  } else if (neutral) {
    return R.append(getRandomNum(2, 1), safeArr);
  } else if (correct) {
    return Math.random() < 0.5 ? 0 : 2;
  } else {
    return R.append(getRandomNum(2, 0), safeArr);
  }
});

const checkIndex = R.curry((originArr, originVal, i, arrPosition) =>
  originVal === originArr[arrPosition]
    ? R.append(arrPosition, i)
    : i,
);

const createArrOfNums = (originalNum, num, arr) => arr.length === originalNum
   ? R.append(num, arr)
   : createArrOfNums(originalNum, num-1, R.append(num, arr))

const getAllIndexes = (arr, val) => 
  R.reduce(
    checkIndex(arr, val),
    [],
    createArrOfNums(arr.length, arr.length, []), // [17, 16, 15, 14, ... 0]
  );

const pickNum = R.curry((indexes, i, index) => {
  const prunedIndexes = R.without(i, indexes);
  const rand = prunedIndexes[getRandomNum(prunedIndexes.length - 1, 0)];
  return R.append(rand, i);
});

const maxOverlap = R.curry((max, acc) => {
  if (acc.length < (max || 3)) {
    return true;
  } else {
    return false;
  }
});

const generatePlayerKeyCard = (words, overlap, otherPlayer) => R.reduce(addTile(R.__, overlap, otherPlayer), [], words); // SOMETHING WEIRD WITH THIS FN

const generatePlayerTwoKeyCard = (p1, words) => {
  const allGreenIndexes = getAllIndexes(p1, 1);
  const overlappingIndexes = R.reduceWhile(maxOverlap(3), pickNum(allGreenIndexes), [], allGreenIndexes);
  return generatePlayerKeyCard(words, overlappingIndexes, p1);
};

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

  const playerOne = generatePlayerKeyCard(wordsArr);
  const playerTwo = generatePlayerTwoKeyCard(playerOne, wordsArr);

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

  res.status(200).send({ 
    words: wordsArr,
    playerOne,
    statsOne: {
      1: R.reduce((acc, tile) => tile === 1 ? acc + 1 : acc, 0, playerOne),
      2: R.reduce((acc, tile) => tile === 2 ? acc + 1 : acc, 0, playerOne),
      0: R.reduce((acc, tile) => tile === 0 ? acc + 1 : acc, 0, playerOne),
    },
    playerTwo,
    statsTwo: {
      1: R.reduce((acc, tile) => tile === 1 ? acc + 1 : acc, 0, playerOne),
      2: R.reduce((acc, tile) => tile === 2 ? acc + 1 : acc, 0, playerOne),
      0: R.reduce((acc, tile) => tile === 0 ? acc + 1 : acc, 0, playerOne),
      overlap: findNumOfOverlap(playerOne, playerTwo),
    },
  });
};