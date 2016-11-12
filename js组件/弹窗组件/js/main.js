requirejs.config({
	paths:{
		jquery: "jquery-3.1.1.min",
		// jquery: "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min",
		jqueryUI: "http://apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min"
	}
})

requirejs(['jquery','jqueryUI','window'],function($,$UI,w) {
	// var win = new w.Window();
	$("#alert11").click(function() {
		win = new w.Window().alert({
			width: 300,
			height: 150,
			content: 'Hello SiJie',
			title: '我是alert弹窗',
			handler4AlertBtn: function(){alert("you click OK");},
			handler4CloseBtn: function(){alert("you click close");},
			text4AlertBtn: 'OK',
			hasCloseBtn: true,
			// skinClassName: 'window_skin_a',
			dragHandle: ".window_header"
		});
		win.on("alert",function() {
			alert("second OK");
		})
		win.on("alert",function() {
			alert("third OK");
		});
		win.on("close",function() {
			alert("second close");
		});
	});

	$("#confirm11").click(function() {
		win = new w.Window().confirm({
			title: '我是confirm弹窗',
			content: '你要删除我的记忆么？',
			width: 300,
			height: 150,
			y: 50,
			text4ConfirmBtn: '是的',
			text4CancelBtn: '不要',
			dragHandle: ".window_header"
		});
		win.on("confirm",function() {
			alert("是的的回调");
		});
		win.on("cancel",function() {
			alert("不要的回调");
		});
	});

	$("#prompt11").click(function() {
		win = new w.Window().prompt({
			title: '我是prompt弹窗',
			content: '输入你想说的话',
			width: 300,
			height: 150,
			y: 50,
			text4PromptBtn:'输入',
			text4CancelBtn: '拒绝',
			defaultValue4PromptInput:'王大傻',
			dragHandle: ".window_header",
			handler4PromptBtn: function(inputValue) {
				alert("你是想要说：" + inputValue);
			},
		});
		win.on("cancel",function() {
			alert("拒绝的回调");
		});
	});

	$("#common11").click(function() {
		win = new w.Window().common({
			content: '大家一起通用啊啊啊啊啊',
			width: 300,
			height: 150,
			y: 100,
			hasCloseBtn: true,
		});
	});
})