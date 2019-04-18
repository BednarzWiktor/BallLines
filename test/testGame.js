const expect = require('chai').expect;

describe('GAME', () => {
  const gameMethods = require('../src/gameLogic/game.js').game;

  // Task Runners
  const testTaskError = (handlers, expectation) => {
    handlers.forEach(handler => {
      expect(handler).to.throw(expectation);
    });
  }

  describe('enqueueSelectionStart', () => {
    const initS = gameMethods.initialState;
    const enqSS = gameMethods.enqueueSelectionStart;

    context('Valid Input', () => {
      let state1, coords1, coords2;

      before(() => {
        state1=initS();
        coords1=[0, 0];
        coords2=[9, 9];
      });

      it('should return an object', () => {
        expect(enqSS(state1, coords1)).to.be.an('object');
        expect(enqSS(state1, coords2)).to.be.an('object');
      });
      it('should maintain structure of input object', () => {
        expect(enqSS(state1, coords1)).to.own.property('selectionStart');
        expect(enqSS(state1, coords2)).to.own.property('selectionEnd');
        expect(enqSS(state1, coords2)).to.own.property('selectionStart');
        expect(enqSS(state1, coords1)).to.own.property('selectionEnd');
      });

      it('should change only selectionStart key compared to input state', () => {
        expect(enqSS(state1, coords1).selectionEnd)
          .to.deep.equal(state1.selectionEnd);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => enqSS(1, []),
            h2 = () => enqSS({}, 's'),
            h3 = () => enqSS(true, 1),
            h4 = () => enqSS(initS(), ['s', true]);

      const handlers = [h1, h2, h3, h4];

      it(`throws an error if parameters don't correspond to (object, array)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0,3), 'Wrong input, pass in proper parameters (object, array)');
      });
      it(`throws an error if coords parameter doesn't hold valid coords`, () => {
        expect(handlers[3]).to.throw(`coords parameter needs to hold valid coords`);
      });
    });
  });

  describe('enqueueSelectionEnd', () => {
    const initS = gameMethods.initialState;
    const enqSE = gameMethods.enqueueSelectionEnd;

    context('Valid Input', () => {
      let state, coords1, coords2;

      before(() => {
        state=initS();
        state.board.board[1][1] = 'r';
        state.selectionStart = [1, 1];
        coords1=[[0, 0], 'r'];
        coords2=[[9, 9], 'r'];
      });

      it('should return an object', () => {
        expect(enqSE(state, coords1)).to.be.an('object');
        expect(enqSE(state, coords2)).to.be.an('object');
      });
      it('should maintain structure of input object', () => {
        expect(enqSE(state, coords1)).to.own.property('selectionStart');
        expect(enqSE(state, coords2)).to.own.property('selectionEnd');
        expect(enqSE(state, coords2)).to.own.property('selectionStart');
        expect(enqSE(state, coords1)).to.own.property('selectionEnd');
      });
      it('should change only selectionEnd key compared to input state', () => {
        expect(enqSE(state, coords1).selectionStart)
          .to.deep.equal(state.selectionStart);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => enqSE(1, []),
            h2 = () => enqSE({}, 's'),
            h3 = () => enqSE(true, 1),
            h4 = () => enqSE(initS(), ['s', true, 2]);

      const handlers = [h1, h2, h3, h4];

      it(`throws an error if parameters don't correspond to (object, array)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0,3), 'Wrong input, pass in proper parameters (object, array)');
      });
      it(`throws an error if coords parameter doesn't hold valid coords`, () => {
        expect(handlers[3]).to.throw(`coords parameter needs to hold valid coords`);
      });
    });
  });

  describe('handleSelection', () => {
    const iS = gameMethods.initialState;
    const handleS = gameMethods.handleSelection;

    context('Valid Input', () => {
      let state1, state2;

      beforeEach(() => {
        const state = iS();
        const statex = iS();

        state1 = Object.assign(state, {selectionStart: [0, 0], selectionEnd: [[9, 9], 'r']});
        state1.board.board[0][0] = 'r';
        state1.board.board[9][9] = 0;

        state2 = Object.assign(statex, {selectionStart: [0, 0], selectionEnd: [[9, 9], 'r']});
        state2.board.board[0][0] = 'b';
        state2.board.board[9][9] = 0;
      });

      it('should return an object', () => {
        expect(handleS(state1)).to.be.an('object');
        expect(handleS(state2)).to.be.an('object');
      });
      it('should return a valid game state object', () => {
        expect(handleS(state1)).to.own.property('board');
        expect(handleS(state1)).to.own.property('nextLevel');
        expect(handleS(state1)).to.own.property('score');
        expect(handleS(state1)).to.own.property('selectionStart');
        expect(handleS(state1)).to.own.property('selectionEnd');
      });
      it('should have selectionStart and selectionEnd method se to empty array', () => {
        expect(handleS(state1).selectionStart).to.not.deep.equal(state1.selectionStart);
        expect(handleS(state1).selectionEnd).to.not.deep.equal(state1.selectionEnd);
        expect(handleS(state2).selectionStart).to.not.deep.equal(state2.selectionStart);
        expect(handleS(state2).selectionEnd).to.not.deep.equal(state2.selectionEnd);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => handleS(true),
            h2 = () => handleS({someKey: ''}),
            h3 = () => handleS(iS()),
            h4 = () => handleS(Object.assign(iS(), {selectionStart: [0, 0]}));

      const handlers = [h1, h2, h3, h4];

      it(`throws an error if parameter does not correspond to object`, () => {
        testTaskError(handlers, Error);
        expect(handlers[0]).to.throw('Wrong input, pass in proper parameter (object)')
      });
      it(`throws an error if input object doesn't have valid state structure`, () => {
        expect(handlers[1]).to.throw(`input object doesn't represent game state`);
      });
      it('throws an error if selectionStart in input object is empty', () => {
        expect(handlers[2]).to.throw('selectionStart in passed object is empty')
      });
      it('throws an error if selectionEnd in input object is emtpy', () => {
        expect(handlers[3]).to.throw('selectionEnd in passed object is empty')
      });
    });
  });

  describe('findPath', () => {
    const iS = gameMethods.initialState;
    const fP = gameMethods.findPath;

    context('Valid Input', () => {
      let state1, state2;

      before(() => {
        state1 = iS();
        state1.board.board[0][0] = 'r';
        state1.board.board[9][9] = 0;
        state1.selectionStart = [0, 0];
        state1.selectionEnd = [[9, 9], 'r'];

        state2 = iS();
        state2.board.board[0][0] = 'g';
        state2.board.board[0][1] = 'g';
        state2.board.board[1][0] = 'g';
        state2.board.board[1][1] = 'g';
        state2.board.board[2][2] = 0;
        state2.selectionStart = [0, 0];
        state2.selectionEnd = [[2, 2], 'g'];
      });

      it('should return an array', () => {
        expect(fP(state1)).to.be.an('array');
        expect(fP(state2)).to.be.an('array');
      });
      it('should be empty when no paths are found', () => {
        expect(fP(state2).length).to.be.equal(0);
      });
      it('should contain arrays of coordinates defining a path from start to end if a path is found', () => {
        expect(fP(state1).length).to.be.above(0);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => fP(true),
            h2 = () => fP({ board: 'board', someKey: 1});

      const handlers = [h1, h2];

      it(`throws an error if parameter does not correspond to an object`, () => {
          testTaskError(handlers, Error);
          expect(handlers[0]).to.throw('Wrong input, pass in proper parameter (object)');
      });
      it(`throws an error if input object doesn't have valid state structure`, () => {
        expect(handlers[1]).to.throw(`input object doesn't represent game state`);
      });
    });
  });

  describe('checkCell', () => {
    const directionsDict = [[-1, -1], [-1, 0], [-1, 1],
                            [0, -1],  /* x */  [0, 1],
                            [1, -1],  [1, 0],  [1, 1]];
    const iS = gameMethods.initialState;
    const checkC = gameMethods.checkCell;

    context('Valid Input', () => {
      let board1 = iS().board.board,
          board2 = iS().board.board,
          board3= iS().board.board,
         coords1, coords2, coords3, coords4, coords5, coords6, coords7, coords8, coords9;

      before(() => {
        /**************************
          Clearing all board grids
        **************************/
        board1 = board1.map(row => row.map(item => item=0));
        board2 = board2.map(row => row.map(item => item=0));
        board3 = board3.map(row => row.map(item => item=0));
        /*    Constructing testing subgrid:
                 [['r', 'r', 'g'],
                  ['b', 'b', 'r'],
                  ['b', 'b', 'r']];
        */
        board1[4][4] = 'r';
        board1[4][5] = 'r';
        board1[4][6] = 'g';
        board1[5][4] = 'b';
        board1[5][5] = 'b'; // <-- checkCell target
        board1[5][6] = 'r';
        board1[6][4] = 'b';
        board1[6][5] = 'b';
        board1[6][6] = 'r';

        /*    Constructing testing subgrid:
                  [[0, 0, 0],
                  [0, 'r', 0],
                  [0, 0, 0]];
        */
        board2[4][4] = 0;
        board2[4][5] = 0;
        board2[4][6] = 0;
        board2[5][4] = 0;
        board2[5][5] = 'r'; // <-- checkCell target
        board2[5][6] = 0;
        board2[6][4] = 0;
        board2[6][5] = 0;
        board2[6][6] = 0;

        /*    Constructing testing subgrid:
                 [['r', 'r', 'r'],
                  ['r', 'r', 'r'],
                  ['r', 'r', 'r']];
        */
        board3[4][4] = 'r';
        board3[4][5] = 'r';
        board3[4][6] = 'r';
        board3[5][4] = 'r';
        board3[5][5] = 'r'; // <-- checkCell target
        board3[5][6] = 'r';
        board3[6][4] = 'r';
        board3[6][5] = 'r';
        board3[6][6] = 'r';

        /*******************
          checkCell targets:
        ********************/
        // Corners
        coords1 = [4, 4];
        coords2 = [4, 6];
        coords3 = [6, 4];
        coords4 = [6, 6];

        // Edges
        coords5 = [4, 5];
        coords6 = [5, 4];
        coords7 = [6, 5];
        coords8 = [5, 6];

        // Center
        coords9 = [5, 5];
      });

      it('returns an array', () => {
        expect(checkC(board1, coords1)).to.be.an('array');
        expect(checkC(board1, coords5)).to.be.an('array');
        expect(checkC(board2, coords9)).to.be.an('array');
        expect(checkC(board3, coords9)).to.be.an('array');
      });
      it('if no balls of same color are found in neightbour cells, it is empty', () => {
        expect(checkC(board2, coords9).length).to.be.equal(0);
        expect(checkC(board1, coords2).length).to.be.equal(0);
      });
      it('if balls of same color are in neighbour cells, it contains relative directions to found matches', () => {
        expect(checkC(board1, coords1).length).to.be.equal(1);
        expect(checkC(board1, coords1)[0]).to.deep.equal(directionsDict[4]);
        expect(checkC(board3, coords9).length).to.be.equal(8);
        expect(checkC(board3, coords9)).to.deep.equal(directionsDict);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => checkC(1, []),
            h2 = () => checkC([], true),
            h3 = () => checkC(.5, 's'),
            h4 = () => checkC([[0, 0, 0], [0, 0]], [0, 0]),
            h5 = () => checkC(iS().board.board, [11, 0]);

      const handlers = [h1, h2, h3, h4, h5];

      it(`throws an error if parameters don't correspond to (array, array)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0, 3), 'Wrong input, pass in proper parameters (array, array)')
      });
      it(`throws an error if board parameter doesn't represent a game board`, () => {
        expect(handlers[3]).to.throw(`board doesn't represent game board matrix`);
      });
      it(`throws an error if coords parameter doesn't represent valid coordinates`, () => {
        expect(handlers[4]).to.throw(`coords parameter needs to hold valid coords`);
      });
    });
  });

  describe(('analizeAxis'), () => {
    const directionsDict = [[-1, -1], [-1, 0], [-1, 1],
                            [0, -1],  /* x */  [0, 1],
                            [1, -1],  [1, 0],  [1, 1]];
    const iS = gameMethods.initialState;
    const analizeA = gameMethods.analizeAxis;

    context('Valid Input', () => {
      let board1 = iS().board.board,
          board2 = iS().board.board,
          board3 = iS().board.board,
          coords1, coords2, coords3, directions1, directions2, directions3;

      before(() => {
        /**************************
          Clearing all board grids
        **************************/
        board1 = board1.map(row => row.map(item => item=0));
        board2 = board2.map(row => row.map(item => item=0));
        board3 = board3.map(row => row.map(item => item=0));

        /*    Constructing testing subgrid:
                 [[ 0,   0 , 'b',  'r',  0'],
                  [ 0,   0,  'b',  0,   0],
                  ['b', 'b', 'b', 'b', 'b'],
                  [0,   'b', 'r', 'b', 'r'],
                  ['b', 'r', 'r', 'b', 'r']];
        */
        board1[3][3] = 0;
        board1[3][4] = 0;
        board1[3][5] = 'b';
        board1[3][6] = 'r';
        board1[3][7] = 0;

        board1[4][3] = 0;
        board1[4][4] = 0;
        board1[4][5] = 'b';
        board1[4][6] = 0;
        board1[4][7] = 0;

        board1[5][3] = 'b';
        board1[5][4] = 'b';
        board1[5][5] = 'b';
        board1[5][6] = 'b';
        board1[5][7] = 'b';

        board1[6][3] = 0;
        board1[6][4] = 'b';
        board1[6][5] = 'r';
        board1[6][6] = 'b';
        board1[6][7] = 'r';

        board1[7][3] = 'b';
        board1[7][4] = 'r';
        board1[7][5] = 'r';
        board1[7][6] = 'b';
        board1[7][7] = 'r';
        /*    Constructing testing subgrid:
                 [[ 0,   0,   0,   0,  'b'],
                  [ 0,   0,   0,   0,  'b'],
                  ['b', 'b', 'b', 'b', 'b'],
                  [ 0,   0,   0,   0,  'b'],
                  [ 0,   0,   0,   0,  'b']];
        */
        board2[3][3] = 0;
        board2[3][4] = 0;
        board2[3][5] = 0;
        board2[3][6] = 0;
        board2[3][7] = 'b';

        board2[4][3] = 0;
        board2[4][4] = 0;
        board2[4][5] = 0;
        board2[4][6] = 0;
        board2[4][7] = 'b';

        board2[5][3] = 'b';
        board2[5][4] = 'b';
        board2[5][5] = 'b';
        board2[5][6] = 'b';
        board2[5][7] = 'b';

        board2[6][3] = 0;
        board2[6][4] = 0;
        board2[6][5] = 0;
        board2[6][6] = 0;
        board2[6][7] = 'b';

        board2[7][3] = 0;
        board2[7][4] = 0;
        board2[7][5] = 0;
        board2[7][6] = 0;
        board2[7][7] = 'b';
        /*    Constructing testing subgrid:
                 [[ 0,   0,   0,   0,  0],
                  [ 0,   0,  'b',   0,  0],
                  [ 0,   0,  'b',  0,  0],
                  [ 0,   0,   0,   0,  0],
                  [ 0,   0,   0,   0,  0];
        */
        board3[4][5] = 'b'
        board3[5][5] = 'b';

        // target coords:
        coords1 = [5, 5];
        coords2 = [5, 7];
        coords3 = [3, 7];

        // directions:
        directions1 = [[0, -1], [-1, 0], [0, 1], [1, -1]];
        directions2 = [[-1, 0], [1, 0], [0, -1]];
        directions3 = [[-1, 0]];
      });

      it('returns an object', () => {
        expect(analizeA(board1, coords1, directions1)).to.be.an('object');
        expect(analizeA(board3, coords1, directions1)).to.be.an('object');
      });
      it(`should be empty if at least one five ball long line wasn't found`, () => {
        expect(analizeA(board3, coords1, directions3))
          .to.be.empty;
      });
      it('should have at least five long array for each returned key in object', () => {
        expect(analizeA(board1, coords1, directions1).horizontal.length)
          .to.be.equal(5);
      });
      it('each object key should have valid name', () => {
        expect(analizeA(board1, coords1, directions1)).to.own.property('horizontal');
        expect(analizeA(board2, coords2, directions2)).to.own.property('horizontal');
        expect(analizeA(board2, coords2, directions2)).to.own.property('vertical');
      });
      it('each object key should contain array of only valid coords', () => {
        expect(analizeA(board1, coords1, directions1).horizontal
          .filter(coord => coord
            .filter(num => num>=0 && num<10).length===2).length)
        .to.be.equal(analizeA(board1, coords1, directions1).horizontal.length);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => analizeA(true, [], []),
            h2 = () => analizeA([], .5, []),
            h3 = () => analizeA([], [], 's'),
            h4 = () => analizeA(1, 's', false),
            h5 = () => analizeA([[2, 2], [1, 1]], [], []),
            h6 = () => analizeA(iS().board.board, [1, -2], []),
            h7 = () => analizeA(iS().board.board, [0, 0], [[12, 's']]);

      const handlers = [h1, h2, h3, h4, h5, h6, h7];

      it(`throws an error if parameters don't correspond to (array, array, array)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0, 4), 'Wrong input, pass in proper parameters (array, array, array)');
      });
      it(`throws an error if board parameter doesn't represent a game board`, () => {
        expect(handlers[4]).to.throw(`board doesn't represent game board matrix`);
      });
      it(`throws an error if coords parameter doesn't hold valid coords`, () => {
        expect(handlers[5]).to.throw(`coords parameter needs to hold valid coords`);
      });
      it(`throws an error if directions parameter doesn't hold valid directions`, () => {
        expect(handlers[6]).to.throw(`directions parameter needs to hold valid directions`);
      });
    });
  });

  describe('setScore', () => {
    const iS = gameMethods.initialState;
    const setS = gameMethods.setScore;

    context('Valid Input', () => {
      let state1, state2, axis1, axis2, axis3;

      before(() => {
        state1 = iS();
        state2 = iS();
        state2.score = 10;

        axis1 = {
          horizontal: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]
        };
        axis2 = {
          horizontal: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]]
        }
        axis3 = {
          horizontal: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
          vertical: [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]]
        };
      });

      it('should return an object', () => {
        expect(setS(state1, axis1)).to.be.an('object');
        expect(setS(state2, axis3)).to.be.an('object');
      });
      it('should return a valid game state object', () => {
        expect(setS(state1, axis1)).to.own.property('board');
        expect(setS(state1, axis1)).to.own.property('nextLevel');
        expect(setS(state1, axis1)).to.own.property('score');
        expect(setS(state1, axis1)).to.own.property('selectionStart');
        expect(setS(state1, axis1)).to.own.property('selectionEnd');

        expect(setS(state2, axis3)).to.own.property('board');
        expect(setS(state2, axis3)).to.own.property('nextLevel');
        expect(setS(state2, axis3)).to.own.property('score');
        expect(setS(state2, axis3)).to.own.property('selectionStart');
        expect(setS(state2, axis3)).to.own.property('selectionEnd');
      });
      it('properly adds score with five balls long lines', () => {
        expect(setS(state1, axis1).score).to.be.equal(5);
        expect(setS(state2, axis1).score).to.be.equal(15);
      });
      it('properly adds score with more than five balls long lines', () => {
        expect(setS(state1, axis2).score).to.be.equal(15);
        expect(setS(state2, axis2).score).to.be.equal(25);
        expect(setS(state1, axis3).score).to.be.equal(30);
        expect(setS(state2, axis3).score).to.be.equal(40);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => setS(true, {}),
            h2 = () => setS({}, 1),
            h3 = () => setS('s', .5),
            h4 = () => setS({someKey: 1}, {}),
            h5 = () => setS(iS(), { someKey: [] });

      const handlers = [h1, h2, h3, h4, h5];

      it(`throws an error if parameters don't correspond to (object, object)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0, 3), 'Wrong input, pass in proper parameters (object, object)')
      });
      it(`throws an error if state parameter doesn't represent game state`, () => {
        expect(handlers[3]).to.throw(`state parameter needs to hold valid game state object`);
      });
      it(`throws an error if pending doesn't represent valid axis object`, () => {
        expect(handlers[4]).to.throw(`axis parameter needs to hold valid axis object`);
      });
    });
  });

  describe('passedTurn', () => {
    const iS = gameMethods.initialState;
    const pT = gameMethods.passedTurn;

    context('Valid Input', () => {
      let state1, state2;

      before(() => {
        state1 = iS();
        state2 = iS();
        state2.nextLevel = 1;
      });

      it('return an object', () => {
        expect(pT(state1)).to.be.an('object');
        expect(pT(state2)).to.be.an('object');
      });
      it('is a valid game state object', () => {
        expect(pT(state1)).to.own.property('board');
        expect(pT(state1)).to.own.property('nextLevel');
        expect(pT(state1)).to.own.property('score');
        expect(pT(state1)).to.own.property('selectionStart');
        expect(pT(state1)).to.own.property('selectionEnd');
      });
      it('decrements nextLevel value of input state by 1', () => {
        expect(pT(state1).nextLevel).to.be.equal(state1.nextLevel-1);
        expect(pT(state2).nextLevel).to.be.equal(0);
      });
    });

    context('Edge Cases', () => {
      let state = iS();
      state.nextLevel=0;

      const h1 = () => pT(1),
            h2 = () => pT({someKey: 1}),
            h3 = () => pT(state);

      const handlers = [h1, h2, h3];

      it(`throws an error if state parameter isn't an object`, () => {
        testTaskError(handlers, Error);
        expect(handlers[0]).to.throw('Wrong input, pass in proper parameter (object)');
      });
      it(`throws an error if state parameter doesn't represent game state`, () => {
        expect(handlers[1]).to.throw(`state parameter needs to hold valid game state object`);
      });
      it(`throws an error if input state.nextLevel is equal to 0`, () => {
        expect(handlers[2]).to.throw(`state.nextLevel can't be lower than 1, make sure to initiate new game state with next level`);
      });
    });
  })
});
