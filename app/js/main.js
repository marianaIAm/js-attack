var superMe;
var canvasBackground = document.getElementById("canvas-background");
var contextBackground = canvasBackground.getContext("2d");

var canvasSuperMe = document.getElementById("canvas-super-me");
var contextSuperMe = canvasSuperMe.getContext("2d");

var gameWidth = canvasBackground.width;
var gameHeight = canvasBackground.height;

var fps = 10;
var drawInterval;

var imgSprite = new Image();
imgSprite.src = "images/sprite.png";
imgSprite.addEventListener("load", init, false);

function init() {
  drawBackground();
  startDrawing();
  superMe = new SuperMe();
  document.addEventListener("keydown", checkKeyDown, false);
  document.addEventListener("keyup", checkKeyUp, false);
}

function draw() {
  superMe.draw();
}

function startDrawing() {
  stopDrawing();
  drawInterval = setInterval(draw, fps);
}

function stopDrawing() {
  clearInterval(drawInterval);
}

function SuperMe() {
  this.sourceX = 0;
  this.sourceY = 600;
  this.drawX = 70;
  this.drawY = 60;
  this.width = 146;
  this.height = 114;
  this.speed = 2;
  this.isUpKey = false;
  this.isRightKey = false;
  this.isDownKey = false;
  this.isLeftKey = false;
}

SuperMe.prototype.draw = function() {
  clearContextSuperMe();
  this.checkKeys();
  contextSuperMe.drawImage(imgSprite, this.sourceX, this.sourceY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

SuperMe.prototype.checkKeys = function () {
  if (this.isUpKey) {
    this.drawY -= this.speed;
  }
  if (this.isRightKey) {
    this.drawX += this.speed;
  }
  if (this.isDownKey) {
    this.drawY += this.speed;
  }
  if (this.isLeftKey) {
    this.drawX -= this.speed;
  }
}

function drawBackground() {
  var sourceX = 0;
  var sourceY = 0;
  var drawX = 0;
  var drawY = 0;
  contextBackground.drawImage(imgSprite, sourceX, sourceY, gameWidth, gameHeight, drawX, drawY, gameWidth, gameHeight);
}

function clearContextBackground() {
  contextBackground.clearRect(0, 0, gameWidth, gameHeight);
}

function clearContextSuperMe() {
  contextSuperMe.clearRect(0, 0, gameWidth, gameHeight);
}

function checkKeyDown(e) {
  var key = e.keyCode || e.which;
  var up = 38,    wKey = 87,
      right = 39, dKey = 68,
      down = 40,  sKey = 83,
      left = 37,  aKey = 65;
  if (key === up || key === wKey) {
    superMe.isUpKey = true;
    e.preventDefault();
  }
  if (key === right || key === dKey) {
    superMe.isRightKey = true;
    e.preventDefault();
  }
  if (key === down || key === sKey) {
    superMe.isDownKey = true;
    e.preventDefault();
  }
  if (key === left || key === aKey) {
    superMe.isLeftKey = true;
    e.preventDefault();
  }
}

function checkKeyUp(e) {
  var key = e.keyCode || e.which;
  var up = 38,    wKey = 87,
      right = 39, dKey = 68,
      down = 40,  sKey = 83,
      left = 37,  aKey = 65;
  if (key === up || key === wKey) {
    superMe.isUpKey = false;
    e.preventDefault();
  }
  if (key === right || key === dKey) {
    superMe.isRightKey = false;
    e.preventDefault();
  }
  if (key === down || key === sKey) {
    superMe.isDownKey = false;
    e.preventDefault();
  }
  if (key === left || key === aKey) {
    superMe.isLeftKey = false;
    e.preventDefault();
  }
}

