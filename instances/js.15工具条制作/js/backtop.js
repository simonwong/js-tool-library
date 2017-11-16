define(['jquery',"scrollto"],function($,scrollto){
	function BackTop(el,opts){
		this.opts = $.extend({},BackTop.DEFAULTS,opts);
		this.$el = $(el);
		this.scroll = new scrollto.ScrollTo({
			dest: this.opts.dest,
			speed: this.opts.speed
		})
		if (this.opts.mode == "move") {
			this.$el.on("click",$.proxy(this._move,this));//下划线是指此处方法仅供内部使用，不是提供给用户的API
		}else{
			this.$el.on("click",$.proxy(this._go,this));
		}
		$(window).on("scroll",$.proxy(this._checkPosition,this));
		// $(window).ready($.proxy(this._checkPosition,this));
		//加载完时执行，bug是在顶部刷新，按钮会闪烁
		//但是不添加的话，bug是在顶部刷新，按钮不会隐藏
	}
	BackTop.DEFAULTS = {
		mode: "move",
		pos:$(window).height()
	};
	BackTop.prototype._move = function(){
		this.scroll.move();
	};
	BackTop.prototype._go =function(){
		this.scroll.go();
	};
	BackTop.prototype._checkPosition =function(){
		var $el = this.$el;//使用局部变量速度快于

		if($(window).scrollTop() > this.opts.pos){
			$el.fadeIn();
		}else{
			$el.fadeOut();
		}
	};

	// 把模块注册成jQuery插件
	$.fn.extend({
		// 命名
		backtop: function(){
			return this.each(function(){
				new BackTop(this,opts);
			});
			//因为这次是id选择器，如果遇到class选择器，需要遍历，返回this
		}
	})

	return{
		BackTop:BackTop
	}
})