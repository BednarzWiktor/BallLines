(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("pathfinding"));
	else if(typeof define === 'function' && define.amd)
		define(["pathfinding"], factory);
	else if(typeof exports === 'object')
		exports["balllines"] = factory(require("pathfinding"));
	else
		root["balllines"] = factory(root["pathfinding"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_pathfinding__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack://balllines/(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: board, game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameLogic_board_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameLogic/board.js */ \"./src/gameLogic/board.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"board\", function() { return _gameLogic_board_js__WEBPACK_IMPORTED_MODULE_0__[\"board\"]; });\n\n/* harmony import */ var _gameLogic_game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameLogic/game.js */ \"./src/gameLogic/game.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"game\", function() { return _gameLogic_game_js__WEBPACK_IMPORTED_MODULE_1__[\"game\"]; });\n\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://balllines/./src/app.js?");

/***/ }),

/***/ "./src/gameLogic/board.js":
/*!********************************!*\
  !*** ./src/gameLogic/board.js ***!
  \********************************/
/*! exports provided: board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"board\", function() { return board; });\nconst board = (function() {\r\n  'use strict';\r\n  // Constants\r\n  const size = 10;\r\n  const balls = ['r', 'g', 'b', 'y', 'c', 'm', 'o', 's', 'b'];\r\n  const levelBase = 10;\r\n\r\n  /*****************************\r\n    BOARD STATE MANIPULATION\r\n  ******************************/\r\n  // STATE.board methods\r\n  const generateBoard = () => {\r\n    const row = new Array(size).fill(0)\r\n    return new Array(size).fill(row);\r\n  };\r\n\r\n  const updateBoard = (board, pendingCoords, method) => {\r\n    if (!Array.isArray(board) || !Array.isArray(pendingCoords) || typeof method!=='string')\r\n      throw Error('Wrong input, pass in proper parameters (array, array, string)');\r\n    if (board.length!==10)\r\n      throw Error(`your board parameter doesn't have proper size (10x10)`);\r\n    if (board.length!==board[0].length)\r\n      throw Error(`your board parameter doesn't have proper size (10x10)`);\r\n    if (!['add', 'remove'].includes(method))\r\n      throw Error(`your methods parameter doesn't equal 'add' or 'remove'`);\r\n\r\n    return board.reduce((acc, row, rowIndex) => {\r\n      const newRow = row.reduce((acc, item, itemIndex) => {\r\n        let match = 1;\r\n\r\n        if (method==='add') {\r\n          pendingCoords.map(coord => {\r\n            if (coord[0][0]===rowIndex && coord[0][1]===itemIndex) {\r\n              if (item===0)\r\n                match = coord[1];\r\n            }\r\n          }, []);\r\n        } else if (method==='remove') {\r\n          pendingCoords.map(coord => {\r\n            if (coord[0]===rowIndex && coord[1]===itemIndex) {\r\n              match = 0;\r\n            }\r\n          }, []);\r\n        }\r\n\r\n        match!==1 ? acc.push(match) : acc.push(item);\r\n        return acc;\r\n      }, []);\r\n\r\n      acc.push(newRow);\r\n      return acc;\r\n    }, []);\r\n  };\r\n\r\n  // STATE.freeCoords methods\r\n  const getFreeCoords = board => {\r\n    if (!Array.isArray(board))\r\n      throw Error('Provided input needs to be an array');\r\n    if (board.filter(row => row.length===board.length).length !== board.length)\r\n      throw Error('Provided array needs to be a square matrix');\r\n    return board.reduce((outerAcc, outerItem, outerIndex) => {\r\n            outerItem.reduce((innerAcc, innerItem, innerIndex) => {\r\n              if (innerItem===0) {\r\n                outerAcc.push(new Array(outerIndex, innerIndex))\r\n              };\r\n              return outerAcc;\r\n            }, []);\r\n            return outerAcc;\r\n          }, []);\r\n  };\r\n\r\n  // STATE.pendingCoords methods\r\n  const getRandomNumber = limit => {\r\n    if (!Number.isInteger(limit)) throw Error('input needs to be an integer');\r\n    if (limit<0) throw Error('input needs to be a positive number');\r\n    return Math.floor(Math.random() * limit);\r\n  };\r\n\r\n  const pushRandom = (array, limit, unique = false) => {\r\n    if (!Array.isArray(array)\r\n        || !Number.isInteger(limit)\r\n        || !(typeof unique==='boolean'))\r\n        throw Error('Wrong input, pass in proper parameters (array, integer, [boolean])');\r\n\r\n    const random = getRandomNumber(limit);\r\n    if (unique) {\r\n      return array.includes(random) ? array : array.concat([random]);\r\n    } else {\r\n      return array.concat([random]);\r\n    }\r\n  };\r\n\r\n  const getRandomIndexes = (inputArray, limit, baseArray = []) => {\r\n    if (!Array.isArray(inputArray)\r\n        || !Number.isInteger(limit)\r\n        || !Array.isArray(baseArray))\r\n        throw Error('Wrong input, pass in proper parameters (array, integer, array)');\r\n\r\n    if (inputArray.length===0) {\r\n      return [];\r\n    } else {\r\n      return baseArray.length===limit ?\r\n        baseArray :\r\n        getRandomIndexes(inputArray, limit, pushRandom(baseArray, inputArray.length));\r\n    }\r\n  };\r\n\r\n  const getRandomUniqueIndexes = (inputArray, limit, baseArray = []) => {\r\n    if (!Array.isArray(inputArray)\r\n        || !Number.isInteger(limit)\r\n        || !Array.isArray(baseArray))\r\n        throw Error('Wrong input, pass in proper parameters (array, integer, array)');\r\n\r\n    if (inputArray.length===0) {\r\n      return [];\r\n    } else if (inputArray.length<=limit) {\r\n      return inputArray.reduce((acc, curr, i) => {\r\n        acc.push(i);\r\n        return acc;\r\n      }, [])\r\n    } else {\r\n      return baseArray.length===limit ?\r\n        baseArray :\r\n        getRandomUniqueIndexes(inputArray, limit, pushRandom(baseArray, inputArray.length, true));\r\n    }\r\n  };\r\n\r\n  const translateIndexes = (indexArray, dictionary) => {\r\n    if (!Array.isArray(indexArray) || !Array.isArray(dictionary))\r\n      throw Error('Wrong input, pass in proper parameters (array, array)');\r\n    if (dictionary.length===0)\r\n      throw Error(`dictionary parameter can't be empty`);\r\n    if (indexArray.filter(index => index<dictionary.length).length!==indexArray.length)\r\n      throw Error(`indexArray elements exceeding dictionary index range`);\r\n\r\n    return indexArray.map(index => dictionary[index]);\r\n  };\r\n\r\n  const createPendingCoords = (coords, colors) => {\r\n    if (!Array.isArray(coords) || !Array.isArray(colors))\r\n      throw Error('Wrong input, pass in proper parameters (array, array)');\r\n    if (coords.length!==colors.length)\r\n      throw Error('coords and colors parameters are not equal in legth');\r\n\r\n    return coords.reduce((acc, coord, i) => {\r\n      acc.push([coord, colors[i]]);\r\n      return acc;\r\n    }, []);\r\n  };\r\n\r\n  /*******************\r\n    STATE HANDLERS\r\n  *******************/\r\n\r\n  // Global state handlers\r\n  const initialState = (level = 0) => ({\r\n    board: generateBoard(),\r\n    level: level,\r\n    freeCoords: function() {return getFreeCoords(this.board)},\r\n    pendingCoords: function() {\r\n      return createPendingCoords(\r\n        translateIndexes(getRandomUniqueIndexes(this.freeCoords(), 5), this.freeCoords()),\r\n        translateIndexes(getRandomIndexes(balls.slice(0, 3), 5), balls.slice(0, 3))\r\n      )}\r\n  });\r\n\r\n  const setState = (prevState = initialState(), level = 0) => ({\r\n    board: updateBoard(prevState.board, prevState.pendingCoords(), 'add'),\r\n    level: level,\r\n    freeCoords: function() {return getFreeCoords(this.board)},\r\n    pendingCoords: function() {\r\n      return createPendingCoords(\r\n        translateIndexes(getRandomUniqueIndexes(this.freeCoords(), 3), this.freeCoords()),\r\n        translateIndexes(getRandomIndexes(balls.slice(0, 3+this.level), 3), balls)\r\n      )}\r\n  });\r\n\r\n  // Board state handlers\r\n  const moveBall = (state, start, end) => {\r\n    if (typeof state !== 'object' ||\r\n        !Array.isArray(start) ||\r\n        !Array.isArray(end))\r\n      throw Error('Wrong input, pass in proper parameters (object, array, array)');\r\n    if (!('board' in state) ||\r\n        !('level' in state) ||\r\n        !('freeCoords' in state) ||\r\n        !('pendingCoords' in state))\r\n      throw Error(`your input state parameter doesn't reporesent board state`);\r\n    if (start.length!==2 || start.filter(num => num>=0 && num<10).length!==2)\r\n      throw Error(`start parameter doesn't represent valid board coords`);\r\n    if (end[0].length!==2 || end[0].filter(num => num>=0 && num<10).length!==2)\r\n      throw Error(`end parameter doesn't hold valid board coords`);\r\n    if (end[1].length!==1 && !balls.includes(end[1]))\r\n      throw Error(`end parameter doesn't hold valid ball color`);\r\n\r\n    const board = updateBoard(updateBoard(state.board, [start], 'remove'), [end], 'add');\r\n    const test=state.pendingCoords();\r\n    return ({\r\n      board: board,\r\n      level: state.level,\r\n      freeCoords: state.freeCoords,\r\n      pendingCoords: state.pendingCoords()\r\n    });\r\n  }\r\n\r\n  // Exports\r\n  if (!window) {\r\n    return module.exports = { generateBoard, getFreeCoords, getRandomNumber, pushRandom, getRandomIndexes, getRandomUniqueIndexes, translateIndexes, createPendingCoords, updateBoard, initialState, setState, moveBall };\r\n  }\r\n\r\n  const methods = { generateBoard, getFreeCoords, getRandomNumber, pushRandom, getRandomIndexes, getRandomUniqueIndexes, translateIndexes, createPendingCoords, updateBoard, initialState, setState, moveBall }\r\n\r\n  return methods;\r\n})();\r\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack://balllines/./src/gameLogic/board.js?");

/***/ }),

/***/ "./src/gameLogic/game.js":
/*!*******************************!*\
  !*** ./src/gameLogic/game.js ***!
  \*******************************/
/*! exports provided: game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"game\", function() { return game; });\n/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.js */ \"./src/gameLogic/board.js\");\n// Imports\r\nconst PF = __webpack_require__(/*! pathfinding */ \"pathfinding\");\r\n\r\n\r\nconst game = (function() {\r\n  'use strict'\r\n\r\n  // Constants\r\n  const baseLevel = 5;\r\n  const directionsDict = [[-1, -1], [-1, 0], [-1, 1],\r\n                          [0, -1],  /* x */  [0, 1],\r\n                          [1, -1],  [1, 0],  [1, 1]];\r\n\r\n  const initialState = () => ({\r\n    board: _board_js__WEBPACK_IMPORTED_MODULE_0__[\"board\"].setState(_board_js__WEBPACK_IMPORTED_MODULE_0__[\"board\"].initialState()),\r\n    nextLevel: baseLevel*2,\r\n    score: 0,\r\n    selectionStart: [],\r\n    selectionEnd: []\r\n  });\r\n\r\n  /*****************\r\n    GAME MECHANICS\r\n  ******************/\r\n  // STATE.selection methods\r\n\r\n  const enqueueSelectionStart = (state, coords) => {\r\n    if (typeof state !== 'object' ||\r\n        !Array.isArray(coords))\r\n      throw Error('Wrong input, pass in proper parameters (object, array)');\r\n    if (!(coords.length===2 &&\r\n        coords.filter(num => num>=0 && num<10).length===2))\r\n      throw Error(`coords parameter needs to hold valid coords`);\r\n\r\n    if (state.board.board[coords[0]][coords[1]]!==0) {\r\n      const prevState = Object.assign({}, state);\r\n      return Object.assign(prevState, {selectionStart: coords});\r\n    };\r\n    return state;\r\n  };\r\n\r\n  const enqueueSelectionEnd = (state, coords) => {\r\n    if (typeof state !== 'object' ||\r\n        !Array.isArray(coords))\r\n      throw Error('Wrong input, pass in proper parameters (object, array)');\r\n    if (!(coords.length===2 ||\r\n        coords.filter(num => num>=0 && num<10).length!==2))\r\n      throw Error(`coords parameter needs to hold valid coords`);\r\n\r\n    if (state.selectionStart.length===2) {\r\n      const prevState = Object.assign({}, state);\r\n      return Object.assign(prevState, {selectionEnd: [coords, state.board.board[state.selectionStart[0]][state.selectionStart[1]]]});\r\n    }\r\n    return state;\r\n  };\r\n\r\n  const handleSelection = state => {\r\n    if (typeof state !== 'object')\r\n      throw Error('Wrong input, pass in proper parameter (object)');\r\n    if (!('board' in state) ||\r\n        !('nextLevel' in state) ||\r\n        !('score' in state) ||\r\n        !('selectionStart' in state) ||\r\n        !('selectionEnd' in state))\r\n      throw Error(`input object doesn't represent game state`);\r\n    if (state.selectionStart.length!==2)\r\n      throw Error('selectionStart in passed object is empty');\r\n    if (state.selectionEnd.length!==2)\r\n      throw Error('selectionEnd in passed object is empty');\r\n\r\n    const prevState = Object.assign({}, state),\r\n          prevBoard = state.board,\r\n          prevStart = state.selectionStart,\r\n          prevEnd = state.selectionEnd;\r\n\r\n    return Object.assign(prevState, {\r\n      board: _board_js__WEBPACK_IMPORTED_MODULE_0__[\"board\"].moveBall(prevBoard, prevStart, prevEnd),\r\n      selectionStart: [],\r\n      selectionEnd: []\r\n    });\r\n  };\r\n\r\n  const findPath = state => {\r\n    if (typeof state !== 'object')\r\n      throw Error('Wrong input, pass in proper parameter (object)');\r\n    if (!('board' in state) ||\r\n        !('nextLevel' in state) ||\r\n        !('score' in state) ||\r\n        !('selectionStart' in state) ||\r\n        !('selectionEnd' in state))\r\n      throw Error(`input object doesn't represent game state`);\r\n\r\n    const walkabilityMatrix = new PF.Grid(\r\n      state.board.board.map(row => row.map(item => item===0 ? item : 1)));\r\n\r\n    return new PF.AStarFinder({allowDiagonal: false})\r\n      .findPath(\r\n        state.selectionStart[0],\r\n        state.selectionStart[1],\r\n        state.selectionEnd[0][0],\r\n        state.selectionEnd[0][1],\r\n        walkabilityMatrix\r\n    );\r\n  };\r\n\r\n  const checkCell = (board, coords) => {\r\n    if (!Array.isArray(board) ||\r\n        !Array.isArray(coords))\r\n      throw Error('Wrong input, pass in proper parameters (array, array)');\r\n    if (board.length!==10)\r\n      throw Error(`board doesn't represent game board matrix`);\r\n    if (board.length!==board[0].length)\r\n      throw Error(`board doesn't represent game board matrix`);\r\n    if (coords.length!==2 ||\r\n        coords.filter(num => num>=0 && num<10).length!==2)\r\n      throw Error(`coords parameter needs to hold valid coords`);\r\n\r\n    const ball = board[coords[0]][coords[1]];\r\n    const adjustedDirections = directionsDict\r\n      .map(\r\n        dir => [dir[0]+coords[0], dir[1]+coords[1]])\r\n      .filter(\r\n        dir => !(dir[0]>9||dir[0]<0||dir[1]>9||dir[1]<0)\r\n    );\r\n\r\n    return adjustedDirections\r\n      .filter(\r\n        dir => board[dir[0]][dir[1]]===ball)\r\n      .map(\r\n        dir => [dir[0]-coords[0], dir[1]-coords[1]]\r\n      );\r\n  };\r\n\r\n  const analizeAxis = (board, coords, directions) => {\r\n    if (!Array.isArray(board) ||\r\n        !Array.isArray(coords) ||\r\n        !Array.isArray(directions))\r\n      throw Error('Wrong input, pass in proper parameters (array, array, array)');\r\n    if (board.length!==10)\r\n      throw Error(`board doesn't represent game board matrix`);\r\n    if (board.length!==board[0].length)\r\n      throw Error(`board doesn't represent game board matrix`);\r\n    if (coords.length!==2 ||\r\n        coords.filter(num => num>=0 && num<10).length!==2)\r\n      throw Error(`coords parameter needs to hold valid coords`);\r\n    if (directions.filter(dir => Array.isArray(dir) && dir.length===2 && Number.isInteger(dir[0]) && Number.isInteger(dir[1])).length!==directions.length)\r\n      throw Error(`directions parameter needs to hold valid directions`);\r\n    // inner recurring function finding consecutive balls of matching color in given direction\r\n    const innerFunc = (ball, board, coords, direction, output) => {\r\n      const y = coords[0]+direction[0],\r\n            x = coords[1]+direction[1];\r\n\r\n      if (board[y][x]===ball) {\r\n        let newOutput = output;\r\n        newOutput.push([y, x]);\r\n        return innerFunc(ball, board, [y, x], direction, newOutput);\r\n      }\r\n      return output;\r\n    };\r\n\r\n    const ball = board[coords[0]][coords[1]];\r\n\r\n    // creating object for all passed directions with lines of any length\r\n    const unfiltered = directions.reduce((result, dir) => {\r\n      if ((dir[0]===0 && dir[1]===-1) || (dir[0]===0 && dir[1]===1)) { // x axis\r\n        if ('horizontal' in result) {\r\n          result.horizontal = result.horizontal.concat(innerFunc(ball, board, coords, dir, []));\r\n        } else {\r\n          result.horizontal = [coords, ...innerFunc(ball, board, coords, dir, [])];\r\n        }\r\n        return result;\r\n      } else if ((dir[0]===-1 && dir[1]===0) || (dir[0]===1 && dir[1]===0)) { // y axis\r\n        if ('vertical' in result) {\r\n          result.vertical = result.vertical.concat(innerFunc(ball, board, coords, dir, []));\r\n        } else {\r\n          result.vertical = [coords, ...innerFunc(ball, board, coords, dir, [])];\r\n        }\r\n        return result;\r\n      } else if ((dir[0]===-1 && dir[1]===-1) || (dir[0]===1 && dir[1]===1)) { // x/y axis\r\n        if ('diagonal_LT_RB' in result) {\r\n          result.diagonal_LT_RB = result.diagonal_LT_RB.concat(innerFunc(ball, board, coords, dir, []));\r\n        } else {\r\n          result.diagonal_LT_RB = [coords, ...innerFunc(ball, board, coords, dir, [])];\r\n        }\r\n        return result;\r\n      } else if ((dir[0]===-1 && dir[1]===1) || (dir[0]===1 && dir[1]===-1)) { // -x/y axis\r\n        if ('diagonal_RT_LB' in result) {\r\n          result.diagonal_RT_LB = result.diagonal_RT_LB.concat(innerFunc(ball, board, coords, dir, []));\r\n        } else {\r\n          result.diagonal_RT_LB = [coords, ...innerFunc(ball, board, coords, dir, [])];\r\n        }\r\n        return result;\r\n      }\r\n    }, {});\r\n\r\n    // filtering created object to include only lines with length 5 or more\r\n    const filtered = Object.keys(unfiltered).filter(key => unfiltered[key].length>=5);\r\n\r\n    const final = filtered.reduce((output, key) => {\r\n      output[key] = unfiltered[key];\r\n      return output;\r\n    }, {});\r\n\r\n    return final;\r\n  };\r\n\r\n  const setScore = (state, axis) => {\r\n    if (typeof state !== 'object' ||\r\n        typeof axis !== 'object')\r\n      throw Error('Wrong input, pass in proper parameters (object, object)');\r\n    if (!('board' in state) ||\r\n        !('nextLevel' in state) ||\r\n        !('score' in state) ||\r\n        !('selectionStart' in state) ||\r\n        !('selectionEnd' in state))\r\n      throw Error(`state parameter needs to hold valid game state object`);\r\n    if (\r\n      Object.keys(axis)\r\n        .filter( a => a==='horizontal' ||\r\n                      a==='vertical' ||\r\n                      a==='diagonal_LT_RB' ||\r\n                      a==='diagonal_RT_LB').length !==\r\n      Object.keys(axis).length\r\n    )\r\n      throw Error(`axis parameter needs to hold valid axis object`);\r\n\r\n\r\n    const prevState = Object.assign({}, {\r\n      board: state.board,\r\n      nextLevel: state.nextLevel,\r\n      score: state.score,\r\n      selectionStart: state.selectionStart,\r\n      selectionEnd: state.selectionEnd\r\n    });\r\n    const length = Object.keys(axis)\r\n      .reduce((sum, a) => {\r\n        sum+=axis[a].length;\r\n        return sum;\r\n      }, 0)\r\n    const scoreIncrement = length>5 ? 5*(length-4) : 5;\r\n    return Object.assign(prevState, {\r\n      score: (prevState.score+scoreIncrement)\r\n    });\r\n  };\r\n\r\n  const passedTurn = state => {\r\n    if (typeof state !== 'object')\r\n      throw Error('Wrong input, pass in proper parameter (object)');\r\n    if (!('board' in state) ||\r\n        !('nextLevel' in state) ||\r\n        !('score' in state) ||\r\n        !('selectionStart' in state) ||\r\n        !('selectionEnd' in state))\r\n      throw Error(`state parameter needs to hold valid game state object`);\r\n    if (state.nextLevel<1)\r\n      throw Error(`state.nextLevel can't be lower than 1, make sure to initiate new game state with next level`)\r\n\r\n    return Object.assign({}, {\r\n      board: state.board,\r\n      score: state.score,\r\n      nextLevel: state.nextLevel-1,\r\n      selectionStart: state.selectionStart,\r\n      selectionEnd: state.selectionEnd\r\n    });\r\n  };\r\n\r\n  // Exports\r\n  if (!window) {\r\n    module.exports = { initialState, enqueueSelectionStart, enqueueSelectionEnd, handleSelection, findPath, checkCell, analizeAxis, setScore, passedTurn };\r\n  }\r\n\r\n  const methods = { initialState, enqueueSelectionStart, enqueueSelectionEnd, handleSelection, findPath, checkCell, analizeAxis, setScore, passedTurn };\r\n\r\n  return methods;\r\n\r\n})()\r\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack://balllines/./src/gameLogic/game.js?");

/***/ }),

/***/ "pathfinding":
/*!******************************!*\
  !*** external "pathfinding" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_pathfinding__;\n\n//# sourceURL=webpack://balllines/external_%22pathfinding%22?");

/***/ })

/******/ });
});