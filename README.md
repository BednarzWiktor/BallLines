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
  - [ ] Refactor methods for readability and optimisation
  - [ ] Document the functionality of avaible methods
2. CLI version:
  - [ ] Create game loop
  - [ ] Create CLI UI
3. Web version:
  - [ ] Create adjusted game loop
  - [ ] Create browser GUI
  - [ ] Create graphical assets
  - [ ] Connect game to MongoDB server
  - [ ] Add user creation and authentication
  - [ ] Create stats page
  - [ ] Create game instance page
