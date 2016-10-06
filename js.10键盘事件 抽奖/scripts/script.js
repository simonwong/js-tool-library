var data = ["外星人笔记本电脑","IPhone7Plus","三星note7","巴厘岛3日双人游","技嘉GA-Z170X-GAMING G1(rev.1.0)","罗技G502","再抽一次","谢谢参与"],
	timer = null,
	flag = 0;
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
function lotteryDraw(){
	var	play = document.getElementById("play"),
		stop = document.getElementById("stop");
	//鼠标点击开始抽奖
	play.onclick = btnPlay;
	//鼠标点击停止抽奖
	stop.onclick = btnStop;
	//键盘事件
	document.onkeyup = function(event){
		event = event || window.event;
		if (event.keyCode == 13) {
			if (flag == 0) {
				btnPlay();
				flag = 1;
			}else{
				btnStop();
				flag = 0;
			}
		}
	}
}
function btnPlay(){
	play = document.getElementById("play")
	play.style.backgroundColor = "#999";
	var title = document.getElementById("title");
	// var num = Math.floor(Math.random() * data.length);
	// title.innerHTML = data[num];
	// setTimeout(btnPlay,100);
	clearInterval(timer);
	timer = setInterval(function(){
		var num = Math.floor(Math.random() * data.length);
		title.innerHTML = data[num];
	},50);
}
function btnStop(){
	var	play = document.getElementById("play");
	clearInterval(timer);
	play.style.backgroundColor = "#036";
};
addLoadEvent(lotteryDraw);