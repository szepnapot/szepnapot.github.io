'use strict';

var leftArrow = document.querySelector('.arrow-left');
var rightArrow = document.querySelector('.arrow-right');
var IMAGES = createImageArray();
var imageCount = 1;


function createImageArray() {
  var imageList = [];
  for (var i = 1; i <= 16; i++){
    imageList.push('img' + i + '.jpg');
  }
  return imageList;
}

function fillThumbnail() {
  var thumbnail = document.querySelector('.thumbnails');
}

function slide(n) {
  var image = document.querySelector('img');
  imageCount += n;
  image.src = "images/img" + imageCount + '.jpg';
}

function slideLeft() { slide(-1) };
function slideRight() { slide(1) };

leftArrow.addEventListener('click', slideLeft);
rightArrow.addEventListener('click', slideRight);
