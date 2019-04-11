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
