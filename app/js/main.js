
var canvasBackground = document.getElementById("canvas-background");
var contextBackground = canvasBackground.getContext("2d");

var canvasBadGuys = document.getElementById("bad-guys");
var contextBadGuys = canvasBadGuys.getContext("2d");
var badGuys = [];
var spawnAmount = 5;

var superMe = new SuperMe();
var canvasSuperMe = document.getElementById("super-me");
var contextSuperMe = canvasSuperMe.getContext("2d");

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
    drawBadGuys();
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

function SuperMe() {
  this.sourceX = 0;
  this.sourceY = 600;
  this.width = 146;
  this.height = 111;
  this.speed = 2;
  this.drawX = 0;
  this.drawY = 0;
  this.handX = this.drawX + 146;
  this.handY = this.drawY + 30;
  this.isUpKey = false;
  this.isRightKey = false;
  this.isDownKey = false;
  this.isLeftKey = false;
  this.isSpaceBar = false;
  this.isShooting = false;
  this.bullets = [];
  this.currentBullet = 0;
  for (var i = 0; i < 20; i++) {
    this.bullets[this.bullets.length] = new Bullet();
  }
}

SuperMe.prototype.draw = function() {
  clearContextSuperMe();
  this.checkDirection();
  this.handX = this.drawX + 146;
  this.handY = this.drawY + 30;
  this.checkShooting();
  this.drawBullets();
  contextSuperMe.drawImage(imgSprite, this.sourceX, this.sourceY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

SuperMe.prototype.checkDirection = function () {
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
};

SuperMe.prototype.drawBullets = function() {
  for (var i = 0; i < this.bullets.length; i++) {
    if (this.bullets[i].drawX >= 0) this.bullets[i].draw();
    if (this.bullets[i].explosion.hasHit) this.bullets[i].explosion.draw();
  }
};

SuperMe.prototype.checkShooting = function() {
  if (this.isSpaceBar && !this.isShooting) {
    this.isShooting = true;
    this.bullets[this.currentBullet].fire(this.handX, this.handY);
    this.currentBullet++;
    if (this.currentBullet >= this.bullets.length) this.currentBullet = 0;
  } else if (!this.isSpaceBar) {
    this.isShooting = false;
  }
};

function clearContextSuperMe() {
  contextSuperMe.clearRect(0, 0, gameWidth, gameHeight);
}

function Bullet() {
  this.sourceX = 146;
  this.sourceY = 601;
  this.width = 5;
  this.height = 5;
  this.drawX = -10;
  this.drawY = 0;
  this.hasHit = false;
  this.explosion = new Explosion();
}

Bullet.prototype.draw = function() {
  this.drawX += 6;
  contextSuperMe.drawImage(imgSprite, this.sourceX, this.sourceY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
  this.hitBadGuy();
  if (this.drawX > gameWidth) this.recycle();
};

Bullet.prototype.fire = function(startX, startY) {
  this.drawX = startX;
  this.drawY = startY;
};

Bullet.prototype.recycle = function() {
  this.drawX = -10;
};

Bullet.prototype.hitBadGuy = function() {
  for (var i = 0; i < badGuys.length; i++) {
    if (this.drawX >= badGuys[i].drawX && 
        this.drawX <= badGuys[i].drawX + badGuys[i].width &&
        this.drawY >= badGuys[i].drawY &&
        this.drawY <= badGuys[i].drawY + badGuys[i].height) {
      this.explosion.drawX = badGuys[i].drawX - (this.explosion.width / 2);
      this.explosion.drawY = badGuys[i].drawY;
      this.explosion.hasHit = true;
      this.recycle();
      badGuys[i].recycleBadGuy();
    }
  }
};

function Explosion() {
  this.sourceX = 151;
  this.sourceY = 600;
  this.width = 106;
  this.height = 100;
  this.drawX = 0;
  this.drawY = 0;
  this.hasHit = true;
  this.currentFrame = 0;
  this.totalFrames = 10;
}

Explosion.prototype.draw = function() {
  if(this.currentFrame <= this.totalFrames) {
    contextSuperMe.drawImage(imgSprite, this.sourceX, this.sourceY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
    this.currentFrame++;
  } else {
    this.hasHit = false;
    this.currentFrame = 0;
  }
};

function BadGuy() {
  this.sourceX = 1;
  this.sourceY = 711;
  this.width = 40;
  this.height = 42;
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
    this.recycleBadGuy();
  }
};

BadGuy.prototype.recycleBadGuy = function() {
  this.drawX = Math.floor(Math.random() * 800) + gameWidth;
  this.drawY = Math.floor(Math.random() * (gameHeight - 150));
};

function clearContextBadGuys() {
  contextBadGuys.clearRect(0, 0, gameWidth, gameHeight);
}

function drawBadGuys() {
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

function checkKeyDown(e) {
  var key = e.keyCode || e.which;
  var up = 38,    wKey = 87,
      right = 39, dKey = 68,
      down = 40,  sKey = 83,
      left = 37,  aKey = 65,
      shoot = 32;
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
  if (key === shoot) {
    superMe.isSpaceBar = true;
    e.preventDefault();
  }
}

function checkKeyUp(e) {
  var key = e.keyCode || e.which;
  var up = 38,    wKey = 87,
      right = 39, dKey = 68,
      down = 40,  sKey = 83,
      left = 37,  aKey = 65,
      shoot = 32;
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
  if (key === shoot) {
    superMe.isSpaceBar = false;
    e.preventDefault();
  }
}

