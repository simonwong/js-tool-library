function addLoadEvent(func){
  var oldonload = window.onload;
  if (typeof window.onload != 'function'){
    window.onload = func;
  }else {
    window.onload = function(){
      oldonload();
      func();
    }
  }
}
//获取样式
function getStyle(obj,attr){
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

//侧边栏动画
var timerSide = null
function sidePlay(){
	var side = document.getElementById("side_play")
	side.onmouseover = function(){
		sideMove(0);
	}
	side.onmouseout = function(){
		sideMove(-200);
	}
}
//侧边栏匀速运动的封装，因为整合封装是缓冲运动，所以不注释
function sideMove(target){
	clearInterval(timerSide);
	var side = document.getElementById("side_play")
	timerSide = setInterval(function(){
		var speed = 0;
		if (side.offsetLeft > target) {
			speed = -10;
		}else{
			speed = 10;
		}
		if (side.offsetLeft == target) {
			clearInterval(timerSide)
		}else{
			side.style.left = side.offsetLeft + speed + "px"
		}
	},20)
}
//改变透明度动画
function alphaPlay(){
	var boxAlpha = document.getElementById("box_alpha");
	boxAlpha.onmouseover = function(){
		alphaChange(100);
	}
	boxAlpha.onmouseout = function(){
		alphaChange(30);
	}
}
//设一个变量为30
var alpha = 30;
var timerAlpha = null;
function alphaChange(target){
	var boxAlpha = document.getElementById("box_alpha");
	clearInterval(timerAlpha);
	timerAlpha = setInterval(function(){
		var speed = 0;
		if (alpha > target){
			speed = -10;
		}else{
			speed = 10
		}
		if (alpha == target){
			clearInterval(timerAlpha);
		}else{
			alpha += speed;
			boxAlpha.style.filter = 'alpha(opacity:'+alpha+')';
			boxAlpha.style.opacity = alpha / 100;
		}
	},50)
}
//侧边栏2匀速运动
function sidePlayT(){
	var side = document.getElementById("side_play_2")
	side.onmouseover = function(){
		startMove(side,{left:0});
	}
	side.onmouseout = function(){
		startMove(side,{left:-400});
	}
}
//多个物体运动
function boxThreePlay(){
	var boxThree = document.getElementById("box_three_play");
	var list = boxThree.getElementsByTagName("li");
	for (var i=0; i<list.length; i++){
		list[i].timerThree = null;
		list[i].onmouseover = function(){
			// boxPlay(this,400);
			startMove(this,{width:400})
		}
		list[i].onmouseout = function(){
			//boxPlay(this,200);
			startMove(this,{width:200})
		}
	}
}
//多个物体渐变
function boxFourAlpha(){
	var boxFour = document.getElementById("box_four_alpha");
	var list = boxFour.getElementsByTagName("li");
	for(var i=0; i<list.length; i++){
		list[i].timer = null;
		list[i].alpha = 30;
		list[i].onmouseover = function(){
			startMove(this,{opacity:100});
		}
		list[i].onmouseout = function(){
			startMove(this,{opacity:30});
		}
	}
}
//链试运动
function boxChange(){
	var boxC = document.getElementById("box_change");
	boxC.onmouseover = function(){
		startMove(boxC,{width:400},function(){
			startMove(boxC,{height:400})
		})
	}
	boxC.onmouseout = function(){
		startMove(boxC,{height:200},function(){
			startMove(boxC,{width:200})
		})
	}
}
//一起变的盒子
function boxChangeT(){
	var boxCT = document.getElementById("box_change_t");
	boxCT.onmouseover = function(){
		startMove(boxCT,{width:400,height:100,opacity:30});
	}
	boxCT.onmouseout = function(){
		startMove(boxCT,{width:200,height:200,opacity:100});
	}
}
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true//假设
		for (var attr in json){
			//1取当前的值
			var iCur = 0;
			if (attr == "opacity"){
				iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}
			//2算速度
			var iSpeed = (json[attr] - iCur)/10;
			iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			//3如果运动还没完全走完，flag假设不成立，继续
			if(iCur != json[attr]){
				flag = false;
			}
			//执行
			if (attr == "opacity") {
				obj.style.filter = 'alpha(opacity:'+(iCur + iSpeed)+')';
				obj.style.opacity = (iCur + iSpeed)/100;
			}else{
				obj.style[attr] = iCur + iSpeed + "px";
			}
		}
		//如果flag成立，停止
		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
		
	},30)
}
addLoadEvent(sidePlay);
addLoadEvent(alphaPlay);
addLoadEvent(sidePlayT);
addLoadEvent(boxThreePlay);
addLoadEvent(boxFourAlpha);
addLoadEvent(boxChange);
addLoadEvent(boxChangeT);
/*原来的侧边栏2匀速运动的封装函数
var timerT = null;
function sideMoveT(target){
	var side = document.getElementById("side_play_2")
	clearInterval(timerT);
	timerT = setInterval(function(){
		var	speed = (target - side.offsetLeft)/20;
		speed = side.offsetLeft >target ? Math.floor(speed):Math.ceil(speed);
		if (side.offsetLeft == target) {
			clearInterval(timerT)
		}else{
			side.style.left = side.offsetLeft + speed + "px";
		}
	},20)
}
这个是原来的多个物体运动的封装函数
function boxPlay(obj,target){
	clearInterval(obj.timerThree);
	obj.timerThree = setInterval(function(){
		var speed = (target - obj.offsetWidth)/10;
		speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
		if(obj.offsetWidth == target){
			clearInterval(obj.timerThree);
		}else{
			obj.style.width = obj.offsetWidth + speed + "px";
		}
	},20)
}
多个物体渐变的封装
function boxFourPlay(obj,target){
	clearInterval(obj.timerFour);
	obj.timerFour = setInterval(function(){
		var speed = 0;
		if (obj.alpha > target){
			speed = -10;
		}else{
			speed = 10
		}
		if (obj.alpha == target){
			clearInterval(obj.timerFour);
		}else{
			obj.alpha += speed;
			obj.style.filter = 'alpha(opacity:'+obj.alpha+')';
			obj.style.opacity = obj.alpha/100;
		}
	},30)
}*/