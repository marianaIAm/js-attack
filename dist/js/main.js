function init(){spawnBadGuys(spawnAmount),drawBackground(),startLoop(),document.addEventListener("keydown",checkKeyDown,!1),document.addEventListener("keyup",checkKeyUp,!1)}function loop(){isPlaying&&(superMe.draw(),drawBadGuys(),requestAnimFrame(loop))}function startLoop(){isPlaying=!0,loop()}function stopLoop(){isPlaying=!1}function drawBackground(){var a=0,b=0,c=0,d=0;contextBackground.drawImage(imgSprite,a,b,gameWidth,gameHeight,c,d,gameWidth,gameHeight)}function clearContextBackground(){contextBackground.clearRect(0,0,gameWidth,gameHeight)}function SuperMe(){this.sourceX=0,this.sourceY=600,this.width=146,this.height=111,this.speed=2,this.drawX=0,this.drawY=0,this.handX=this.drawX+146,this.handY=this.drawY+30,this.isUpKey=!1,this.isRightKey=!1,this.isDownKey=!1,this.isLeftKey=!1,this.isSpaceBar=!1,this.isShooting=!1,this.bullets=[],this.currentBullet=0;for(var a=0;20>a;a++)this.bullets[this.bullets.length]=new Bullet}function clearContextSuperMe(){contextSuperMe.clearRect(0,0,gameWidth,gameHeight)}function Bullet(){this.sourceX=146,this.sourceY=601,this.width=5,this.height=5,this.drawX=-10,this.drawY=0,this.hasHit=!1,this.explosion=new Explosion}function Explosion(){this.sourceX=151,this.sourceY=600,this.width=106,this.height=100,this.drawX=0,this.drawY=0,this.hasHit=!0,this.currentFrame=0,this.totalFrames=10}function BadGuy(){this.sourceX=1,this.sourceY=711,this.width=40,this.height=42,this.speed=2,this.drawX=Math.floor(800*Math.random())+gameWidth,this.drawY=Math.floor(Math.random()*(gameHeight-150))}function clearContextBadGuys(){contextBadGuys.clearRect(0,0,gameWidth,gameHeight)}function drawBadGuys(){clearContextBadGuys();for(var a=0;a<badGuys.length;a++)badGuys[a].draw()}function spawnBadGuys(a){for(var b=0;a>b;b++)badGuys[badGuys.length]=new BadGuy}function checkKeyDown(a){var b=a.keyCode||a.which,c=38,d=87,e=39,f=68,g=40,h=83,i=37,j=65,k=32;(b===c||b===d)&&(superMe.isUpKey=!0,a.preventDefault()),(b===e||b===f)&&(superMe.isRightKey=!0,a.preventDefault()),(b===g||b===h)&&(superMe.isDownKey=!0,a.preventDefault()),(b===i||b===j)&&(superMe.isLeftKey=!0,a.preventDefault()),b===k&&(superMe.isSpaceBar=!0,a.preventDefault())}function checkKeyUp(a){var b=a.keyCode||a.which,c=38,d=87,e=39,f=68,g=40,h=83,i=37,j=65,k=32;(b===c||b===d)&&(superMe.isUpKey=!1,a.preventDefault()),(b===e||b===f)&&(superMe.isRightKey=!1,a.preventDefault()),(b===g||b===h)&&(superMe.isDownKey=!1,a.preventDefault()),(b===i||b===j)&&(superMe.isLeftKey=!1,a.preventDefault()),b===k&&(superMe.isSpaceBar=!1,a.preventDefault())}var canvasBackground=document.getElementById("canvas-background"),contextBackground=canvasBackground.getContext("2d"),canvasBadGuys=document.getElementById("bad-guys"),contextBadGuys=canvasBadGuys.getContext("2d"),badGuys=[],spawnAmount=5,superMe=new SuperMe,canvasSuperMe=document.getElementById("super-me"),contextSuperMe=canvasSuperMe.getContext("2d"),gameWidth=canvasBackground.width,gameHeight=canvasBackground.height,isPlaying=!1,fps=10,drawInterval,requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}(),imgSprite=new Image;imgSprite.src="images/sprite.png",imgSprite.addEventListener("load",init,!1),SuperMe.prototype.draw=function(){clearContextSuperMe(),this.checkDirection(),this.handX=this.drawX+146,this.handY=this.drawY+30,this.checkShooting(),this.drawBullets(),contextSuperMe.drawImage(imgSprite,this.sourceX,this.sourceY,this.width,this.height,this.drawX,this.drawY,this.width,this.height)},SuperMe.prototype.checkDirection=function(){this.isUpKey&&(this.drawY-=this.speed),this.isRightKey&&(this.drawX+=this.speed),this.isDownKey&&(this.drawY+=this.speed),this.isLeftKey&&(this.drawX-=this.speed)},SuperMe.prototype.drawBullets=function(){for(var a=0;a<this.bullets.length;a++)this.bullets[a].drawX>=0&&this.bullets[a].draw(),this.bullets[a].explosion.hasHit&&this.bullets[a].explosion.draw()},SuperMe.prototype.checkShooting=function(){this.isSpaceBar&&!this.isShooting?(this.isShooting=!0,this.bullets[this.currentBullet].fire(this.handX,this.handY),this.currentBullet++,this.currentBullet>=this.bullets.length&&(this.currentBullet=0)):this.isSpaceBar||(this.isShooting=!1)},Bullet.prototype.draw=function(){this.drawX+=6,contextSuperMe.drawImage(imgSprite,this.sourceX,this.sourceY,this.width,this.height,this.drawX,this.drawY,this.width,this.height),this.hitBadGuy(),this.drawX>gameWidth&&this.recycle()},Bullet.prototype.fire=function(a,b){this.drawX=a,this.drawY=b},Bullet.prototype.recycle=function(){this.drawX=-10},Bullet.prototype.hitBadGuy=function(){for(var a=0;a<badGuys.length;a++)this.drawX>=badGuys[a].drawX&&this.drawX<=badGuys[a].drawX+badGuys[a].width&&this.drawY>=badGuys[a].drawY&&this.drawY<=badGuys[a].drawY+badGuys[a].height&&(this.explosion.drawX=badGuys[a].drawX-this.explosion.width/2,this.explosion.drawY=badGuys[a].drawY,this.explosion.hasHit=!0,this.recycle(),badGuys[a].recycleBadGuy())},Explosion.prototype.draw=function(){this.currentFrame<=this.totalFrames?(contextSuperMe.drawImage(imgSprite,this.sourceX,this.sourceY,this.width,this.height,this.drawX,this.drawY,this.width,this.height),this.currentFrame++):(this.hasHit=!1,this.currentFrame=0)},BadGuy.prototype.draw=function(){this.drawX-=this.speed,contextBadGuys.drawImage(imgSprite,this.sourceX,this.sourceY,this.width,this.height,this.drawX,this.drawY,this.width,this.height),this.checkEscaped()},BadGuy.prototype.checkEscaped=function(){this.drawX+this.width<=0&&this.recycleBadGuy()},BadGuy.prototype.recycleBadGuy=function(){this.drawX=Math.floor(800*Math.random())+gameWidth,this.drawY=Math.floor(Math.random()*(gameHeight-150))};