define(['jquery'],function($){
	//面向对象
	//创建一个构造函数，构造函数首字母大写来区分普通函数
	function ScrollTo(opts){
		//将用户传递进来的参数opts去覆盖默认参数ScrollTo.DEFAULTS
		// 生成一个新的对象，然后返回出来的值用属性保存
		this.opts = $.extend({},ScrollTo.DEFAULTS,opts);
		this.$el = $("html,body");
	}
	// 将所有方法添加在构造函数的原型上，可以使内存中只保存一份方法
	ScrollTo.prototype.move = function() {
		var opts = this.opts,
			dest = opts.dest;
		//判断是否到达目的地，判断是否在运动
		if ($(window).scrollTop() != dest) {
			if (!this.$el.is(":animated")) {
				this.$el.animate({
					scrollTop: dest
				},opts.speed);
			}
		}	
	};
	ScrollTo.prototype.go = function() {
		var dest = this.opts.dest
		if ($(window).scrollTop() != dest) {
			this.$el.scrollTop(dest);
		}	
	};
	// 默认参数
	ScrollTo.DEFAULTS = {
		dest : 0,
		speed : 800
	};
	//返回定义好的模块
	return {
		ScrollTo: ScrollTo
	}

})