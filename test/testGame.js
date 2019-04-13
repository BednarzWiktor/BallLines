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
});
