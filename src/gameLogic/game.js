'use strict'
// Imports
const pf = require('pathfinding');
const board = require('./board.js');

// Constants
const baseLevel = 10;

const initialState = () => ({
  board: board.setState(board.initialState()),
  nextLevel: baseLevel,
  score: 0,
  selectionStart: [],
  selectionEnd: []
});

/*****************
  GAME MECHANICS
******************/
// STATE.selection methods

const enqueueSelectionStart = (state, coords) => {
  if (typeof state !== 'object' ||
      !Array.isArray(coords))
    throw Error('Wrong input, pass in proper parameters (object, array)');
  if (!(coords.length===2 &&
      coords.filter(num => num>=0 && num<10).length===2))
    throw Error(`coords parameter needs to hold valid coords`);

  if (state.board.board[coords[0]][coords[1]]!==0) {
    return Object.assign(state, {selectionStart: coords});
  };
  return state;
};

const enqueueSelectionEnd = (state, coords) => {
  if (typeof state !== 'object' ||
      !Array.isArray(coords))
    throw Error('Wrong input, pass in proper parameters (object, array)');
  if (!(coords[0].length===2 &&
      coords[0].filter(num => num>=0 && num<10).length===2))
    throw Error(`coords parameter needs to hold valid coords`);

  if (state.selectionStart.length===2) {
    return Object.assign(state, {selectionEnd: [coords, state.board.board[state.selectionStart[0]][state.selectionStart[1]]]});
  }
  return state;
};


module.exports = { initialState, enqueueSelectionStart, enqueueSelectionEnd };
