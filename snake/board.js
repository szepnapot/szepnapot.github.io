'use strict';

class Board {
  constructor(snake){
    this.snake = snake;
    this.height = Math.floor(canvas.height / size);
    this.width = Math.floor(canvas.width / size);
    this.food = [];
    let that = this;

    window.addEventListener('keydown', function(event){
      // we are in the window object context
      // need to refer to the Board context
      // thaths why we need that
      switch(event.key){
        case 'ArrowRight':
          that.snake.changeDirection('right');
          break;
        case 'ArrowLeft':
          that.snake.changeDirection('left');
          break;
        case 'ArrowUp':
          that.snake.changeDirection('up');
          break;
        case 'ArrowDown':
          that.snake.changeDirection('down');
          break;
      }
    })
  }

  genFood(){
    let x = Math.floor(Math.random() * this.width);
    let y = Math.floor(Math.random() * this.height);
    this.food = [x, y];
  }

  clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  updateScores(){
    let score = this.snake.body.length - 1;

    // check if we have a new top score
    if (localStorage.getItem('topScore') < score) {
      topScoreNode.innerHTML = score;
      localStorage.setItem('topScore', score);
    }
    // updating score values
    topScoreNode.innerHTML = localStorage.getItem('topScore');
    scoreNode.innerHTML = score;
  }

  draw(){
    this.updateScores();

    // game loop
    if(this.snake.status !== 'dead'){
      this.clear();

      if (this.food.length < 1){
        this.genFood();
      }

      if (this.snake.canEat(this.food)){
        this.snake.eat(this.food);
        this.genFood();
      }

      this.snake.move(this);
      // draw food
      context.fillStyle = 'green';
      context.fillRect(
        this.food[0] * size,
        this.food[1] * size,
        size,
        size
      )
      // draw snake
      context.fillStyle = this.snake.color;
      for(let i = 0; i < this.snake.body.length; i++){
        context.fillRect(
          this.snake.body[i][0]*size,
          this.snake.body[i][1]*size,
          size,
          size)
      }
    }
    // snake status == 'dead' --> need to reset
    else{
      this.snake.reset();
      this.genFood();
    }
  }

}
