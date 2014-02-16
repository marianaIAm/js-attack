function init(){drawBackground(),startDrawing(),superMe=new SuperMe,document.addEventListener("keydown",checkKeyDown,!1),document.addEventListener("keyup",checkKeyUp,!1)}function draw(){superMe.draw()}function startDrawing(){stopDrawing(),drawInterval=setInterval(draw,fps)}function stopDrawing(){clearInterval(drawInterval)}function SuperMe(){this.sourceX=0,this.sourceY=600,this.drawX=70,this.drawY=60,this.width=146,this.height=114,this.speed=2,this.isUpKey=!1,this.isRightKey=!1,this.isDownKey=!1,this.isLeftKey=!1}function drawBackground(){var a=0,b=0,c=0,d=0;contextBackground.drawImage(imgSprite,a,b,gameWidth,gameHeight,c,d,gameWidth,gameHeight)}function clearContextBackground(){contextBackground.clearRect(0,0,gameWidth,gameHeight)}function clearContextSuperMe(){contextSuperMe.clearRect(0,0,gameWidth,gameHeight)}function checkKeyDown(a){var b=a.keyCode||a.which,c=38,d=87,e=39,f=68,g=40,h=83,i=37,j=65;(b===c||b===d)&&(superMe.isUpKey=!0,a.preventDefault()),(b===e||b===f)&&(superMe.isRightKey=!0,a.preventDefault()),(b===g||b===h)&&(superMe.isDownKey=!0,a.preventDefault()),(b===i||b===j)&&(superMe.isLeftKey=!0,a.preventDefault())}function checkKeyUp(a){var b=a.keyCode||a.which,c=38,d=87,e=39,f=68,g=40,h=83,i=37,j=65;(b===c||b===d)&&(superMe.isUpKey=!1,a.preventDefault()),(b===e||b===f)&&(superMe.isRightKey=!1,a.preventDefault()),(b===g||b===h)&&(superMe.isDownKey=!1,a.preventDefault()),(b===i||b===j)&&(superMe.isLeftKey=!1,a.preventDefault())}var superMe,canvasBackground=document.getElementById("canvas-background"),contextBackground=canvasBackground.getContext("2d"),canvasSuperMe=document.getElementById("canvas-super-me"),contextSuperMe=canvasSuperMe.getContext("2d"),gameWidth=canvasBackground.width,gameHeight=canvasBackground.height,fps=10,drawInterval,imgSprite=new Image;imgSprite.src="images/sprite.png",imgSprite.addEventListener("load",init,!1),SuperMe.prototype.draw=function(){clearContextSuperMe(),this.checkKeys(),contextSuperMe.drawImage(imgSprite,this.sourceX,this.sourceY,this.width,this.height,this.drawX,this.drawY,this.width,this.height)},SuperMe.prototype.checkKeys=function(){this.isUpKey&&(this.drawY-=this.speed),this.isRightKey&&(this.drawX+=this.speed),this.isDownKey&&(this.drawY+=this.speed),this.isLeftKey&&(this.drawX-=this.speed)};