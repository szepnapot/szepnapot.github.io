'use strict';

const FPS = 60;
const LINE_WIDTH = 2;
const COLORS = {
  "WHITE" : "#FFFFFF",
  "BLACK" : '#000000'
}
const BOARD = {};
const SELECTORS = {
  "START" : document.getElementById('start'),
  "END" : document.getElementById('end'),
  "CLEAR" : document.getElementById('clear'),
  "PATTERN" : document.getElementById('pattern'),
  "TICK" : document.getElementById('tick')
};

const PATTERNS = {
  "GLIDER" : [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
  ],
  "SPACESHIP-LIGHT" : [
    [0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0]
  ],
  "OSCILLATORS" : {
    "TOAD" : [
      [0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0]
    ],
    "LINE" : [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ],
    "BEACON" : [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1]
    ],
    "PENTA" : [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    ]
  }
}

function getRandomOscillator() {
  let oscillatorsLength = Object.keys(PATTERNS.OSCILLATORS).length;
  let randomOscillatorIndex = Math.floor(Math.random() * (oscillatorsLength - 0)) + 0;
  return Object.keys(PATTERNS.OSCILLATORS)[randomOscillatorIndex];
}

let canvasBg = document.getElementById("bgLayer");
let canvasFg = document.getElementById("fgLayer");
let bgContext = canvasBg.getContext("2d");
let fgContext = canvasFg.getContext("2d");

let gameLoop;
let map = [];
let alive_nodes = [];
let tick = 0;


function initBackground(canvas, map, n) {
  BOARD.blockSize = canvas.width / n;
  bgContext.clearRect(0, 0, canvas.width, canvas.height);
  bgContext.beginPath();
  for (let row = 0; row < n; row++) {
    // Array.apply(null, Array(n)).map((x) => 0)
    let row = Array(n);
    row.fill(0);
    map.push(row);
    for (let cell = 0; cell <= n; cell++) {
      bgContext.moveTo(0, BOARD.blockSize * cell);
      bgContext.lineTo(canvas.width, BOARD.blockSize * cell);

      bgContext.moveTo(BOARD.blockSize * cell, 0);
      bgContext.lineTo(BOARD.blockSize * cell, canvas.height);

    }
  }
  bgContext.stroke();
  fgContext.beginPath();
}

function drawRectangle(color, row, column) {
  fgContext.fillStyle = color;
  fgContext.fillRect(
    BOARD.blockSize * row + LINE_WIDTH,
    BOARD.blockSize * column + LINE_WIDTH,
    BOARD.blockSize - (LINE_WIDTH * 2),
    BOARD.blockSize - (LINE_WIDTH * 2)
  )
}

function isNodeAlive(x, y){
  for (var i = 0; i < alive_nodes.length; i++) {
    if (alive_nodes[i].x === x && alive_nodes[i].y === y) {
      alive_nodes.splice(i, 1);
      return true;
    };
  }
  return false;
}

function check_neighbour(row, cell){
  if (row < 0 ||
     cell < 0 ||
     row > map.length - 1 ||
     cell > map.length - 1 ||
     typeof map[row][cell] === 'undefined'
     )
  {
    return false;
  }
  else {
    try {
      if (map[row][cell] === 1)
      {
        return true;
      }
    } catch (e) {
      console.error("Error happened during neighbour checking: " + e);
      return false;
    }
  }
}

function fill(event) {
  let x = event.layerX;
  let y = event.layerY;
  let divX = Math.floor(x/BOARD.blockSize);
  let divY = Math.floor(y/BOARD.blockSize);
  if (isNodeAlive(divX, divY))
  {
    drawRectangle(COLORS.WHITE, divX, divY);
  }
  else
  {
    drawRectangle(COLORS.BLACK, divX, divY);
    alive_nodes.push({"x":divX,
                      "y":divY});
  }
}

function draw(){
  SELECTORS.TICK.innerHTML = tick;
  for (let row = 0; row < map.length; row++) {
    for (let cell = 0; cell < map[row].length; cell++) {
      if (map[row][cell] == 1) {
        drawRectangle(COLORS.BLACK, row, cell);
      } else {
        drawRectangle(COLORS.WHITE, row, cell);
      }
    }
  }
}


function game(){
    let willDie = [];
    let willBorn = [];
    for (let row = 0; row < map.length; row++) {
      for (let cell = 0; cell < map[row].length; cell++) {
        let neighbours = 0;
        if (check_neighbour(row - 1, cell)){neighbours += 1;}
        if (check_neighbour(row, cell - 1)){neighbours += 1;}
        if (check_neighbour(row - 1, cell - 1)){neighbours += 1;}
        if (check_neighbour(row + 1, cell)){neighbours += 1;}
        if (check_neighbour(row, cell + 1)){neighbours += 1;}
        if (check_neighbour(row + 1, cell + 1)){neighbours += 1;}
        if (check_neighbour(row + 1, cell - 1)){neighbours += 1;}
        if (check_neighbour(row - 1, cell + 1)){neighbours += 1;}

        if (map[row][cell] === 1) {
          if (neighbours < 2) {
            willDie.push({'x' : row,
                          'y' : cell})
          } else if (neighbours === 2 || neighbours === 3) {
            continue;
          } else if (neighbours > 3) {
            willDie.push({'x' : row,
                          'y' : cell})
          }
        }
        else {
          if (neighbours === 3) {
            willBorn.push({'x' : row,
                          'y' : cell})
          }
        }
      }
    }
    willDie.forEach((deadCell) => map[deadCell.x][deadCell.y] = 0);
    willBorn.forEach((deadCell) => map[deadCell.x][deadCell.y] = 1);
    draw();
    tick++;
  }

function resetMap(){
  for (let row = 0; row < map.length; row++) {
    for (let cell = 0; cell < map[row].length; cell++) {
      map[row][cell] = 0;
    }
  }
}

function loop() {
    gameLoop = window.setInterval(function() {
        requestAnimationFrame(game, fgContext);
    }, FPS * 10);
}

function start() {
  for (let i = 0; i < alive_nodes.length; i++) {
    console.log('alive node (x, y) :', alive_nodes[i].x, alive_nodes[i].y);
    map[alive_nodes[i].x][alive_nodes[i].y] = 1;
  }
    alive_nodes = [];
    loop();
  SELECTORS.PATTERN.disabled = true;
  SELECTORS.START.disabled = true;
}

function end() {
  window.cancelAnimationFrame(gameLoop);
  window.clearInterval(gameLoop);
  resetMap();
  SELECTORS.START.disabled = true;
  SELECTORS.PATTERN.disabled = false;
}

function clearCanvas(){
  tick = 0;
  SELECTORS.TICK.innerHTML = tick;
  fgContext.clearRect(0, 0, canvasFg.width, canvasFg.height);
  SELECTORS.START.disabled = false;
}

function drawPattern() {
  tick = 0;
  SELECTORS.TICK.innerHTML = tick;
  let selectedPattern = this.value;
  this.value === 'OSCILLATOR' ?
    selectedPattern = PATTERNS.OSCILLATORS[getRandomOscillator()] :
    selectedPattern = PATTERNS[selectedPattern];
  end();
  for (let r = 0; r < selectedPattern.length; r++) {
    for (let c = 0; c < selectedPattern[r].length; c++) {
      map[c + mapDimensionCenter/2][r + mapDimensionCenter/2] = selectedPattern[r][c];
    }
  }
  draw();
  SELECTORS.START.disabled = false;
}

initBackground(canvasBg, map, 40);
let mapDimensionCenter = map.length;
SELECTORS.START.addEventListener("click", start);
SELECTORS.END.addEventListener("click", end);
SELECTORS.CLEAR.addEventListener("click", clearCanvas);
SELECTORS.PATTERN.addEventListener("change", drawPattern);
canvasFg.addEventListener("click", fill);
