$(document).ready(function() {

	var ref = new Wilddog("https://barragewall.wilddogio.com/");
	var arr = [];
	//把数据提交到野狗云
	$(".b_push").click(function() {
		var text = $(".b_text").val();
		ref.child('message').push(text);
		$(".b_text").val('');
	});
	//响应按键点击事件
	$(".b_text").keypress(function(event) {
		if (event.keyCode == "13") {
			$(".b_push").trigger('click');
		}
	});
	//响应按键清除事件
	$(".b_clear").click(function() {
		ref.remove();
		arr = [];
		$('.b_show').empty();
	});
	//监听云端数据变更，云端数据变化，弹幕框里数据也跟着变化。
	ref.child('message').on('child_added', function(snapshot) {
		var text = snapshot.val();
		arr.push(text);
		var textObj = $('<div class="dm_message"></div>');
		textObj.text(text);
		$(".b_show").append(textObj);
		moveObj(textObj);
	});

	ref.on('child_removed', function() {
		arr = [];
		$('.b_show').empty();
	});

	//按照时间规则显示弹幕内容。	
	var topMin = $('.b_mask').offset().top;
	var topMax = topMin + $('.b_mask').height();
	var _top = topMin;

	var moveObj = function(obj) {

		var _left = $('.b_mask').width() - obj.width();
		_top = _top + 50;
		if (_top > (topMax - 50)) {
			_top = topMin;
		}

		obj.css({
			left: _left,
			top: _top,
			color: getRandomColor()
			});
			var time = 20000 + 10000 * Math.random();
			obj.animate({
				left: "-" + _left + "px"
				}, time, function() {
				obj.remove();
			});
	}

	var getRandomColor = function() {
		return '#' + (function(h) {
			return new Array(7 - h.length).join("0") + h
		})((Math.random() * 0x1000000 << 0).toString(16))
	}

	var getAndRun = function() {
		if (arr.length > 0) {
			var n = Math.floor(Math.random() * arr.length + 1) - 1;
			var textObj = $("<div>" + arr[n] + "</div>");
			$(".b_show").append(textObj);
			moveObj(textObj);
		}
		setTimeout(getAndRun, 3000);
	}

	jQuery.fx.interval = 50;
	getAndRun();
});