# BallLines

Remake of classic logic game coded in ES6.

## Introduction

Lines95 by [Anatoly Podgoretsky](https://torry.net/authorsmore.php?id=476) is a classic logic game with engaging and addictive gameplay. The goal of the game is to create lines of same colored balls in one of four avaible axis: horizontal, vertical or diagonals. Player is allowed to move one ball per turn, after each turn the game spawns in additional balls on the board. When a line with length of at least five balls is created, player is rewarded with points. The goal of the game is to compete for highest possible score before the board gets filled up with balls.

I've set out to code this game as a challenge in creating a simple engine based on FP (functional programming) paradigm with TDD approach. With game engine as an independent, platform agnostic module I plan to create a CLI and browser GUI for the game.

The goal of this activity is practice with new technologies and paradigms and to ultimately enrich my portfolio with distribution ready product.

## Work Progress

1. Game Logic:
  - [x] Create test suites for board methods
  - [x] Create board state creation and manipulation methods
  - [x] Create test suites for game methods
  - [x] Create game state creation and manipulation methods
  - [x] Refactor methods for readability and optimisation
  - [x] Bundle into distribution ready library
  - [ ] Document the functionality of available public methods

## Docs

### State Entities:

Starting state entities are generated with ``` .initialState() ``` methods. Calling this method on game ``` game.initialState() ``` creates both game state entity and board state entity, which is a child of the game state.
Every parameter of state entities is created or updated **only** using provided methods for those state entities.

Each method updating the state entity will always return a **new** state entity of the same kind (game or board).  

- board state
```
{
  board: [],
  level: integer,
  freeCoords: [],
  pendingCoords: []
}
```
##### Parameters
**board**
  Two dimentional matrix representing a 10x10 game board, each cell holds either 0 value or a string from internal dictionary.
**level**
  Positive integer representing current level
**freeCoords**
  Array of board coordinates in format of [y, x] where:
  y = position on y axis
  x = position on x axis
  Coordinates contained in this array represent free board cells (cells with value 0)
**pendingCoords**
  Array of board coordinates with pending ball spawns in format of [[y, x], ballName] where:
  [y, x] - coordinates to spawn a ball
  ballName - string representing color of pending ball chosen from collection of available ball colors.

- game state
```
{
  board: boardStateEntity,
  nextLevel: integer,
  score: integer,
  selectionStart: [],
  selectionEnd: []
}
```
##### Parameters:
**board**
  Board state entity
**nextLevel**
  Positive integer representing amount of valid player moves left. When this number reaches 0, *game.board* should be updated to a new initialState of board entity with increased level.
**score**
  Positive integer representing score accumulated by a player
**selectionStart**
  Array of board coordinate marking selected cell [[y, x]]. Selected cell needs to have a non-0 value.
**selectionEnd**
  Array of board coordinate and with assigned ball color [[y, x], ballName] marking destination for selected cell. *[y, x]* needs to mark cell containing 0 value and *ballName* represents value of coordinates in ``` game.selectionStart ```

## Methods

Described methods take in either **entity state contents** or **custom value** as parameters.
Whenever a parameter represents entity state content, it will be described as *x.content*, where:
x - state entity of *game* or *state*
content - state entity parameter

eg. ``` game.nextLevel, board.level ```

Whenever a parameter represents a custom value, it means that it is being derived from data outside of state entities. Custom value can be a string describing expected method behaviour or a result of functional methods.

Each method can be either a state setter or a functional method.
**State setters** always return a new, updated state of either board or game state entity.
**Functional methods** returns an intermediate data needed for further processing or as an input parameter for a *state setter*

### Public board Methods

#### State Setters

#### Functional methods

### Public game Methods

#### State Setters

#### Functional methods
