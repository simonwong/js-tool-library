$(document).ready(function(){
	//滚动条
	$(window).scroll(function(){
		var top = $(document).scrollTop();
		var menu = $("#menu");
		var items = $("#content").find(".item");
		var currentId = "";//当前所在楼层的item #id
		items.each(function(){
			var m = $(this);
			var itemTop = m.offset().top;
			if (top > itemTop - 200) {
				currentId = "#" + m.attr("id");
			}else{
				return false;
			}
		})

		var currentLink = menu.find(".current");
		if (currentId && currentLink.attr("href") != currentId) {
			currentLink.removeClass("current");
			menu.find("[href=" + currentId + "]").addClass("current");

		}


	})
})