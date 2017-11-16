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

var container = document.getElementById('container'),
	list = document.getElementById('list'),
	buttons = document.getElementById('buttons').getElementsByTagName('span'),
	prev = document.getElementById('prev'),
	next = document.getElementById('next'),
	index = 1,
	animated = false,
	timer = null;

function roll() {
	
	timer = setInterval(function() {
		next.onclick();
	},2000);

	container.onmouseover = function() {
		clearInterval(timer);
	}
	container.onmouseout = function() {
		timer = setInterval(function() {
			next.onclick();
		},2000);
	}

	next.onclick = function() {
		if (!animated) {
			if (index == 5) {
				index = 1;
			}else {
				index += 1;
			}
			showButton();
			animate(-240);
		}
		
	}
	prev.onclick = function() {
		if (!animated) {
			if (index == 1) {
				index = 5;
			}else {
				index -= 1;
			}
			showButton();
			animate(240);
		}
	}

	for(var i=0; i<buttons.length; i++) {
		buttons[i].onclick = function() {
			if (this.className == 'on') {
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -240*(myIndex - index);
			index = myIndex;
			showButton();
			if (!animated) {
				animate(offset);
			}
		}
	}
}

function animate(offset) {
	animated = true;
	var nowLeft = list.offsetLeft + offset;
	var time = 500;
	var interval = 10;
	var speed = offset / (time / interval);

	function go() {
		if ( (speed < 0 && list.offsetLeft > nowLeft) || (speed > 0 && list.offsetLeft < nowLeft) ) {
			list.style.left = list.offsetLeft + speed + 'px';
			setTimeout(go, interval);
		}else {
			animated = false;
			list.style.left = nowLeft + 'px';

			if (nowLeft > -240) {
				list.style.left = -1200 + 'px';
			}
			if (nowLeft < -1200) {
				list.style.left = -240 + 'px';
			}
		}
	}

	go();
}

function showButton() {
	for(var i=0; i<buttons.length; i++){
		if (buttons[i].className == 'on') {
			buttons[i].className = '';
			break;
		}
	}
	buttons[index - 1].className = 'on';
}

addLoadEvent(roll);