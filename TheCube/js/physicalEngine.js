var primarySpeedY=100;
var primarySpeedX=40;
var elapsed = 0.05;
//以下是一些音效
function energySound(){
	if (document.getElementsByClassName("triggeredSound")[0]){
		document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("triggeredSound")[0]);
	}
	var body = document.getElementsByTagName("body")[0];
	var sound = document.createElement("audio");
	var src = document.createElement("source");
	sound.setAttribute("class","triggeredSound");
	sound.setAttribute("autoplay","autoplay");
	src.setAttribute("src","ext/missionComplet.wav");
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
function cubeSound(){
	if (document.getElementsByClassName("triggeredSound")[0]){
		document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("triggeredSound")[0]);
	}
	var body = document.getElementsByTagName("body")[0];
	var sound = document.createElement("audio");
	var src = document.createElement("source");
	sound.setAttribute("class","triggeredSound");
	sound.setAttribute("autoplay","autoplay");
	src.setAttribute("src","ext/magic.wav");
	sound.appendChild(src);
	body.appendChild(sound);
}
function jumpSound(){
	if (document.getElementsByClassName("triggeredSound")[0]){
		document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("triggeredSound")[0]);
	}
	var body = document.getElementsByTagName("body")[0];
	var sound = document.createElement("audio");
	var src = document.createElement("source");
	sound.setAttribute("class","triggeredSound");
	sound.setAttribute("autoplay","autoplay");
	src.setAttribute("src","ext/jump.wav");
	sound.appendChild(src);
	body.appendChild(sound);
}
var engine = {
	//判断人物是否在下落
	isFall:function(){
		var data = map.getImageData(this.centerX-heroMargin+1,250-(this.centerY-heroMargin),2*heroMargin-1,1).data;
		for (var i = 0;i < 2*heroMargin-1;i++){
			if (data[4*i+3] != 0 && data[4*i+2] != 255){
				return false;
			}
		}
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
	//计算人物下一时刻的x坐标
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
	//计算下一个时刻的x坐标
	nextStateY:function(){
		if(this.isFall()){
			if(this.speedY == 0){
				this.speedY = -primarySpeedY;
			}
		}
		var dy = this.speedY*elapsed;
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
					}
				}
			}
			this.newPositionY = Math.round(this.centerY+dy);
			this.newSpeedY = Math.round(this.speedY + this.GRAVITY*elapsed);
		}
		else if(this.speedY>=10){
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
	//彩蛋
	Bonus:function(){
		this.newSpeedY = 0;
		//alert("bonus");
		this.bonus = false;
	},
	//对人物运动状态进行修正
	nextStateXY:function(){
			var minX = heroMargin;
			var minY = heroMargin;
			var data = map.getImageData(this.newPositionX,250-this.newPositionY,heroMargin,heroMargin).data;
			for (var y = 0; y < heroMargin; y++){
				for (var x = 0; x < heroMargin; x++){
					if (data[4*(y*heroMargin+x)+3] != 0 && data[4*(y*heroMargin+x)+2] != 255){
						if (minX > x){
							minX = x;
							this.newSpeedX = 0;
						}
						if (minY > y){
							minY = y;
							this.newSpeedY = 0;
						}
					}
				}
			}
			this.newPositionX = this.newPositionX - (heroMargin - minX);
			this.newPositionY = this.newPositionY + (heroMargin - minY);
			var maxX2 = 0;
			var minY2 = heroMargin;
			var data2 = map.getImageData(this.newPositionX-heroMargin,250-this.newPositionY,heroMargin,heroMargin).data;
			for (var y = 0; y < heroMargin; y++){
				for (var x = 0; x < heroMargin; x++){
					if (data2[4*(y*heroMargin+x)+3] != 0 && data2[4*(y*heroMargin+x)+2] != 255){
						if (maxX2 < x){
							maxX2 = x;
							this.newSpeedX = 0;
						}
						if (minY2 > y){
							minY2 = y;
							this.newSpeedY = 0;
						}
					}
				}
			}
			this.newPositionX = this.newPositionX + maxX2;
			this.newPositionY = this.newPositionY + (heroMargin - minY2);
	},
	//初始化物理引擎
	initialize:function (){
		this.centerX=0;
		this.centerY=0;
		this.speedX=0;
		this.speedY=0;
		this.newPositionX=0;
		this.newPositionY=0;
		this.newSpeedX=0;
		this.newSpeedY=0;
		this.overBoundary=false;
		this.bonus = false;
	},
	//将下一时刻状态转化为当前状态
	toNextState:function (){
		this.centerX = this.newPositionX;
		this.centerY = this.newPositionY;
		this.speedX = this.newSpeedX;
		this.speedY = this.newSpeedY;
	},
	//过关
	overEndLine:function (){
		if (this.centerX >= endLine.x+heroMargin && this.centerY >= endLine.y+heroMargin-5){
			return true;
		}
		else{
			return false;
		}
	}
};
//右移
function moveHoriziontallyR (){
	engine.speedX = primarySpeedX;
}
//左移
function moveHoriziontallyL (){
	engine.speedX = -primarySpeedX;
}
//跳跃
function moveVerticallyUp (){
	if (!engine.isFall()){
		jumpSound()；
		engine.speedY=primarySpeedY;
	}
}
//更新人物状态
function upDateData (){
	engine.nextStateX();
	engine.nextStateY();
	engine.nextStateXY();
	if (engine.overBoundary == true){
		clearInterval(timer);
		deathSound();
		gameover();
		restart();
		return;
	}
	else{
		if (engine.bonus == true){
			engine.Bonus();
			alert("骚年你跳得好高啊");
		}
		engine.toNextState();
		setPosition(document.getElementsByClassName("hero")[0],engine.centerX-heroMargin,250-(engine.centerY-heroMargin));
		if (engine.overEndLine()){
			overEndLineSound();
			var body = document.getElementsByTagName("body")[0];
			var congratulation = document.createElement("div");
			congratulation.setAttribute("class","hintIncident");
			congratulation.innerHTML = "CONGRATULATION!";
			body.appendChild(congratulation);
			setTimeout(function(){document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("hintIncident")[0]);},2000);
			nextLevel();
		}
	}
}
//游戏开始
function start (){
	engine.initialize();
	engine.centerX = startPoint.x+heroMargin;
	engine.centerY = startPoint.y+heroMargin+1;
	timer = setInterval(upDateData,50);
}
