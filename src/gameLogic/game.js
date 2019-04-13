'use strict'
// Imports
const PF = require('pathfinding');
const board = require('./board.js');

// Constants
const baseLevel = 5;

const initialState = () => ({
  board: board.setState(board.initialState()),
  nextLevel: baseLevel*2,
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
    const prevState = Object.assign({}, state);
    return Object.assign(prevState, {selectionStart: coords});
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
    const prevState = Object.assign({}, state);
    return Object.assign(prevState, {selectionEnd: [coords, state.board.board[state.selectionStart[0]][state.selectionStart[1]]]});
  }
  return state;
};

const handleSelection = state => {
  if (typeof state !== 'object')
    throw Error('Wrong input, pass in proper parameter (object)');
  if (!('board' in state) ||
      !('nextLevel' in state) ||
      !('score' in state) ||
      !('selectionStart' in state) ||
      !('selectionEnd' in state))
    throw Error(`input object doesn't represent game state`);
  if (state.selectionStart.length!==2)
    throw Error('selectionStart in passed object is empty');
  if (state.selectionEnd.length!==2)
    throw Error('selectionEnd in passed object is empty');

  const prevState = Object.assign({}, state),
        prevBoard = state.board,
        prevStart = state.selectionStart,
        prevEnd = state.selectionEnd;

  return Object.assign(prevState, {
    board: board.moveBall(prevBoard, prevStart, prevEnd),
    selectionStart: [],
    selectionEnd: []
  });
};

const findPath = state => {
  if (typeof state !== 'object')
    throw Error('Wrong input, pass in proper parameter (object)');
  if (!('board' in state) ||
      !('nextLevel' in state) ||
      !('score' in state) ||
      !('selectionStart' in state) ||
      !('selectionEnd' in state))
    throw Error(`input object doesn't represent game state`);

  const walkabilityMatrix = new PF.Grid(state.board.board
    .map(row => row.map(item => item===0 ? item : 1)));
  return new PF.AStarFinder({allowDiagonal: false})
    .findPath(
      state.selectionStart[0],
      state.selectionStart[1],
      state.selectionEnd[0][0],
      state.selectionEnd[0][1],
      walkabilityMatrix
  );
};

module.exports = { initialState, enqueueSelectionStart, enqueueSelectionEnd, handleSelection, findPath };
