const expect = require('chai').expect;

describe('BOARD', () => {
  const boardMethods = require('../src/gameLogic/board.js');

  // Task Runners
  const testTaskError = (handlers, expectation) => {
    handlers.forEach(handler => {
      expect(handler).to.throw(expectation);
    });
  }

  // Tests
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

    context('Valid Input', () => {
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

    context('Edge Cases', () => {
      const h1 = () => getFC(1),
            h2 = () => getFC({a: 1}),
            h3 = () => getFC('s'),
            h4 = () => getFC([[0, 0, 0], [0], [0, 0]]);

      const handlers = [h1, h2, h3, h4];

      it('throws an error on taking input which is not an array', () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0,3), 'Provided input needs to be an array');

      });
      it('throws an error if an array does not have square dimensions', () => {
        expect(handlers[3]).to.throw('Provided array needs to be a square matrix');
      });
    });
  });

  describe('getRandomNumber', () => {
    const getRN = boardMethods.getRandomNumber;

    context('Valid Input', () => {
      it('should return an integer', () => {
        expect(Number.isInteger(getRN(0))).to.be.true;
      });
    });

    context('Edge Cases', () => {
      const h1 = () => getRN(0.5),
            h2 = () => getRN(-1.66),
            h3 = () => getRN(-5);

      const handlers = [h1, h2, h3];

      it('throws an error if input is not an integer', () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0,2), 'input needs to be an integer');
      });
      it('throws an error if input is a negative number', () => {
        expect(handlers[2]).to.throw('input needs to be a positive number');
      });
    });
  });

  describe('pushRandom', () => {
    const pushR = boardMethods.pushRandom;

    context('Valid Input', () => {
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

    context('Edge Cases', () => {
      const h1 = () => pushR('s', 1, true),
            h2 = () => pushR([], .5, true),
            h3 = () => pushR([], 1, {}),
            h4 = () => pushR(1, [], 'true');

      const handlers = [h1, h2, h3, h4];

      it(`should throw an error if parameters don't correspond to (array, integer, [boolean])`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers, 'Wrong input, pass in proper parameters (array, integer, [boolean])');
      });
    });
  });

  describe('getRandomIndexes', () => {
    const getRI = boardMethods.getRandomIndexes;

    context('Valid Input', () => {
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
          .to.be.equal(getRI(balls, 2).length) // has only integer children
      });
      it('should have length equal to limit parameter if inputArray.length>0', () => {
        expect(getRI(empty, 10).length).to.be.equal(0);
        expect(getRI(coords, 2).length).to.be.equal(2);
        expect(getRI(balls, 10).length).to.be.equal(10);
      });
      it('should contain duplicates if limit>inputArray.length', () => {
        expect(new Set(getRI(coords, 10)).size).to.be.below(getRI(coords, 10).length);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => getRI('s', 0, []),
            h2 = () => getRI([], {}, []),
            h3 = () => getRI([], 0, 1),
            h4 = () => getRI('s', {}, 1);

      const handlers = [h1, h2, h3, h4];

      it(`should throw an error if parameters don't correspond to (array, integer, array)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers, 'Wrong input, pass in proper parameters (array, integer, array)');
      });
    });
  });

  describe('getRandomUniqueIndexes', () => {
    const getRUI = boardMethods.getRandomUniqueIndexes;

    context('Valid Input', () => {
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
          .to.be.equal(getRUI(balls, 2).length) // has only integer children
      });
      it('should have length >=0 and (length<=limit || length<=inputArray.length)', () => {
        expect(getRUI(empty, 10).length).to.be.equal(0); // empty array
        expect(getRUI(coords, 10).length).to.be.equal(2); // array.length<limit
        expect(getRUI(coords2, 2).length).to.be.equal(2); // array.length>limit
      });
      it('should never contain duplicates', () => {
        expect(new Set(getRUI(coords, 10)).size).to.be.equal(getRUI(coords, 10).length);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => getRUI('s', 0, []),
            h2 = () => getRUI([], {}, []),
            h3 = () => getRUI([], 0, 1),
            h4 = () => getRUI('s', {}, 1);

      const handlers = [h1, h2, h3, h4];

      it(`should throw an error if parameters don't correspond to (array, integer, array)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers, 'Wrong input, pass in proper parameters (array, integer, array)');
      });
    });
  });

  describe('translateIndexes', () => {
    const tI = boardMethods.translateIndexes;

    context('Valid Input', () => {
      let indexArray1, indexArray2, indexArray3, dictionary1, dictionary2, dictionary3;

      before(() => {
        indexArray1 = [];
        indexArray2 = [0, 1];
        indexArray3 = [1, 2, 1];
        dictionary1 = ['r', 'g', 'b'];
        dictionary2 = [[0, 0], [0, 1], [1, 0], [1, 1]];
        dictionary3 = ['r', 'g', 'b', 'y', 'c'];
      });

      it('should return an array', () => {
        expect(tI(indexArray1, dictionary1)).to.be.an('array');
        expect(tI(indexArray2, dictionary2)).to.be.an('array');
      });
      it('should have length === indexArray.length', () => {
        expect(tI(indexArray3, dictionary1).length).to.be.equal(indexArray3.length);
      });
      it('should match structure of dictionary parameter (each element of returned array can be found in dictionary)', () => {
        expect(tI(indexArray2, dictionary1)
          .filter(item => dictionary1.includes(item)).length)
          .to.be.equal(tI(indexArray2, dictionary1).length)
      });
    });

    context('Edge Cases', () => {
      const h1 = () => tI('s', ['a']),
            h2 = () => tI([], 1),
            h3 = () => tI({}, 0.5),
            h4 = () => tI([], []),
            h5 = () => tI([10, 20], ['a']);

      const handlers = [h1, h2, h3, h4, h5];

      it(`should throw an error if parameters don't correspond to (array, array))`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0,3), 'Wrong input, pass in proper parameters (array, array)');
      });
      it(`should throw an error if dictionary is empty`, () => {
        expect(handlers[3]).to.throw(`dictionary parameter can't be empty`);
      });
      it('should throw an error if there are elements of indexArray exceeding dictionary index range', () => {
        expect(handlers[4]).to.throw(`indexArray elements exceeding dictionary index range`);
      });
    });
  });

  describe('createPendingCoords', () => {
    const createPC = boardMethods.createPendingCoords;

    context('Valid Input', () => {
      let coords1, coords2, coords3, colors1, colors2, colors3;

      before(() => {
        coords1=[[0, 0]];
        coords2=[[0, 0], [0, 1], [1, 1]];
        coords3=[[5, 5], [9, 0], [2, 1]];
        colors1=['r'];
        colors2=['r', 'g', 'b'];
        colors3=['y', 'y', 'y'];
      });

      it('should return a 2d array', () => {
        expect(createPC(coords1, colors1)).to.be.an('array'); // is an array
        expect(createPC(coords2, colors2)
              .filter(item => Array.isArray(item)).length)
              .to.be.equal(createPC(coords2, colors2).length); // has only array children
      });
      it('should have elements with structure [coords, color], where coords = [num, num] and color = string', () => {
        expect(createPC(coords1, colors1)[0]).to.deep.equal([[0, 0], 'r']);
        expect(createPC(coords2, colors2)[1]).to.deep.equal([[0, 1], 'g']);
      });
      it('should have length===coords.length===colors.length', () => {
        expect(createPC(coords3, colors3).length).to.be.equal(coords3.length);
        expect(createPC(coords3, colors3).length).to.be.equal(colors3.length);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => createPC('s', []),
            h2 = () => createPC([], 1),
            h3 = () => createPC({}, true),
            h4 = () => createPC([1, 2], [1]);

      const handlers = [h1, h2, h3, h4];

      it(`should throw an error if parameters don't correspond to (array, array)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0,3), 'Wrong input, pass in proper parameters (array, array)')
      });
      it(`should throw an error if coords.length!==colors.length`, () => {
        expect(handlers[3]).to.throw('coords and colors parameters are not equal in legth');
      });
    });
  });

  describe('updateBoard', () => {
    const updateB = boardMethods.updateBoard;
    const genB = boardMethods.generateBoard;

    context('Valid Input', () => {
      context('add', () => {
        let board,pendingCoords1, pendingCoords2;

        before(() => {
          board=genB();
          pendingCoords1=[[[0, 0], 'r'], [[5, 5], 'b'], [[9, 9], 'g']];
          pendingCoords2=[[[0, 0], 'b']];
        });

        it('should return a 2d array', () => {
          expect(updateB(board, pendingCoords1, 'add')).to.be.an('array'); // is an array
          expect(updateB(board, pendingCoords2, 'add')
            .filter(item => Array.isArray(item)).length)
            .to.be.equal(updateB(board, pendingCoords2, 'add').length); // has only array children
        });
        it('should be a square matrix', () => {
          expect(updateB(board, pendingCoords2, 'add')
            .filter(item => item.length===genB().length).length)
            .to.be.equal(updateB(board, pendingCoords2, 'add').length); // has each row.length === col.length
        });
        it('should contain only 0 or string values', () => {
          expect(updateB(board, pendingCoords2, 'add')
            .filter(row => row.filter(item => item===0).length===genB().length).length)
            .to.be.equal(updateB(board, pendingCoords2, 'add').length-1); // count 0's
          expect(updateB(board, pendingCoords2, 'add')
            .filter(row => row.filter(item => typeof item==='string').length===1).length)
            .to.be.equal(1); // count strings
          expect(updateB(board, pendingCoords1, 'add')
            .filter(row => row.filter(item => item===0).length===genB().length).length)
            .to.be.equal(updateB(board, pendingCoords1, 'add').length-3); // count 0's
          expect(updateB(board, pendingCoords1, 'add')
            .filter(row => row.filter(item => typeof item==='string').length===1).length)
            .to.be.equal(3); // count strings
        });
      });
      context('remove', () => {
        const board = updateB(genB(), [[[0, 0], 'r'], [[5, 5], 'b'], [[9, 9], 'g']], 'add');
        const pendingCoords = [[5, 5], [9, 9]];
        it('should have x less string valued coords than input board, where x is pendingCoords parameter length', () => {
          expect(updateB(board, pendingCoords, 'remove')
            .filter(row => row.filter(item => typeof item==='string').length===1).length)
            .to.be.equal(1); // count strings)
        });
      });
    });

    context('Edge Cases', () => {
      const h1 = () => updateB('s', [], 'add'),
            h2 = () => updateB([], 1, 'add'),
            h3 = () => updateB([], [], true),
            h4 = () => updateB([], [], 'add'),
            h5 = () => updateB(genB(), [], 'x');

      const handlers = [h1, h2, h3, h4, h5];

      it(`should throw an error if parameters don't correspond to (array, array, string)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0,3), 'Wrong input, pass in proper parameters (array, array, string)');
      });
      it(`should throw an error if board parameter doesn't have proper size`, () => {
        expect(handlers[3]).to.throw(`your board parameter doesn't have proper size (10x10)`);
      });
      it(`should throw an error if method parameter !== 'add' || !=='remove'`, () => {
        expect(handlers[4]).to.throw(`your methods parameter doesn't equal 'add' or 'remove'`);
      });
    });
  });

  describe('moveBall', () => {
    const iS = boardMethods.initialState;
    const sS = boardMethods.setState;
    const mB = boardMethods.moveBall;

    context('Valid Input', () => {
      let state, start, end;

      before(() => {
        state = sS(iS());
        state.board[0][0] = 'z';
        state.board[9][9] = 0;

        start = [0, 0];
        end = [[9, 9], 'z'];
      });

      it('returns an object with same structure as state parameter', () => {
        expect(mB(state, start, end)).to.be.an('object');
        expect(mB(state, start, end)).to.own.property('board');
        expect(mB(state, start, end)).to.own.property('level');
        expect(mB(state, start, end)).to.own.property('freeCoords');
        expect(mB(state, start, end)).to.own.property('pendingCoords');
      });
      it('changes value at start coords within state.board to 0', () => {
        expect(mB(state, start, end).board[0][0]).to.be.equal(0);
      });
      it('changes value at end coords within state board to state.board[start]', () => {
        expect(mB(state, start, end).board[9][9]).to.be.equal('z');
      });
    });

    context('Edge Cases', () => {
      let state = sS(iS());
      delete state['level'];

      const h1 = () => mB(true, [0, 0], [[9, 9], 'z']),
            h2 = () => mB(sS(iS()), 1, [[9, 9], 'z']),
            h3 = () => mB(sS(iS()), [0, 0], 'a'),
            h4 = () => mB(.5, true, 'a'),
            h5 = () => mB(state, [0, 0], [[9, 9], 'z']),
            h6 = () => mB(sS(iS()), [0, 11], [[9, 9], 'z']),
            h7 = () => mB(sS(iS()), [0, 0], [[-9, 9], 'z']),
            h8 = () => mB(sS(iS()), [0, 0], [[9, 9], 'sa']);

      const handlers = [h1, h2, h3, h4, h5, h6, h7, h8];

      it(`throws an error if parameters don't correspond to (object, array, array)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0,4), 'Wrong input, pass in proper parameters (object, array, array)');
      });
      it(`throws an error if state parameter doesn't represent structure of board state`, () => {
        expect(handlers[4]).to.throw(`your input state parameter doesn't reporesent board state`);
      });
      it(`throws an error if start doesn't hold valid coords`, () => {
        expect(handlers[5]).to.throw(`start parameter doesn't represent valid board coords`);
      });
      it(`throws an error if end doesn't hold valid coords`, () => {
        expect(handlers[6]).to.throw(`end parameter doesn't hold valid board coords`);
      });
      it(`throws an error if end doesn't hold valid string value`, () => {
        expect(handlers[7]).to.throw(`end parameter doesn't hold valid ball color`);
      });
    });
  });
});
