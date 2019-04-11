const expect = require('chai').expect;

describe('GAME', () => {
  const gameMethods = require('../src/gameLogic/game.js');

  // Task Runners
  const testTaskError = (handlers, expectation) => {
    handlers.forEach(handler => {
      expect(handler).to.throw(expectation);
    });
  }

  describe('enqueueSelection', () => {
    const enqS = gameMethods.enqueueSelection;

    context('Valid Input', () => {
      let state1, coords1, coords2, method1, method2;

      before(() => {
        state1={selectionStart: [], selectionEnd: []};
        coords1=[0, 0];
        coords2=[9, 9];
        method1='start';
        method2='end';
      });

      it('should return an object', () => {
        expect(enqS(state1, coords1, method1)).to.be.an('object');
        expect(enqS(state1, coords2, method2)).to.be.an('object');
      });
      it('should maintain structure of input object', () => {
        expect(enqS(state1, coords1, method1)).to.own('selectionStart');
        expect(enqS(state1, coords2, method1)).to.own('selectionEnd');
        expect(enqS(state1, coords2, method2)).to.own('selectionStart');
        expect(enqS(state1, coords1, method2)).to.own('selectionEnd');
      });

      context('method=start', () => {
        it('should change only selectionStart key compared to input state', () => {
          expect(enqS(state1, coords1, method1).selectionEnd)
            .to.deep.equal(state1.selectionEnd);
        });
        it('should return an object with selectionStart value holding valid coords', () => {
          expect(enqS(state1, coords1, method1).selectionStart)
            .to.deep.equal(coords1);
        });
      });
      context('method=end', () => {
        it('should change only selectionEnd key compared to input state', () => {
          expect(enqS(state1, coords2, method2).selectionStart)
            .to.deep.equal(state1.selectionStart);
        });
        it('should return an object with selectionEnd value holding valid coords', () => {
          expect(enqS(state1, coords2, method2).selectionEnd)
            .to.deep.equal(coords2);
        });
      });
    });

    context('Edge Cases', () => {
      const h1 = () => enqS([], []),
            h2 = () => enqS({}, 's'),
            h3 = () => enqS(true, 1),
            h4 = () => enqS({someKey: []}, [0, 0]),
            h5 = () => enqS({selectionStart: [], selectionEnd: []}, ['s', 1]);

      const handlers = [h1, h2, h3, h4, h5];

      it(`throws an error if parameters don't correspond to (object, array)`, () => {
        testTaskError(handlers, Error);
        testTaskError(handlers.slice(0,3), 'Wrong input, pass in proper parameters (object, array, string)');
      });
      it(`throws an error if state parameter doesn't have proper structure`, () => {
        expect(handlers[3]).to.throw(`Proper state object wasn't passed into the function`);
      });
      it(`throws an error if coords parameter doesn't hold valid coords`, () => {
        expect(handlers[3]).to.throw(`coords parameter needs to hold valid coords`);
      })
      it(`throws an error if method parameter !== 'start' || 'end'`, () => {
        expect(handlers[3]).to.throw(`method parameter needs to have 'start' or 'end' value`);
      });
    });
  });
});
