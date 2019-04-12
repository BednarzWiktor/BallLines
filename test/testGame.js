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
});
