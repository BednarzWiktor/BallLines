const expect = require('chai').expect;

describe('GAME', () => {
  const gameMethods = require('../src/gameLogic/game.js');

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
            h4 = () => enqSE(initS(), ['s', true]);

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
    const directions = gameMethods.directions;
    const checkC = gameMethods.checkCell;

    context('Valid Input', () => {
      let board1, board2, board3, coords1, coords2, coords3, coords4, coords5, coords6, coords7, coords8, coords9;

      before(() => {
        board1 = [['r', 'r', 'g'],
                  ['b', 'b', 'r'],
                  ['b', 'b', 'r']];
        board2 = [[0, 0, 0],
                  [0, 'r', 0],
                  [0, 0, 0]];
        board3 = [['r', 'r', 'r'],
                  ['r', 'r', 'r'],
                  ['r', 'r', 'r']];

        // Corners
        coords1 = [0, 0];
        coords2 = [0, 2];
        coords3 = [2, 0];
        coords4 = [2, 2];

        // Edges
        coords5 = [0, 1];
        coords6 = [1, 0];
        coords7 = [2, 1];
        coords8 = [1, 2];

        // Center
        coords9 = [1, 1];
      });

      it('returns an array', () => {
        expect(checkC(board1, coords1)).to.be.an('array');
        expect(checkC(board1, coords5)).to.be.an('array');
        expect(checkC(board2, coords9)).to.be.an('array');
        expect(checkC(board3, coords9)).to.be.an('array');
      });
      it('if no balls of same color are found in neightbour cells, it is empty', () => {
        expect(checkC(board2, coords9).length).to.be.equal(0);
        expect(chechC(board1, coords2).length).to.be.equal(0);
      });
      it('if balls of same color are in neighbour cells, it contains relative directions to found matches', () => {
        expect(checkC(board1, coords1).length).to.be.equal(1);
        expect(checkC(board1, coords1)[0]).to.deep.equal(directions[4]);
        expect(checkC(board3, coords9).length).to.be.equal(8);
        expect(checkC(board3, coords9)).to.deep.equal(directions);
      });
    });

    context('Edge Cases', () => {
      const h1 = () => checkC(1, []),
            h2 = () => checkC([], true),
            h3 = () => checkC(.5, 's'),
            h4 = () => checkC([[0, 0, 0], [0, 0]], [0, 0]),
            h5 = () => checkC([[0, 0], [0, 0]], [11, 0]);

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
  })
});
