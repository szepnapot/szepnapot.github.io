var previewArrowLeft = document.querySelector('.arrow-left-preview');
var previewArrowRight = document.querySelector('.arrow-right-preview');
var thumbnailArrowLeft = document.querySelector('.arrow-left-thumbnail');
var thumbnailArrowRight = document.querySelector('.arrow-right-thumbnail');
var previewContainer = document.querySelector('.preview');
var previewImage = document.querySelector('.preview-img');
var thumbnail = document.querySelector('.thumbnail');
var thumbImagesConatiner = document.querySelector('.thumb-images');

var h2Element = document.querySelector('h2');

var previewCurrentPosition = 0;
var thumbCurrentPosition = 0;
var Images = createImageArray();

function createImageArray() {
  var imageList = [];
  for (var i = 1; i <= 16; i++) {
    imageList.push('./images/img' + i + '.jpg');
  }
  return imageList;
}

function updatePhotoTitle() { h2Element.textContent = "Photo " + (previewCurrentPosition + 1); }

function setThumbnail(numberOfTiles) {
  ifExistResetThumbnail();
  for (var i = thumbCurrentPosition; i < thumbCurrentPosition + numberOfTiles; i++) {
    createThumbnail(Images[i]);
  }
  addEventToThumbs();
}

function setThumbPositionForPreview() {
  var tileNumber = document.querySelectorAll('.thumb-images > img').length;
  if (thumbCurrentPosition + tileNumber - 1 < previewCurrentPosition || thumbCurrentPosition > previewCurrentPosition) {
    thumbCurrentPosition = previewCurrentPosition;
  }
  setThumbnail(tileNumber);
}

function ifExistResetThumbnail() {
  var thumbImagesConatiner = document.querySelector('.thumb-images');
  if (thumbImagesConatiner) { thumbImagesConatiner.remove();}
  var thumbImagesConatiner = document.createElement('div');
  thumbImagesConatiner.className = 'thumb-images';
  thumbnail.appendChild(thumbImagesConatiner);
}

function createThumbnail(imgSrc) {
  var thumbImagesConatiner = document.querySelector('.thumb-images');
  var thumbImg = document.createElement('img');
  thumbImg.src = imgSrc;
  thumbImagesConatiner.appendChild(thumbImg);
}

function setPreview() {makePreviewImg(); updatePhotoTitle();}

function makePreviewImg() {
  var previewImage = document.querySelector('.preview-img');
  previewImage.remove();
  var previewImage = document.createElement('img');
  previewImage.className = 'preview-img';
  previewImage.src = Images[previewCurrentPosition]
  previewContainer.appendChild(previewImage);
}

function slidePreview(n) {
  var tileNumber = document.querySelectorAll('.thumb-images > img').length;
  previewCurrentPosition += n;
  if ( previewCurrentPosition >= Images.length ) { previewCurrentPosition = 0; }
  else if ( previewCurrentPosition < 0 ) { previewCurrentPosition = Images.length - 1; }
  setPreview();
  setThumbPositionForPreview();
}

function slideThumb(n) {
  var tileNumber = document.querySelectorAll('.thumb-images > img').length;
  thumbCurrentPosition += n;
  if ( thumbCurrentPosition + tileNumber  >= Images.length ) { thumbCurrentPosition = 0; }
  else if ( thumbCurrentPosition < 0 ) { thumbCurrentPosition = Images.length - 5;}
  setThumbnail(tileNumber);
}

function addEventToThumbs() {
  var thumbs = document.querySelectorAll('.thumb-images > img');
  thumbs.forEach(function(element) { element.addEventListener('click', setPreviewFromThumbnail);})
}

function setPreviewFromThumbnail(event) {
  previewImage.src = event.target.getAttribute('src');
  previewCurrentPosition = Images.indexOf(event.target.getAttribute('src'));
  setPreview();
  updatePhotoTitle();
}

function hideIfNoImage() {
  var tileNumber = document.querySelectorAll('.thumb-images > img');
  for (var i = 0; i < tileNumber.length; i++) {
    if (tileNumber[i].getAttribute('src') === 'undefined') { tileNumber[i].style.display = 'none';}
  }
}

function previewLeft() { slidePreview(-1); updatePhotoTitle(); hideIfNoImage()}
function previewRight() { slidePreview(1); updatePhotoTitle(); hideIfNoImage()}
function thumbLeft() { slideThumb(-1); }
function thumbRight() { slideThumb(1); }
setPreview();
setThumbnail(5);
addEventToThumbs();
previewArrowLeft.addEventListener('click', previewLeft);
previewArrowRight.addEventListener('click', previewRight);
thumbnailArrowLeft.addEventListener('click', thumbLeft);
thumbnailArrowRight.addEventListener('click', thumbRight);
