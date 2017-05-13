'use strict';

const scoreNode = document.querySelector('.score');
const topScoreNode = document.querySelector('.top-score');

const canvas = document.getElementById('canvas');
canvas.height = 800;
canvas.width = 800;

const context = canvas.getContext('2d');

const size = 15;
const speed = 100;

let snake = new Snake(10, 10);
let board = new Board(snake);

let playing = true;

const drawInterval = setInterval(
  function(){
    board.draw();
  }, speed);

window.addEventListener('keydown', function(event){
  if(event.key === ' '){
    if(playing){
      clearInterval(drawInterval);
      console.log("Game paused");
    }
    // restart
  }
})
