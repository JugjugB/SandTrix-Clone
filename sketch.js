// Falling Sand (ADHD Cure)
// JOSH 22.12.2024

function make2DArray(rows, cols) {
  let arr = new Array(cols);
  for (let i=0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) 
      arr[i][j] = 0
  }
  return arr;
}

let grid;
let grainWidth = 10;
let cols;
let rows;
let hueValue = 255;
let dir = 1;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 360, 255,255)
  rows = height/grainWidth;
  cols = width/grainWidth;
  grid = make2DArray(cols,rows);
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] === 0) {fill(0);}
      else {fill(30,grid[i][j],200);}
      let x = i*grainWidth;
      let y = j*grainWidth;
      square(x,y,grainWidth);
    }
  }

  let nextGrid = make2DArray(cols,rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state > 0) {
        let below = grid[i][j+1];
        let belowR, belowL;
        if (i > 0 && i < cols - 1) {
          belowR = grid[i+1][j+1];
          belowL = grid[i-1][j+1];
        }
        else if (i === 0) {belowR = grid[i+1][j+1];}
        else if (i === cols - 1) {belowL = grid[i-1][j+1];}
        if (below === 0) {nextGrid[i][j+1] = state;}
        else if (belowR === 0 && belowL === 0){
          let randNum = random(1);
          if (randNum > 0.5){nextGrid[i+1][j+1] = state;}
          else {nextGrid[i-1][j+1] = state;}
        }
        else if (belowR === 0) {nextGrid[i+1][j+1] = state;}
        else if (belowL === 0) {nextGrid[i-1][j+1] = state;}
        else {nextGrid[i][j] = state;}
      } 
    }
  }
  grid = nextGrid;
}

function mouseDragged() {
  let col = floor(mouseX/grainWidth);
  let row = floor(mouseY/grainWidth);
  if (grid[col][row] === 0) {
    grid[col][row] = hueValue;
    if (hueValue > 220) {dir = -1;}
    else if (hueValue < 60) {dir = 1}
    console.log(hueValue)
    hueValue = hueValue + dir;
  }
}

