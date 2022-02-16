"use strict";
// globals
let col = 120;
let row = 120;
let grid = [];

// matrix builder
function makeMatrix(col, row) {
  let arr = new Array(col).fill(null).map(randomGen);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(row).fill(null).map(randomGen);
  }
  return arr;
}

// returns 0 or 1 for seeding grid
function randomGen() {
  return Math.floor(Math.random() * 2);
}

// setup function for p5.js
function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("board-game");

  grid = makeMatrix(col, row);
}
setInterval(function draw() {
  // w * rows/cols should equal canvas size
  let w = 5;
  background(230);

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      let x = j * w;
      let y = i * w;
      // only fill rectangle if one
      if (grid[i][j] === 1) {
        fill(6, 204, 0);
        rect(x, y, w, w);
      }
    }
  }

  // make next board
  let nextBoard = makeMatrix(col, row);

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      //rules for next generation
      let state = grid[i][j];
      let neighbors = countNeighbors(i, j, grid);
      if (state === 0 && neighbors === 3) {
        nextBoard[i][j] = 1;
        continue;
      }
      if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        if (neighbors > 3 && state === 1) {
          //console.log(" more than 3 neighbors");
        }
        nextBoard[i][j] = 0;
      } else {
        nextBoard[i][j] = state;
      }
    }
  }
  grid = nextBoard;
}, 150);
function countNeighbors(x, y, grid) {
  let neighbors = 0;
  //loop top
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      neighbors += grid[(x + i + col) % col][(y + j + row) % row];
    }
  }
  // subtract middle
  neighbors -= grid[x][y];
  return neighbors;
}
