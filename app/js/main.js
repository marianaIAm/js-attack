var superMe = new SuperMe();
var canvasSuperMe = document.getElementById("super-me");
var contextSuperMe = canvasSuperMe.getContext("2d");

var canvasBackground = document.getElementById("canvas-background");
var contextBackground = canvasBackground.getContext("2d");

var canvasBadGuys = document.getElementById("bad-guys");
var contextBadGuys = canvasBadGuys.getContext("2d");
var badGuys = [];
var spawnAmount = 5;

var gameWidth = canvasBackground.width;
var gameHeight = canvasBackground.height;

var isPlaying = false;
var fps = 10;
var drawInterval;

var requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         function( callback ) {
          window.setTimeout(callback, 1000 / 60);
         };
})();

var imgSprite = new Image();
imgSprite.src = "images/sprite.png";
imgSprite.addEventListener("load", init, false);

function init() {
  spawnBadGuys(spawnAmount);
  drawBackground();
  startLoop();
  document.addEventListener("keydown", checkKeyDown, false);
  document.addEventListener("keyup", checkKeyUp, false);
}

function loop() {
  if (isPlaying) {
    superMe.draw();
    drawAllBadGuys();
    requestAnimFrame(loop);
  }
}

function startLoop() {
  isPlaying = true;
  loop();
}

function stopLoop() {
  isPlaying = false;
}

function drawAllBadGuys() {
  clearContextBadGuys();
  for (var i = 0; i < badGuys.length; i++) {
    badGuys[i].draw();
  }
}

function spawnBadGuys(num) {
  for (var i = 0; i < num; i++) {
    badGuys[badGuys.length] = new BadGuy();
  }
}

function SuperMe() {
  this.sourceX = 0;
  this.sourceY = 600;
  this.width = 146;
  this.height = 114;
  this.speed = 2;
  this.drawX = 0;
  this.drawY = 0;
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

function clearContextSuperMe() {
  contextSuperMe.clearRect(0, 0, gameWidth, gameHeight);
}

function BadGuy() {
  this.sourceX = 0;
  this.sourceY = 715;
  this.width = 62;
  this.height = 60;
  this.speed = 2;
  this.drawX = Math.floor(Math.random() * 800) + gameWidth;
  this.drawY = Math.floor(Math.random() * (gameHeight - 150));
}

BadGuy.prototype.draw = function() {
  this.drawX -= this.speed;
  contextBadGuys.drawImage(imgSprite, this.sourceX, this.sourceY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
  this.checkEscaped();
};

BadGuy.prototype.checkEscaped = function() {
  if (this.drawX + this.width <= 0) {
    this.reuseBadGuy();
  }
};

BadGuy.prototype.reuseBadGuy = function() {
  this.drawX = Math.floor(Math.random() * 800) + gameWidth;
  this.drawY = Math.floor(Math.random() * (gameHeight - 150));
};

function clearContextBadGuys() {
  contextBadGuys.clearRect(0, 0, gameWidth, gameHeight);
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

