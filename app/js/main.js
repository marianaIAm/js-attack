var canvasBackground = document.getElementById("canvas-background");
var contextBackground = canvasBackground.getContext("2d");

var canvasSuperMe = document.getElementById("canvas-super-me");
var contextSuperMe = canvasBackground.getContext("2d");

var imgSprite = new Image();
imgSprite.src = "images/sprite.png";
imgSprite.addEventListener("load", init, false);

function init() {
  drawBackground();
  drawSuperMe();
}

function drawSuperMe() {
  var sourceX = 0;
  var sourceY = 600;
  var drawX = 150;
  var drawY = 150;
  var width = 146;
  var height = 114;
  contextSuperMe.drawImage(imgSprite, sourceX, sourceY, width, height, drawX, drawY, width, height);
}

function drawBackground() {
  var sourceX = 0;
  var sourceY = 0;
  var drawX = 0;
  var drawY = 0;
  var gameWidth = canvasBackground.width;
  var gameHeight = canvasBackground.height;
  contextBackground.drawImage(imgSprite, sourceX, sourceY, gameWidth, gameHeight, drawX, drawY, gameWidth, gameHeight);
}
