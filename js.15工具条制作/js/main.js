requirejs.config({
	paths:{
		jquery: "jquery-3.1.1.min"
	}
});

requirejs(['jquery','backtop'],function($,backtop){
	new backtop.BackTop($("#backTop"),{
		mode:"move",
		dest:100,
		speed:1000
	})


	// //实例化
	// var scroll = new scrollto.ScrollTo({
	// 	//如果不填参数就会使用默认参数
	// 	dest: 0,
	// 	speed: 1000
	// });
	// //事件监听
	// $("#backTop").on("click",$.proxy(scroll.move,scroll));//调整指向为实例对象
	// //$("#backTop").on("click",scroll.move);因为move方法是返回顶部的事件处理函数所以指向#backTop


	// $(window).on("scroll",function(){
	// 	checkPosition($(window).height());
	// });

	// checkPosition($(window).height());
	// /*function move(){
	// 	$("html body").animate({
	// 		scrollTop:0
	// 	},800)
	// }
	// function go(){
	// 	$("html body").scrollTop(0);
	// }*/

	// function checkPosition(pos){
	// 	if ($(window).scrollTop() > pos) {
	// 		$("#backTop").fadeIn()
	// 	}else{
	// 		$("#backTop").fadeOut();
	// 	}
	// }
})