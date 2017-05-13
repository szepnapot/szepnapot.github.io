'use strict';

class Snake {
  // snake's head is the highest indexed element
  constructor(startX, startY, color = 'red'){
    this.dx = 1;
    this.dy = 0;
    this.body = [[startX, startY]];
    this.color = color;
    this.status = 'alive';
  }

  lastIndex(){
    return this.body.length - 1;
  }

  move(board){
    this.body.push(this.nextPosition(board));
    this.body.splice(0, 1);
  }

  canEat(point){
    let lastIndex = this.body.length - 1;
    return this.body[this.lastIndex()][0] === point[0] &&
            this.body[this.lastIndex()][1] === point[1]
  }

  eat(point){
    this.body.push(point);
  }

  die(){
    this.status = 'dead';
    this.dx = 0;
    this.dy = 0;
    this.body = [];
  }

  reset(){
    this.status = 'alive';
    this.dx = 1;
    this.dy = 0;
    this.body = [[1, 1]];
  }

  nextPosition(board){
    const xMax = board.width;
    const yMax = board.height;

    let x = this.body[this.lastIndex()][0] + this.dx;
    let y = this.body[this.lastIndex()][1] + this.dy;

    //check out of the board
    if (x < 0) {
      this.die();
    }
    else if (x > xMax) {
      this.die();
    }
    else if (y < 0) {
      this.die();
    }
    else if (y > yMax) {
      this.die();
    }
    return [x, y];
  }

  changeDirection(direction){
    switch(direction){
      case 'right':
        if (this.dx === -1) {
          break;
        }
        this.dx = 1;
        this.dy = 0;
        break;
      case 'left':
        if (this.dx === 1) {
          break;
        }
        this.dx = -1;
        this.dy = 0;
        break;
      case 'up':
        if (this.dy === -1) {
          break;
        }
        this.dx = 0;
        this.dy = -1;
        break;
      case 'down':
        if (this.dy === 1) {
          break;
        }
        this.dx = 0;
        this.dy = 1;
        break;
    }
  }
}
