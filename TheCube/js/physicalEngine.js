var primarySpeedY=100;
var primarySpeedX=40;
var elapsed = 0.05;
function energySound(){
	if (document.getElementsByClassName("triggeredSound")[0]){
		document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("triggeredSound")[0]);
	}
	var body = document.getElementsByTagName("body")[0];
	var sound = document.createElement("audio");
	var src = document.createElement("source");
	sound.setAttribute("class","triggeredSound");
	sound.setAttribute("autoplay","autoplay");
	src.setAttribute("src","ext/missionComplete.wav");
	sound.appendChild(src);
	body.appendChild(sound);
}
function overEndLineSound(){
	if (document.getElementsByClassName("triggeredSound")[0]){
		document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("triggeredSound")[0]);
	}
	var body = document.getElementsByTagName("body")[0];
	var sound = document.createElement("audio");
	var src = document.createElement("source");
	sound.setAttribute("class","triggeredSound");
	sound.setAttribute("autoplay","autoplay");
	src.setAttribute("src","ext/energy.mp3");
	sound.appendChild(src);
	body.appendChild(sound);
}
function deathSound(){
	if (document.getElementsByClassName("triggeredSound")[0]){
		document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("triggeredSound")[0]);
	}
	var body = document.getElementsByTagName("body")[0];
	var sound = document.createElement("audio");
	var src = document.createElement("source");
	sound.setAttribute("class","triggeredSound");
	sound.setAttribute("autoplay","autoplay");
	src.setAttribute("src","ext/death.wav");
	sound.appendChild(src);
	body.appendChild(sound);
}
function bonusSound(){
	if (document.getElementsByClassName("triggeredSound")[0]){
		document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("triggeredSound")[0]);
	}
	var body = document.getElementsByTagName("body")[0];
	var sound = document.createElement("audio");
	var src = document.createElement("source");
	sound.setAttribute("class","triggeredSound");
	sound.setAttribute("autoplay","autoplay");
	src.setAttribute("src","ext/bonus.wav");
	sound.appendChild(src);
	body.appendChild(sound);
}
function gameover(){
	//clearInterval(timer);
	var body = document.getElementsByTagName("body")[0];
	var gameover = document.createElement("div");
	gameover.setAttribute("class","hintIncident");
	gameover.innerHTML = "GAMEOVER!";
	body.appendChild(gameover);
	//body.removeChild(gameover);
	setTimeout(function(){document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("hintIncident")[0]);},500);
}
var engine = {
	isFall:function(){
		var data = map.getImageData(this.centerX-heroMargin+1,250-(this.centerY-heroMargin),2*heroMargin-1,1).data;
		//console.log(data);
		for (var i = 0;i < 2*heroMargin-1;i++){
			//console.log(data[4*i+0]);
			if (data[4*i+3] != 0 && data[4*i+2] != 255){
				//alert("false");
				return false;
			}
		}
		//alert("true");
		return true;
	},
	centerX:0,
	centerY:0,
	speedX:0,
	speedY:0,
	newPositionX:0,
	newPositionY:0,
	newSpeedX:0,
	newSpeedY:0,
	GRAVITY:-200,
	overBoundary:false,
	bonus:false,
	//collidedX:false,
	//collidedX:false,
	nextStateX:function(){
		var dx = this.speedX*elapsed;
		if(this.speedX<0){
			if (Math.round(this.centerX+dx-heroMargin) <= 0){
				this.overBoundary = true;
				return;
			}
			var data = map.getImageData(Math.round(this.centerX+dx-heroMargin),250-(this.centerY+heroMargin)+1,Math.round(-dx),2*heroMargin-1).data;
			for(var i = Math.round(-dx)-1; i >= 0;i--){
				for (var j = 0; j < 2*heroMargin-1;j++)
				{
					if (data[4*(j*Math.round(-dx)+i)+3] != 0 && data[4*(j*Math.round(-dx)+i)+2] != 255){
						this.newPositionX = this.centerX-(Math.round(-dx)-i)+1;
						this.newSpeedX = 0;
						return;
					}
					else if(data[4*(j*Math.round(-dx)+i)+2] == 255){
						var energyIndex = isEnergyConnected(this.centerX - (Math.round(-dx) - i) - heroMargin, 250 - this.centerY + j - (heroMargin));
						if (energyIndex == -1) continue;           // isEnergyUnconnected返回坐标对应的能量编号，若不存在或者已经被吸收返回-1
						energySound();
					    energyNo = touchEnergy(energyIndex);
						//alert(this.centerX-(Math.round(-dx)-i)-heroMargin);
						//alert(250-this.centerY+j-(heroMargin-2));
					}
				}
			}
			this.newPositionX = Math.round(this.centerX+dx);
			this.newSpeedX = this.speedX;
		}
		else if(this.speedX>0){
			if (Math.round(this.centerX+dx+heroMargin) >= 800){
				this.overBoundary = true;
				return;
			}
			var data = map.getImageData(Math.round(this.centerX+heroMargin),250-(this.centerY+heroMargin)+1,Math.round(dx),2*heroMargin-1).data;
			//console.log(data);
			for(var i = 0; i < Math.round(dx);i++){
				for (var j = 0; j < 2*heroMargin-1;j++)
				{
					//alert(i);
					if (data[4*(j*Math.round(dx)+i)+3] != 0 && data[4*(j*Math.round(dx)+i)+2] != 255){
						//alert(data[4*(j*Math.round(dx)+i)+3]);
						//alert(i);
						this.newPositionX = this.centerX+i;
						this.newSpeedX = 0;
						//alert(this.newPositionX);
						return;
					}
					else if (data[4*(j*Math.round(dx)+i)+2] == 255){
						var energyIndex = isEnergyConnected(this.centerX + heroMargin + i, 250 - this.centerY + j - (heroMargin));
						if (energyIndex == -1) continue;           // isEnergyUnconnected返回坐标对应的能量编号，若不存在或者已经被吸收返回-1
						energySound();
					    energyNo = touchEnergy(energyIndex);
						//alert(this.centerX+heroMargin+i);
						//alert(250-this.centerY+j-(heroMargin-2));
					}
				}
			}
			this.newPositionX = Math.round(this.centerX+dx);
			this.newSpeedX = this.speedX;
		}
		else{
			this.newPositionX = this.centerX;
			this.newSpeedX = 0;
		}
	},
	nextStateY:function(){
		if(this.isFall()){
			if(this.speedY == 0){
				//alert("error");
				this.speedY = -primarySpeedY;
			}
		}
		var dy = this.speedY*elapsed;
		//console.log(dy);
		//console.log(this.speedY);
		if(this.speedY<=-10){
			if (Math.round(this.centerY+dy-heroMargin) <= 0){
				this.overBoundary = true;
				return;
			}
			var data = map.getImageData(Math.round(this.centerX-heroMargin)+1,250-(this.centerY-heroMargin),2*heroMargin-1,Math.round(-dy)).data;
			for(var i = 0; i < Math.round(-dy);i++){
				for (var j = 0; j < 2*heroMargin-1;j++)
				{
					if (data[4*(i*(2*heroMargin-1)+j)+3] != 0 && data[4*(i*(2*heroMargin-1)+j)+2] != 255){
						this.newPositionY = this.centerY-i;
						this.newSpeedY = 0;
						return;
					}
					else if(data[4*(i*(2*heroMargin-1)+j)+2] == 255){
						var energyIndex = isEnergyConnected(this.centerX + j - (heroMargin), 250 - this.centerY + heroMargin + i);
						if (energyIndex == -1) continue;           // isEnergyUnconnected返回坐标对应的能量编号，若不存在或者已经被吸收返回-1
						energySound();
					    energyNo = touchEnergy(energyIndex);
						//alert(this.centerX+j-(heroMargin-2));
						//alert(250-this.centerY+heroMargin+i);
					}
				}
			}
			this.newPositionY = Math.round(this.centerY+dy);
			this.newSpeedY = Math.round(this.speedY + this.GRAVITY*elapsed);
		}
		else if(this.speedY>=10){
			//alert("posible");
			if (Math.round(this.centerY+dy+heroMargin) >= 250){
				this.bonus = true;
				return;
			}
			var data = map.getImageData(Math.round(this.centerX-heroMargin)+1,250-Math.round(this.centerY+heroMargin+dy),2*heroMargin-1,Math.round(dy)).data;
			for(var i = Math.round(dy)-2; i >= 0;i--){
				for (var j = 0; j < 2*heroMargin-1;j++)
				{
					if (data[4*(i*(2*heroMargin-1)+j)+3] != 0 && data[4*(i*(2*heroMargin-1)+j)+2] != 255){
						this.newPositionY = this.centerY+(Math.round(dy)-i)-1;
						this.newSpeedY = 0;
						return;
					}
					else if (data[4*(i*(2*heroMargin-1)+j)+2] == 255){
					    var energyIndex = isEnergyConnected(this.centerX + j - (heroMargin), 250 - this.centerY - heroMargin - (Math.round(dy) - i));
						if (energyIndex == -1) continue;           // isEnergyUnconnected返回坐标对应的能量编号，若不存在或者已经被吸收返回-1
						energySound();
					    energyNo = touchEnergy(energyIndex);
						//alert(this.centerX+j-(heroMargin-2));
						//alert(250-this.centerY-heroMargin-(Math.round(dy)-i));
					}
				}
			}
			this.newPositionY = Math.round(this.centerY+dy);
			this.newSpeedY = Math.round(this.speedY + this.GRAVITY*elapsed);
		}
		else{
			this.newPositionY = this.centerY;
			this.newSpeedY = 0;
		}
	},
	Bonus:function(){
		this.newSpeedY = 0;
		//alert("bonus");
		this.bonus = false;
	},
	nextStateXY:function(){
		//if (this.speedX >= 10 && this.speedY <= -10){
			//alert("beizhixing");
			var minX = heroMargin;
			var minY = heroMargin;
			var data = map.getImageData(this.newPositionX,250-this.newPositionY,heroMargin,heroMargin).data;
			for (var y = 0; y < heroMargin; y++){
				for (var x = 0; x < heroMargin; x++){
					if (data[4*(y*heroMargin+x)+3] != 0 && data[4*(y*heroMargin+x)+2] != 255){
						if (minX > x){
							minX = x;
							this.newSpeedX = 0;
							//alert("changed1");
						}
						if (minY > y){
							minY = y;
							this.newSpeedY = 0;
							//alert("changed2");
						}
					}
				}
			}
			this.newPositionX = this.newPositionX - (heroMargin - minX);
			this.newPositionY = this.newPositionY + (heroMargin - minY);
		//}
		//else if (this.speedX <= -10 && this.speedY <= -10){
			var maxX2 = 0;
			var minY2 = heroMargin;
			var data2 = map.getImageData(this.newPositionX-heroMargin,250-this.newPositionY,heroMargin,heroMargin).data;
			//console.log(data2);
			for (var y = 0; y < heroMargin; y++){
				for (var x = 0; x < heroMargin; x++){
					if (data2[4*(y*heroMargin+x)+3] != 0 && data2[4*(y*heroMargin+x)+2] != 255){
						if (maxX2 < x){
							maxX2 = x;
							this.newSpeedX = 0;
							//alert("changed3");
						}
						if (minY2 > y){
							minY2 = y;
							this.newSpeedY = 0;
							//alert("changed4");
						}
					}
				}
			}
			this.newPositionX = this.newPositionX + maxX2;
			this.newPositionY = this.newPositionY + (heroMargin - minY2);
		//}
		//else return;
	},
	initialize:function (){
		this.centerX=0;
		this.centerY=0;
		this.speedX=0;
		this.speedY=0;
		this.newPositionX=0;
		this.newPositionY=0;
		this.newSpeedX=0;
		this.newSpeedY=0;
		//this.GRAVITY=-30;
		this.overBoundary=false;
		this.bonus = false;
	},
	toNextState:function (){
		this.centerX = this.newPositionX;
		this.centerY = this.newPositionY;
		this.speedX = this.newSpeedX;
		this.speedY = this.newSpeedY;
	},
	overEndLine:function (){
		//console.log(this.centerX);
		//console.log(this.centerY);
		//console.log(endLine.x+heroMargin);
		//console.log(endLine.y+heroMargin-5);
		if (this.centerX >= endLine.x+heroMargin && this.centerY >= endLine.y+heroMargin-5){
			return true;
		}
		else{
			return false;
		}
	}
};
function moveHoriziontallyR (){
	engine.speedX = primarySpeedX;
}
function moveHoriziontallyL (){
	engine.speedX = -primarySpeedX;
}
function moveVerticallyUp (){
	//alert("jump");
	if (!engine.isFall()){
		//alert("speed");
		engine.speedY=primarySpeedY;
	}
}
function upDateData (){
	engine.nextStateX();
	engine.nextStateY();
	engine.nextStateXY();
	if (engine.overBoundary == true){
		clearInterval(timer);
		deathSound();
		gameover();
		//var time = new Date;
		//while(true){
		//	if (new Date - time > 1000) break;
		//}
		//document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("hintIncident")[0]);
		//setPosition(document.getElementsByClassName("hero")[0],startPoint.x,startPoint.y);
		//loadMap();
		restart();
		//engine.initialize();
		//engine.centerX = startPoint.x+heroMargin;
		//engine.centerY = startPoint.y+heroMargin;
		return;
	}
	else{
		if (engine.bonus == true){
			engine.Bonus();
			alert("骚年你跳得好高啊");
		}
		engine.toNextState();
		//                                                                                                                    alert(engine.centerX);
		//alert(engine.centerY);
		setPosition(document.getElementsByClassName("hero")[0],engine.centerX-heroMargin,250-(engine.centerY-heroMargin));
		if (engine.overEndLine()){
			overEndLineSound();
			var body = document.getElementsByTagName("body")[0];
			var congratulation = document.createElement("div");
			congratulation.setAttribute("class","hintIncident");
			congratulation.innerHTML = "CONGRATULATION!";
			body.appendChild(congratulation);
			//body.removeChild(gameover);
			setTimeout(function(){document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("hintIncident")[0]);},2000);
			//alert("过关了！");
			nextLevel();
		}
	}
}
function start (){
	engine.initialize();
	engine.centerX = startPoint.x+heroMargin;
	//alert(engine.centerX);
	engine.centerY = startPoint.y+heroMargin+1;
	//alert(engine.centerY);
	timer = setInterval(upDateData,50);
}
