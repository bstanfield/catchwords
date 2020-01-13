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
  // Something wrong with entering p1?
  let newArr = arr;
  if (typeof arr === 'number') {
    newArr = [arr];
  }

  if (p1) {
    // console.log('overlap: ', overlap);
    // console.log('arr: ', arr);
  }
  
  const neutral = countOccurences(13, 0, newArr);
  let correct;
  if (overlap) {
    correct = countOccurences(6, 1, newArr);
  } else {
    correct = countOccurences(9, 1, newArr);
  }
  const assassin = countOccurences(3, 2, newArr);

  if (overlap) {
    if (R.any(
      overlap => overlap === newArr.length
    )(overlap)) {
      console.log('overlapping: ', newArr.length);
      return R.append(1, newArr);
    }
  }

  if (p1) {
    // if (p1[R.length(newArr) - 1] === 1) {
    //   console.log(`ALERT: position #${R.length(newArr)} is a ${p1[R.length(newArr) - 1]}!`);
    // } else {
    //   console.log(`position #${R.length(newArr)} is a ${p1[R.length(newArr) - 1]}!`);
    // }
    if (assassin && correct) {
      return R.append(0, newArr);
    } else if (assassin && neutral && !(p1[R.length(newArr)] === 1)) {
      console.log('going to be 1: ', 1, R.length(newArr));
      return R.append(1, newArr);
    } else if (neutral && correct) {
      return R.append(2, newArr);
    } else if (assassin && !(p1[R.length(newArr)] === 1)) {
      const rand = getRandomNum(1, 0);
      console.log('ok to be 1 (assassin & !1): ', rand, R.length(newArr) - 1);
      return R.append(rand, newArr);
    } else if (neutral && !(p1[R.length(newArr)] === 1)) {
      // RARE
      const rand = getRandomNum(2, 1);
      console.log('ok to be 1 (neutral & !1): ', rand, R.length(newArr));
      return R.append(rand, newArr);
    } else if (correct) {
      // PASS
      const rand = Math.random() < 0.5 ? 0 : 2;
      console.log('should not be 1 (else if correct): ', rand, R.length(newArr));
      return R.append(rand, newArr);
    } else if (!(p1[R.length(newArr)] === 1)) {
      // PASS
      const rand = getRandomNum(2, 0);
      console.log('ok to be 1 (else if !1): ', rand, R.length(newArr));
      return R.append(rand, newArr);
    } else {
      // TODO: Examine these edge cases
      if ((p1[R.length(newArr)] === 1)) {
        // PASS
        const rand = Math.random() < 0.5 ? 0 : 2;
        console.log('should not be 1: ', rand, R.length(newArr));
        return R.append(rand, newArr);
      }
      console.log('idk...');
      console.log('asassins: ', assassin);
      console.log('correct: ',  correct);
      console.log('neutral: ', neutral);
      console.log('p1 position: ', R.length(newArr));
      console.log('p1: ', p1[R.length(newArr)]);
    }
  }

  if (assassin && correct) {
    return R.append(0, newArr);
  } else if (assassin && neutral) {
    return R.append(1, newArr);
  } else if (neutral && correct) {
    return R.append(2, newArr);
  } else if (assassin) {
    return R.append(getRandomNum(1, 0), newArr);
  } else if (neutral) {
    return R.append(getRandomNum(2, 1), newArr);
  } else if (correct) {
    return Math.random() < 0.5 ? 0 : 2;
  } else {
    return R.append(getRandomNum(2, 0), newArr);
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