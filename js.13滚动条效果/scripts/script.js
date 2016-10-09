/*
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
//无间隙滚屏效果
var moocBox = document.getElementById("moocBox"),
moocBox.innerHTML += moocBox.innerHTML;
function scrollPlay(){
	if (moocBox.scrollTop >= moocBox.scrollHeight/2) {
		moocBox.scrollTop = 0;
	}else{
	moocBox.scrollTop++
	}
}
var speed = 50
var myScroll = setInterval("scrollPlay()",speed);
function scroll(){
	moocBox.onmouseover = function(){
		clearInterval(myScroll);
	}
	moocBox.onmouseout = function(){
		myScroll = setInterval("scrollPlay()",speed);
	}
}
addLoadEvent(scroll);
*/
//间歇性滚屏
var moocBox = document.getElementById("moocBox");
var	timer;
var	liHight = 24;//单行的高度
var speed = 50;//滚屏速度
var delay = 2000;//每次滚动间歇时间
moocBox.innerHTML += moocBox.innerHTML;
function startMove(){
	moocBox.scrollTop++;
	timer = setInterval("scrollPlay()",speed)
}
function scrollPlay(){
	if (moocBox.scrollTop % liHight == 0){
		clearInterval(timer);
		setTimeout("startMove()",delay)
	}else{
		moocBox.scrollTop++
		if (moocBox.scrollTop >= moocBox.scrollHeight/2) {
			moocBox.scrollTop = 0;
		}
	}
}
setTimeout(startMove,delay);