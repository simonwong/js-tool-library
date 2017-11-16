$("#search_input").bind("keyup",function(){
	var searchText = $(this).val();
	$.get("http://cn.bing.com/search?q=" + searchText ,function(d){
		//服务器里面拿到数据
		var d = d.AS.Results[0].Suggests;
		var html = "";
		for (var i=0;i<d.length;i++) {
			html += "<li>'+d[i].Txt+'</li>";
		}
		//把数据放进去
		$("search_result").html(html);

		$("#search_suggest").show().css({
			top:$("#search_form").offset().top + $("#search_form").height() +10,
			left:$("#search_form").offset().left,
			position:"absolute"
		});
	},"json");
});
// 在外面点击关闭搜索预览框
$(document).bind("click",function(){
	$("#search_suggest").hide();
})
// 使用事件代理，可以点搜索预览访问网页
$(document).delegate("li","click",function(){
	var keyword = $(this).text();
	location.href = "http://cn.bing.com/search?q=" + keyword;
});