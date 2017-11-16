define(['widget','jquery','jqueryUI'], function(widget,$,$UI) {

	function Window() {
		this.cfg = {
			width: 240,//宽度
			height: 150,//高度
			title: "系统消息",//标题文字
			content: "",//内容文字
			hasCloseBtn: false,//是否需要关闭按钮
			skinClassName: null,//皮肤
			hasMask: true,//模态弹窗
			isDraggable: true,//默认可拖动
			dragHandle: null,//拖动的把手

			text4AlertBtn: '确定',//按钮文字
			text4ConfirmBtn: '确定',//按钮文字
			text4CancelBtn: '取消',//按钮文字
			text4PromptBtn: '取消',//按钮文字

			handler4AlertBtn: null,//按钮回调
			handler4CloseBtn: null,//按钮回调
			handler4ConfirmBtn: null,//按钮回调
			handler4CancelBtn: null,//按钮回调
			handler4PromptBtn: null,//

			isPromptInputPassword: false,
			defaultValue4PromptInput:"",
			maxlength4PromptInput:10
		};
	}

	Window.prototype = $.extend({},new widget.Widget(),{
		renderUI: function() {
			var footerContent = "";
			switch(this.cfg.winType) {
				case "alert":
				footerContent = '<input class="window_alertBtn" type="button" value="'+ this.cfg.text4AlertBtn +'">';
				break;
				case "confirm":
				footerContent = '<input class="window_confirmBtn" type="button" value="'+ this.cfg.text4ConfirmBtn +'"><input class="window_cancelBtn" type="button" value="'+ this.cfg.text4CancelBtn +'">';
				break;
				case 'prompt':
				this.cfg.content += '<p class="window_promptInputWrapper"><input type="'
					+(this.cfg.isPromptInputPassword? "password":"text")
					+'" value="'+this.cfg.defaultValue4PromptInput
					+'" maxlength="'+this.cfg.maxlength4PromptInput
					+'" class="window_promptInput"/></p>';
				footerContent = '<input type="button" value="'
					+this.cfg.text4PromptBtn+'" class="window_promptBtn"/><input type="button" value="'
					+this.cfg.text4CancelBtn+'" class="window_cancelBtn"/>';
				break;
			}

			this.boundingBox = $(
				'<div class="window_boundingBox">' +
					'<div class="window_body">'+ this.cfg.content +'</div>' +
				'</div>'
			);
			if (this.cfg.winType != "common") {
				this.boundingBox.prepend('<div class="window_header">'+ this.cfg.title +'</div>');
				this.boundingBox.append('<div class="window_footer">'+ footerContent +'</div>');
			}
			if (this.cfg.hasMask) {
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo('body');
			}
			if (this.cfg.hasCloseBtn) {
				this.boundingBox.append('<span class="window_closeBtn">&Chi;</span>');
			}
			this.boundingBox.appendTo(document.body);
			this._promptInput = this.boundingBox.find('.window_promptInput');
		},
		bindUI: function() {
			var that = this;
			this.boundingBox.delegate(".window_alertBtn","click",function() {
				that.fire("alert");
				that.destroy();
			}).delegate(".window_closeBtn","click",function() {
				that.fire("close");
				that.destroy();
			}).delegate(".window_confirmBtn","click",function() {
				that.fire("confirm");
				that.destroy();
			}).delegate(".window_cancelBtn","click",function() {
				that.fire("cancel");
				that.destroy();
			}).delegate('.window_promptBtn', 'click', function() {
				that.fire("prompt", that._promptInput.val());
				that.destroy();
			});
			if (this.cfg.handler4AlertBtn) {
				this.on("alert", this.cfg.handler4AlertBtn);
			}
			if (this.cfg.handler4CloseBtn) {
				this.on("close", this.cfg.handler4CloseBtn);
			}
			if (this.cfg.handler4ConfirmBtn) {
				this.on("confirm", this.cfg.handler4ConfirmBtn);
			}
			if (this.cfg.handler4CancelBtn) {
				this.on("cancel", this.cfg.handler4CancelBtn);
			}
			if (this.cfg.handler4PromptBtn) {
				this.on("prompt", this.cfg.handler4PromptBtn);
			}
		},
		syncUI: function() {
			this.boundingBox.css({
				'width': this.cfg.width + 'px',
				'height': this.cfg.height + 'px',
				'left': (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
				'top': (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px',
			});
			if (this.cfg.skinClassName) {
				this.boundingBox.addClass(this.cfg.skinClassName);
			};
			if (this.cfg.isDraggable) {
				if (this.cfg.dragHandle) {
					this.boundingBox.draggable({handle:this.cfg.dragHandle});
				}else {
					this.boundingBox.draggable();
				}
			}
		},
		destructor: function() {
			this._mask && this._mask.remove();
		},

		alert: function(cfg) {
			$.extend(this.cfg,cfg,{winType:"alert"});
			this.render();
			return this;//为了连缀
		},
		confirm: function(cfg) {
			$.extend(this.cfg,cfg,{winType:"confirm"});
			this.render();
			return this;
		},
		prompt: function(cfg) {
			$.extend(this.cfg, cfg, {winType: "prompt"});
			this.render();
			this._promptInput.focus();
			return this;
		},
		common: function(cfg) {
			$.extend(this.cfg,cfg,{winType:"common"});
			this.render();
			return this;
		}



		// //观察者模式
		// //添加
		// on: function(type, handler) {
		// 	if (typeof this.handlers[type]=="undefined") {
		// 		this.handlers[type] = [];
		// 	}
		// 	this.handlers[type].push(handler);
		// 	return this;
		// },
		// //触发
		// fire: function(type, data) {
		// 	if (this.handlers[type] instanceof Array) {
		// 		var handlers = this.handlers[type];
		// 		for(var i=0; i<handlers.length; i++) {
		// 			handlers[i](data);
		// 		}
		// 		this.handlers[type].length=0
		// 	}
		// },
	});

	return {
		Window: Window
	}
})