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
var timer = null
//侧边栏动画
function sidePlay(){
	var side = document.getElementById("side_play")
	side.onmouseover = function(){
		sideMove(0);
	}
	side.onmouseout = function(){
		sideMove(-200);
	}
}	
function sideMove(target){
	clearInterval(timer);
	var side = document.getElementById("side_play")
	timer = setInterval(function(){
		var speed = 0;
		if (side.offsetLeft > target) {
			speed = -10;
		}else{
			speed = 10;
		}
		if (side.offsetLeft == target) {
			clearInterval(timer)
		}else{
			side.style.left = side.offsetLeft + speed + "px"
		}
	},20)
}
addLoadEvent(sidePlay);