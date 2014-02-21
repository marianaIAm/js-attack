function moveBackground(){backgroundDrawX1-=5,backgroundDrawX2-=5,-backgroundImgWidth>=backgroundDrawX1?backgroundDrawX1=backgroundImgWidth:-backgroundImgWidth>=backgroundDrawX2&&(backgroundDrawX2=backgroundImgWidth),drawBackground()}function init(){spawnBadGuys(spawnAmount),drawMenu(),document.addEventListener("click",mouseClicked,!1)}function playGame(){drawBackground(),startLoop(),updateScoreboard(),document.addEventListener("keydown",checkKeyDown,!1),document.addEventListener("keyup",checkKeyUp,!1)}function loop(){isPlaying&&(moveBackground(),superMe.draw(),drawBadGuys(),requestAnimFrame(loop))}function startLoop(){isPlaying=!0,loop()}function stopLoop(){isPlaying=!1}function drawMenu(){var a=800,b=0,c=760,d=gameWidth/2-a/2,e=0;contextBackground.drawImage(imgSprite,b,c,gameWidth,gameHeight,d,e,gameWidth,gameHeight)}function drawBackground(){var a=0,b=0,c=0;contextBackground.clearRect(0,0,gameWidth,gameHeight),contextBackground.drawImage(imgSprite,a,b,backgroundImgWidth,gameHeight,backgroundDrawX1,c,backgroundImgWidth,gameHeight),contextBackground.drawImage(imgSprite,a,b,backgroundImgWidth,gameHeight,backgroundDrawX2,c,backgroundImgWidth,gameHeight)}function updateScoreboard(){var a=1100,b=25;contextScoreboard.clearRect(0,0,gameWidth,gameHeight),contextScoreboard.fillText("Score: "+superMe.score,a,b)}function SuperMe(){this.sourceX=0,this.sourceY=600,this.width=146,this.height=111,this.speed=2,this.drawX=0,this.drawY=0,this.handX=this.drawX+146,this.handY=this.drawY+30,this.isUpKey=!1,this.isRightKey=!1,this.isDownKey=!1,this.isLeftKey=!1,this.isSpaceBar=!1,this.score=0,this.isShooting=!1,this.bullets=[],this.currentBullet=0;for(var a=0;20>a;a++)this.bullets[this.bullets.length]=new Bullet(this)}function clearContextSuperMe(){contextSuperMe.clearRect(0,0,gameWidth,gameHeight)}function Bullet(a){this.hero=a,this.sourceX=146,this.sourceY=601,this.width=5,this.height=5,this.drawX=-10,this.drawY=0,this.hasHit=!1,this.explosion=new Explosion}function Explosion(){this.sourceX=151,this.sourceY=600,this.width=106,this.height=100,this.drawX=0,this.drawY=0,this.hasHit=!1,this.currentFrame=0,this.totalFrames=10}function BadGuy(){this.sourceX=1,this.sourceY=711,this.width=40,this.height=42,this.speed=2,this.drawX=Math.floor(Math.random()*gameWidth)+gameWidth,this.drawY=Math.floor(Math.random()*(gameHeight-drawHeightFloor)),this.pointValue=5}function clearContextBadGuys(){contextBadGuys.clearRect(0,0,gameWidth,gameHeight)}function drawBadGuys(){clearContextBadGuys();for(var a=0;a<badGuys.length;a++)badGuys[a].draw()}function spawnBadGuys(a){for(var b=0;a>b;b++)badGuys[badGuys.length]=new BadGuy}function Button(a,b,c,d){this.xLeft=a,this.xRight=b,this.yTop=c,this.yBottom=d}function mouseClicked(a){mouseX=a.pageX-canvasBackground.offsetLeft,mouseY=a.pageY-canvasBackground.offsetTop,isPlaying||playButton.wasClicked()&&playGame()}function checkKeyDown(a){var b=a.keyCode||a.which,c=38,d=87,e=39,f=68,g=40,h=83,i=37,j=65,k=32;(b===c||b===d)&&(superMe.isUpKey=!0,a.preventDefault()),(b===e||b===f)&&(superMe.isRightKey=!0,a.preventDefault()),(b===g||b===h)&&(superMe.isDownKey=!0,a.preventDefault()),(b===i||b===j)&&(superMe.isLeftKey=!0,a.preventDefault()),b===k&&(superMe.isSpaceBar=!0,a.preventDefault())}function checkKeyUp(a){var b=a.keyCode||a.which,c=38,d=87,e=39,f=68,g=40,h=83,i=37,j=65,k=32;(b===c||b===d)&&(superMe.isUpKey=!1,a.preventDefault()),(b===e||b===f)&&(superMe.isRightKey=!1,a.preventDefault()),(b===g||b===h)&&(superMe.isDownKey=!1,a.preventDefault()),(b===i||b===j)&&(superMe.isLeftKey=!1,a.preventDefault()),b===k&&(superMe.isSpaceBar=!1,a.preventDefault())}var canvasBackground=document.getElementById("canvas-background"),contextBackground=canvasBackground.getContext("2d"),canvasScoreboard=document.getElementById("scoreboard"),contextScoreboard=canvasScoreboard.getContext("2d");contextScoreboard.fillStyle="hsla(0, 0%, 0%, 0.5)",contextScoreboard.font="bold 16px helvetica";var canvasBadGuys=document.getElementById("bad-guys"),contextBadGuys=canvasBadGuys.getContext("2d"),badGuys=[],spawnAmount=5,drawHeightFloor=150,superMe=new SuperMe,canvasSuperMe=document.getElementById("super-me"),contextSuperMe=canvasSuperMe.getContext("2d"),playButton=new Button(259,545,292,428),gameWidth=canvasBackground.width,gameHeight=canvasBackground.height,mouseX=0,mouseY=0,isPlaying=!1,requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}(),backgroundImgWidth=1600,backgroundDrawX1=0,backgroundDrawX2=backgroundImgWidth,imgSprite=new Image;imgSprite.src="images/sprite.png",imgSprite.addEventListener("load",init,!1),SuperMe.prototype.draw=function(){clearContextSuperMe(),this.drawX=Math.max(0,Math.min(this.drawX,gameWidth-this.width)),this.drawY=Math.max(0,Math.min(this.drawY,gameHeight-this.height)),this.checkDirection(),this.handX=this.drawX+146,this.handY=this.drawY+30,this.checkShooting(),this.drawBullets(),contextSuperMe.drawImage(imgSprite,this.sourceX,this.sourceY,this.width,this.height,this.drawX,this.drawY,this.width,this.height)},SuperMe.prototype.checkDirection=function(){this.isUpKey&&(this.drawY-=this.speed),this.isRightKey&&(this.drawX+=this.speed),this.isDownKey&&(this.drawY+=this.speed),this.isLeftKey&&(this.drawX-=this.speed)},SuperMe.prototype.drawBullets=function(){for(var a=0;a<this.bullets.length;a++)this.bullets[a].drawX>=0&&this.bullets[a].draw(),this.bullets[a].explosion.hasHit&&this.bullets[a].explosion.draw()},SuperMe.prototype.checkShooting=function(){this.isSpaceBar&&!this.isShooting?(this.isShooting=!0,this.bullets[this.currentBullet].fire(this.handX,this.handY),this.currentBullet++,this.currentBullet>=this.bullets.length&&(this.currentBullet=0)):this.isSpaceBar||(this.isShooting=!1)},SuperMe.prototype.updateScore=function(a){this.score+=a},Bullet.prototype.draw=function(){this.drawX+=6,contextSuperMe.drawImage(imgSprite,this.sourceX,this.sourceY,this.width,this.height,this.drawX,this.drawY,this.width,this.height),this.hitBadGuy(),this.drawX>gameWidth&&this.recycle()},Bullet.prototype.fire=function(a,b){this.drawX=a,this.drawY=b},Bullet.prototype.recycle=function(){this.drawX=-10},Bullet.prototype.hitBadGuy=function(){for(var a=0;a<badGuys.length;a++)this.drawX>=badGuys[a].drawX&&this.drawX<=badGuys[a].drawX+badGuys[a].width&&this.drawY>=badGuys[a].drawY&&this.drawY<=badGuys[a].drawY+badGuys[a].height&&(this.explosion.drawX=badGuys[a].drawX-this.explosion.width/2,this.explosion.drawY=badGuys[a].drawY,this.explosion.hasHit=!0,this.recycle(),badGuys[a].recycleBadGuy(),this.hero.updateScore(badGuys[a].pointValue),updateScoreboard())},Explosion.prototype.draw=function(){this.currentFrame<=this.totalFrames?(contextSuperMe.drawImage(imgSprite,this.sourceX,this.sourceY,this.width,this.height,this.drawX,this.drawY,this.width,this.height),this.currentFrame++):(this.hasHit=!1,this.currentFrame=0)},BadGuy.prototype.draw=function(){this.drawX-=this.speed,contextBadGuys.drawImage(imgSprite,this.sourceX,this.sourceY,this.width,this.height,this.drawX,this.drawY,this.width,this.height),this.checkEscaped()},BadGuy.prototype.checkEscaped=function(){this.drawX+this.width<=0&&this.recycleBadGuy()},BadGuy.prototype.recycleBadGuy=function(){this.drawX=Math.floor(Math.random()*gameWidth)+gameWidth,this.drawY=Math.floor(Math.random()*(gameHeight-drawHeightFloor))},Button.prototype.wasClicked=function(){return this.xLeft<=mouseX&&this.xRight>=mouseX&&this.yTop<=mouseY&&this.yBottom>=mouseY?!0:void 0};