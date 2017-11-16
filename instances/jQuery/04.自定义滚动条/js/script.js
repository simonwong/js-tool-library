(function(win, doc, $) {
	function CusScrollBar(options) {
		this._init(options);
	}
	$.extend(CusScrollBar.prototype, {
		_init: function(options) {
			var self = this;
			self.options = {
				scrollDir: "y", //滚动的方向
				contentSelector: "", //滚动内容区选择器
				barSelector: "", //滚动条选择器
				sliderSelector: "", //滚动滑块儿选择器
				tabItemSelector : ".tab-item",//标签选择器
				tabActiveClass :"tab-active",//选中标签状态
				anchorSelector :".anchor",//锚点选择器
				correctSelector:".correct-bot",//校正元素
				articleSelector:".scroll-ol",//文章选择器
				wheelStep     : 20//滚轮步长
			}
			$.extend(true, self.options, options || {});
			// console.log(self.options);
			self._initDomEvent();
			return self;
		},
		/**
		 * 初始化DOM引用
		 * @method _initDomEvent
		 * @return {CusScrollBar}
		 */
		_initDomEvent : function() {
			var opts = this.options;

			//滚动内容区对象，必填项
			this.$cont = $(opts.contentSelector);
			//滚动条滑块儿对象，必填项
			this.$slider = $(opts.sliderSelector);
			//滚动条对象
			this.$bar = opts.barSelector ? $(opts.barSelector) : self.$slider.parent();
			//标签项
			this.$tabItem = $(opts.tabItemSelector);
			//锚点项
			this.$anchor = $(opts.anchorSelector);
			//获取文档对象
			this.$doc = $(doc);
			//校正元素
			this.$correct = $(opts.correctSelector);
			//正文
			this.$article = $(opts.articleSelector);
			
			this._initArticleHeight()._initSliderDragEvent()._bindContScroll()._bindMouseWheel()._initTabEvent();
		},
		
		/**
		 *初始化文档高度
		 * @return {[Object]}  [this]
		 */
		_initArticleHeight : function(){
			var self = this,
				lastArticle = self.$article.last();
			var lastArticleHeight = lastArticle.height(),
				contHeight = self.$cont.height();
			if(lastArticleHeight < contHeight){
				self.$correct[0].style.height = contHeight - lastArticleHeight - self.$anchor.outerHeight() + "px";
			}
			return self;
		},
		
		/**
		 *初始化滑块拖动功能
		 * @return {[Object]}  [this]
		 */
		_initSliderDragEvent : function() {
			var self = this,
				slider = self.$slider,
				sliderEl = slider[0];
			if(sliderEl) {
				var doc = self.$doc,
					dragStartPagePosition,
					dragStartScrollPosition,
					dragContBarRate;

				function mousemoveHandler(e) {
					e.preventDefault();
					if(dragStartPagePosition == null) {
						return;
					}
					self.scrollTo(dragStartScrollPosition + (e.pageY - dragStartPagePosition) * dragContBarRate);
				}

				slider.on("mousedown", function(e) {
					e.preventDefault();
					// console.log("mousedown");
					dragStartPagePosition = e.pageY;
					dragStartScrollPosition = self.$cont[0].scrollTop;
					dragContBarRate = self.getMaxScrollPosition() / self.getMaxSliderPosition();
					doc.on("mousemove.scroll", mousemoveHandler
					).on("mouseup.scroll", function(e) {
						doc.off(".scroll");
					});
				});
			}
			return self;
		},
		
		/**
		 *初始化标签切换功能
		 * @return {[Object]}  [this]
		 */
		_initTabEvent : function(){
			var self = this;
			self.$tabItem.on("click",function(e){
				e.preventDefault();
				// alert("切换成功");
				var index = $(this).index();
				self.changeTabSelect(index);
				self.scrollTo(self.$cont[0].scrollTop + self.getAnchorPosition(index));
			});
			return self;
		},
		//切换标签的选中
		changeTabSelect : function(index){
			var self = this,
				active = self.options.tabActiveClass;
			return self.$tabItem.eq(index).addClass(active).siblings().removeClass(active);
		},
		//获取切换高度
		getAnchorPosition : function(index){
			return this.$anchor.eq(index).position().top;
		},
		
		//获取每个锚点位置信息的数组
		getAllAnchorPosition : function(){
			var self = this,
				allPositionArr = [];
				for(var i=0;i<self.$anchor.length;i++){
					allPositionArr.push(self.$cont[0].scrollTop + self.getAnchorPosition(i));
				}
			return allPositionArr;
		},
		
		//监听内容的滚动，同步滑块儿的位置
		_bindContScroll : function(){
			var self = this;
			self.$cont.on("scroll",function(){
				var sliderEl = self.$slider && self.$slider[0];
				if(sliderEl){
					sliderEl.style.top = self.getSliderPosition() + "px";
				}
			});
			return self;
		},
		
		_bindMouseWheel : function(){
			var self = this;
			self.$cont.on("mousewheel DOMMouseScroll",function(e){
				e.preventDefault();
				var oEv = e.originalEvent,
					wheelRange = oEv.wheelDelta ? -oEv.wheelDelta/120 : (oEv.detail || 0)/3;
					self.scrollTo(self.$cont[0].scrollTop + wheelRange*self.options.wheelStep);
			//这里如果一直滚动鼠标轮，那么会一直scrollTo(),到了最下面的时候，也就是滑块儿滚动到最底部的时候，
			//滚动条会根据这句话Math.min(maxSliderPosition,maxSliderPosition * self.$cont[0].scrollTop / self.getMaxScrollPosition());
			//决定是否继续滚动
			//每次滚动鼠标轮，会触发_bindContScroll中的on，on、中又调用self.getSliderPosition()，
			//所以滑块儿滚动到最后，再滚向后动鼠标轮滑块儿也不会动。但是内容是怎么停止的呢，
			//因为此时mousedown.on()函数并没有被触发，即便触发了，在最后mouseup也解除了对函数的绑定。
			//所以这里的函数我们调用不到，那为什么内容会停止滚动呢，
			//因为scrollTop的值到达最大之后，是不会再改变的。例如当前页面中，scrollTop最大值为812，
			//我们设置$(".scroll-cont").scrollTop(8120);是没有用的，打印出$(".scroll-cont").scrollTop();的值，还是812
			});
			return self;
		},
		//计算滑块儿的当前位置
		getSliderPosition : function(){
			var self = this,
			maxSliderPosition = self.getMaxSliderPosition();
			return Math.min(maxSliderPosition,maxSliderPosition * self.$cont[0].scrollTop / self.getMaxScrollPosition());
		},
		//内容可滚动的高度
		getMaxScrollPosition: function() {
			var self = this;
			return Math.max(self.$cont.height(), self.$cont[0].scrollHeight) - self.$cont.height();
		},
		//滑块儿可移动距离
		getMaxSliderPosition: function() {
			var self = this;
			return self.$bar.height()-self.$slider.height();
		},
		scrollTo: function(positionVal) {
			var self = this;
			var posArr = self.getAllAnchorPosition();
			//滚动条的位置与tab标签的对应
			function getIndex(positionVal){
				for(var i = posArr.length-1;i >= 0;i--){
					if(positionVal >= posArr[i]){
						return i;
					}else{
						continue;
					}
				}
			}
			//锚点数与标签数相同
			if(posArr.length == self.$tabItem.length){
				self.changeTabSelect(getIndex(positionVal));
			}
			self.$cont.scrollTop(positionVal);
		}
	});
	win.CusScrollBar = CusScrollBar;
})(window, document, jQuery);

var scroll = new CusScrollBar({
	contentSelector: ".scroll-cont", //滚动内容区选择器
	barSelector: ".scroll-bar", //滚动条选择器
	sliderSelector: ".scroll-slider" //滚动滑块儿选择器
});
