"use strict";
// globals
const col = 120;
const row = 120;
let grid = [];

const speedSlider = document.getElementById("speed");
speedSlider.addEventListener("change");

// matrix builder
function makeMatrix(row, col) {
  let arr = new Array(row).fill(null).map(randomGen);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(col).fill(null).map(randomGen);
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
  grid = makeMatrix(row, col);
}
function draw() {
  frameRate(parseInt(speedSlider.value));
  // w * rows/cols should equal canvas size
  const w = 5;
  updateState(grid);
  background(230);

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let x = j * w;
      let y = i * w;
      // only fill rectangle if one
      if (grid[i][j] === 1) {
        fill(6, 204, 0);
        rect(x, y, w, w);
      }
    }
  }
}

function countNeighbors(x, y) {
  let neighbors = 0;
  if (grid?.[x - 1]?.[y - 1] === 1 || grid?.[x - 1]?.[y - 1] === -1) {
    neighbors += 1;
  }
  if (grid?.[x - 1]?.[y] === 1 || grid?.[x - 1]?.[y] === -1) {
    neighbors += 1;
  }
  if (grid?.[x - 1]?.[y + 1] === 1 || grid?.[x - 1]?.[y + 1] === -1) {
    neighbors += 1;
  }
  if (grid?.[x + 1]?.[y - 1] === 1 || grid?.[x + 1]?.[y - 1] === -1) {
    neighbors += 1;
  }
  if (grid?.[x + 1]?.[y] === 1 || grid?.[x + 1]?.[y] === -1) {
    neighbors += 1;
  }
  if (grid?.[x + 1]?.[y + 1] === 1 || grid?.[x + 1]?.[y + 1] === -1) {
    neighbors += 1;
  }
  if (grid?.[x]?.[y + 1] === 1 || grid?.[x]?.[y + 1] === -1) {
    neighbors += 1;
  }
  if (grid?.[x]?.[y - 1] === 1 || grid?.[x]?.[y - 1] === -1) {
    neighbors += 1;
  }
  return neighbors;
}

function updateState() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let neighbors = countNeighbors(i, j);
      if (grid[i][j] === 0 && neighbors === 3) {
        grid[i][j] = 2;
        continue;
      }
      if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
        grid[i][j] = -1;
        continue;
      }
    }
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === 2) {
        grid[i][j] = 1;
      }
      if (grid[i][j] === -1) {
        grid[i][j] = 0;
      }
    }
  }
  return;
}
