const expect = require('chai').expect;

describe('BOARD', () => {
  const boardMethods = require('../src/gameLogic/board.js');

  describe('generateBoard', () => {
    const genB = boardMethods.generateBoard;

    it('should return a 2d array', () => {
      expect(genB()).to.be.an('array'); // is an array
      expect(genB()
        .filter(item => Array.isArray(item)).length)
        .to.be.equal(genB().length); // has only array children
    });
    it('should be a square matrix', () => {
      expect(genB()
        .filter(item => item.length===genB().length).length)
        .to.be.equal(genB().length); // has each row.length === col.length
    });
    it('should contain only 0 values', () => {
      expect(genB()
        .filter(row => row.filter(item => item===0).length===genB().length).length)
        .to.be.equal(genB().length);
    });
  });

  describe('getFreeCoords', () => {
    const getFC = boardMethods.getFreeCoords;

    let board, board2, board3;

    before(() => {
      board = [
        ['r', 0, 'g'],
        [0, 'b', 'b'],
        ['r', 'r', 0]
      ],
      board2 = [
        [0, 0],
        [0, 0]
      ],
      board3 = [
        ['r', 'g'],
        ['b', 'r']
      ]
    });

    it('should return a 2d array', () => {
      expect(getFC(board)).to.be.an('array'); // is an array
      expect(getFC(board)
            .filter(item => Array.isArray(item)).length)
            .to.be.equal(getFC(board).length); // has only array children
    });
    it('should hold arrays of two numbers', () => {
      expect(getFC(board)
        .filter(coord => coord.filter(item => Number.isInteger(item)).length===2).length)
        .to.be.equal(getFC(board).length); // children hold only integers
    });
    it('should hold only valid coords', () => {
      expect(getFC(board)
        .filter(coord => coord.filter(num => num>=0&&num<board.length).length===2).length)
        .to.be.equal(getFC(board).length); // coord children are in proper range
    });
    it('should have length>0 and length<=all board entities', () => {
      expect(getFC(board).length).to.be.above(0); // length>0
      expect(getFC(board).length).to.be.below(board.length+1); // length<=board.length
    });
    it('should only return coords of non-0 elements of a board', () => {
      // board
      expect(getFC(board).length).to.equal(3);
      expect(getFC(board)[0]).to.deep.equal([0, 1]);
      expect(getFC(board)[1]).to.deep.equal([1, 0]);
      expect(getFC(board)[2]).to.deep.equal([2, 2]);
      //board2
      expect(getFC(board2).length).to.be.equal(4);
      expect(getFC(board2)[0]).to.deep.equal([0, 0]);
      expect(getFC(board2)[1]).to.deep.equal([0, 1]);
      expect(getFC(board2)[2]).to.deep.equal([1, 0]);
      expect(getFC(board2)[3]).to.deep.equal([1, 1]);
      //board3
      expect(getFC(board3).length).to.equal(0);
    });
  });

  describe('getRandomNumber', () => {
    const getRN = boardMethods.getRandomNumber;

    it('should return an integer', () => {
      expect(Number.isInteger(getRN(0))).to.be.true;
    })
  });

  describe('pushRandom', () => {
    const pushR = boardMethods.pushRandom;

    let array, array2, limit, limit2

    before(() => {
      array = [],
      array1 = [0, 1],
      limit = 2,
      limit2 = 1;
    });

    it('should return an array of integers', () => {
      expect(pushR(array, limit)).to.be.an('array'); // returns an array
      expect(pushR(array, limit)
        .filter(item => Number.isInteger(item)).length)
        .to.be.equal(pushR(array, limit).length) // has only integer children
    });
    it('should return array with length === inputArray.length or === inputArray.length+1', () => {
      expect(pushR(array1, limit).length).to.be.equal(array1.length+1); // when appending occurs
      expect(pushR(array1, limit, true).length).to.be.equal(array1.length); // when appending doesn't occur
    });
    it(`can't add duplicate element if unique parameter is set to true`, () => {
      expect(pushR(array1, limit2, true).length).to.be.equal(array1.length); // when there's no more unique elements in limit range
    });
  });

  describe('getRandomIndexes', () => {
    const getRI = boardMethods.getRandomIndexes;

    let balls, coords, coords2, empty;

    before(() => {
      balls = ['r', 'g', 'b'];
      coords = [[0, 0], [0, 1]];
      coords2 = [[0, 0], [0, 1], [0, 2], [0, 3]];
      empty = [];
    });

    it('should return an array of integers', () => {
      expect(getRI(balls, 2)).to.be.an('array'); // returns an array
      expect(getRI(coords, 2)
        .filter(item => Number.isInteger(item)).length)
        .to.be.equal(getRI(array, limit).length) // has only integer children
    });
    it('should have length equal to limit parameter if inputArray.length>0', () => {
      expect(getRI(empty, 10).length).to.be.equal(0);
      expect(getRI(coords, 2).length).to.be.equal(2);
      expect(getRI(balls, 10).length).to.be.equal(10);
    });
    it('should contain duplicates if limit>inputArray.length', () => {
      // prove existence of dupes when limit>inputArray.length
    });
  });

  describe('getRandomUniqueIndexes', () => {
    const getRUI = boardMethods.getRandomUniqueIndexes;

    let balls, coords, coords2, empty;

    before(() => {
      balls = ['r', 'g', 'b'];
      coords = [[0, 0], [0, 1]];
      coords2 = [[0, 0], [0, 1], [0, 2], [0, 3]];
      empty = [];
    });

    it('should return an array of integers', () => {
      expect(getRUI(balls, 2)).to.be.an('array'); // returns an array
      expect(getRUI(coords, 2)
        .filter(item => Number.isInteger(item)).length)
        .to.be.equal(getRUI(array, limit).length) // has only integer children
    });
    it('should have length >=0 and (length<=limit || length<=inputArray.length)', () => {
      expect(getRUI(empty, 10).length).to.be.equal(0); // empty array
      expect(getRUI(coords, 10).length).to.be.equal(2); // array.length<limit
      expect(getRUI(coords2, 2).length).to.be.equal(2); // array.length>limit
    });
    it('should never contain duplicates', () => {
      // prove lack of dupes when limit>input.Array.length
    });
  });
});
