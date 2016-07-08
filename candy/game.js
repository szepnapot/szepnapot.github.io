'use strict';

function Game() {
  var _this = this;
  this.clock = false;
  this.candies = 0;
  this.lollypops = 0;
  this.cake = 0;
  this.baklava = 0;
  this.lollyPrice = 10;
  this.cakePrice = 50;
  this.baklavaPrice = 100;

  this.updateCandies = function() {
    document.querySelector('.candies').innerHTML = this.candies;
  };

  this.updateLollypops = function() {
    document.querySelector('.lollypops').innerHTML = this.lollypops;
  };

  this.updateSpeed = function() {
    document.querySelector('.speed').innerHTML = this.getSpeed();
  };

  this.updateCake = function() {
    document.querySelector('.cake').innerHTML = this.cake;
  }

  this.updateBaklava = function() {
    document.querySelector('.baklava').innerHTML = this.baklava;
  }

  this.getSpeed = function() {
    return Math.floor((this.lollypops / this.lollyPrice) + this.cake * 3 + this.baklava * 5);
  };

  this.init = function() {

    document.querySelector('.create-candies').addEventListener('click', function() {
      _this.candies++;
      _this.updateCandies()
    });

    document.querySelector('.buy-lollypops').addEventListener('click', function() {
      if (_this.candies >= _this.lollyPrice) {
        _this.lollypops++;
        _this.candies -= _this.lollyPrice;
        _this.updateLollypops();
        _this.updateCandies();
        _this.updateSpeed(_this.getSpeed());
      }
    });

    document.querySelector('.buy-cake').addEventListener('click', function() {
      if (_this.candies >= _this.cakePrice) {
        _this.cake++;
        _this.candies -= _this.cakePrice;
        _this.updateCake();
        _this.updateCandies();
        _this.updateSpeed(_this.getSpeed());
      }
    });

    document.querySelector('.buy-baklava').addEventListener('click', function() {
      if (_this.candies >= _this.baklavaPrice) {
        _this.baklava++;
        _this.candies -= _this.baklavaPrice;
        _this.updateBaklava();
        _this.updateCandies();
        _this.updateSpeed(_this.getSpeed());
      }
    });

    setInterval(function() {
      _this.candies += _this.getSpeed();
      _this.updateCandies();
      // if (_this.candies >= 1000000) {
      //   alert("VICTORY!");
      // }

    }, 1000);
  };
}

var game = new Game();
game.init();
