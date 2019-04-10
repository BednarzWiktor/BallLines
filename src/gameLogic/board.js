// Constants
const size = 10;
const balls = () => ['r', 'g', 'b', 'y', 'c', 'm', 'o', 's', 'b'];

// Board state manipulation
const generateBoard = () => {
  const row = new Array(size).fill(0)
  return new Array(size).fill(row);
};

const getFreeCoords = board => {
  if (!Array.isArray(board))
    throw Error('Provided input needs to be an array');
  if (board.filter(row => row.length===board.length).length !== board.length)
    throw Error('Provided array needs to be a square matrix');
  return board.reduce((outerAcc, outerItem, outerIndex) => {
          outerItem.reduce((innerAcc, innerItem, innerIndex) => {
            if (innerItem===0) {
              outerAcc.push(new Array(outerIndex, innerIndex))
            };
            return outerAcc;
          }, []);
          return outerAcc;
        }, []);
};

const getRandomNumber = limit => {
  if (!Number.isInteger(limit)) throw Error('input needs to be an integer');
  if (limit<0) throw Error('input needs to be a positive number');
  return Math.floor(Math.random() * limit);
};

const pushRandom = (array, limit, unique = false) => {
  if (!Array.isArray(array)
      || !Number.isInteger(limit)
      || !(typeof unique==='boolean'))
      throw Error('Wrong input, pass in proper parameters (array, integer, [boolean])');

  const random = getRandomNumber(limit);
  if (unique) {
    return array.includes(random) ? array : array.concat([random]);
  } else {
    return array.concat([random]);
  }
};

const getRandomIndexes = (inputArray, limit, baseArray = []) => {
  if (!Array.isArray(inputArray)
      || !Number.isInteger(limit)
      || !Array.isArray(baseArray))
      throw Error('Wrong input, pass in proper parameters (array, integer, array)');

  if (inputArray.length===0) {
    return [];
  } else {
    return baseArray.length===limit ?
      baseArray :
      getRandomIndexes(inputArray, limit, pushRandom(baseArray, inputArray.length));
  }
};

const getRandomUniqueIndexes = (inputArray, limit, baseArray = []) => {
  if (!Array.isArray(inputArray)
      || !Number.isInteger(limit)
      || !Array.isArray(baseArray))
      throw Error('Wrong input, pass in proper parameters (array, integer, array)');

  if (inputArray.length===0) {
    return [];
  } else if (inputArray.length<=limit) {
    return inputArray.reduce((acc, curr, i) => {
      acc.push(i);
      return acc;
    }, [])
  } else {
    return baseArray.length===limit ?
      baseArray :
      getRandomUniqueIndexes(inputArray, limit, pushRandom(baseArray, inputArray.length, true));
  }
};

const translateIndexes = (indexArray, dictionary) => {
  if (!Array.isArray(indexArray) || !Array.isArray(dictionary))
    throw Error('Wrong input, pass in proper parameters (array, array)');
  if (dictionary.length===0)
    throw Error(`dictionary parameter can't be empty`);
  if (indexArray.filter(index => index<dictionary.length).length!==indexArray.length)
    throw Error(`indexArray elements exceeding dictionary index range`);

  return indexArray.map(index => dictionary[index]);
};

const createPendingCoords = (coords, colors) => {
  if (!Array.isArray(coords) || !Array.isArray(colors))
    throw Error('Wrong input, pass in proper parameters (array, array)');
  if (coords.length!==colors.length)
    throw Error('coords and colors parameters are not equal in legth');

  return coords.reduce((acc, coord, i) => {
    acc.push([coord, colors[i]]);
    return acc;
  }, []);
};

const updateBoard = (board, pendingCoords, method) => {
 // ****************** WORK HERE **********************
};

const initialState = () => ({
  board: generateBoard(),
  level: 0,
  freeCoords: this.board,
  pendingCoords: []
});

module.exports = { generateBoard, getFreeCoords, getRandomNumber, pushRandom, getRandomIndexes, getRandomUniqueIndexes, translateIndexes, createPendingCoords, updateBoard };
