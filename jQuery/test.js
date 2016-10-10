//元素选择器
$(document).ready(function(){
	$("button").click(function(){
		$("p").hiden();
	});
});
//id选择器
$(document).ready(function(){
	$("button").click(function(){
		$("#test").hiden();
	});
});
//.class选择器
$(document).ready(function(){
	$("button").click(function(){
		$(".test").hiden();
	})
})
$(this)//当前元素
$("*")//所有元素
$("p.intro")//class名为intro的<p>元素
$("p:first")//选取第一个
$("ul li:first")//第一个ul中的第一个li
$("ul li:first-child")//每一个ul中的第一个li
$("[href]")//带有href属性的元素
$("a[target='_blank']")//所有target属性为_blank的a
$("a[target!='_blank']")//所有targrt属性不是_blank的a
$(":button")//所有type="button"的input和button
$("tr:odd")//奇数位置的tr
$("tr:even")//偶数位置的tr

//============================================================================================

//常用事件方法
$(document).ready()//加载完后执行
click()//点击
dbclick()//双击
mouseenter()//指针划过
mouseleave()//指针离开
mousedown()//鼠标按下
mouseup()//鼠标松开
hover()//模拟光标悬停，先后出发mouseenter,mouseleave
focus()//当元素获得焦点时
blur()//当元素失去焦点时

//============================================================================================

//jQuery效果,speed隐藏显示的速度，"solw","fast",或毫秒;callback隐藏显示完成后所执行的函数名称
//隐藏显示
$(selector).hide(speed,callback);
			show();
			toggle();//切换hide()和show()方法，显示隐藏的，隐藏显示的

//淡入淡出
$(selector).fadeIn(speed,callback);//淡入
			fadeOut();//淡出
			fadeToggle();//来回切换
$(selector).fadeTo(speed,opacity,callback);//渐变给定的不透明度。opacity介于0与1之间

//滑动
$(selector).slideDown(speed,callback);//下滑
			slideUp();//上滑
			slideToggle();//来回切换

//动画
$(selector).animate({params},speed,callback);//必需的参数params，定义形成动画的CSS属性
$("button").click(function(){
	$("div").animate({
		left:'250px',	//定义位置需要先position
		height:'+=150px'//可以定义相对值
	})
})
$("button").click(function(){
	$("div"),animate({
		height:'toggle'//使用预定义的值
	})
})
$("button").click(function(){
  var div=$("div");
	  div.animate({height:'300px',opacity:'0.4'},"slow");
	  div.animate({width:'300px',opacity:'0.8'},"slow");
	  div.animate({height:'100px',opacity:'0.4'},"slow");
	  div.animate({width:'100px',opacity:'0.8'},"slow");
}); //列队功能会逐行调用

//停止动画
$(selector).stop(stopAll,gotoEnd);
//停止当前的动画，stopAll，停止列队的所有动画，gotoEnd立即完成动画

//callback回调函数
$("button").click(function(){
	$("p").hide("slow",function(){
		alert("The paragragh is now hidden");
	})
})

//chaining,可以把动作或方法链接在一起
$("#p1").css("color","red").slideUp(2000).slideDown(2000);

//============================================================================================

//jQuery HTML
//捕获
$("#test").text()//设置或返回文本内容
			html()//内容，包括html标记
			val()//表单字段的值
			attr()//获取属性

//设置内容
text()、html()、val()//方法设置内容
$("#btn1").click(function(){
	$("#text1").text("Hello World!");//把id为text1的元素的文本内容设置为
});
//他们的回调函数
$("#btn1").click(function(){
	$("#text1").text(function(i,origText){
		return "旧文本：" + origText + " 新文本：Hello World! (index:" + i + ")"
	});
});
//设置属性
$("button").click(function(){
	$("#runoob").attr("href","http://www.runoob.com/jQuery");
})
//也可以设置多条属性
$("button").onclick(function(){
	$("#runoob").attr({
		"href" : "http://www.runoob.com/jQuery",
		"titile" : "jQuery"
	})
});

//添加元素
append()//被选元素的结尾插入内容
prepend()//被选元素的开头插入内容
after()//被选元素之后
before()//被选元素之前
$("p").append("我是新添加的内容");
function appendText(){
	var txt1 = "<p>文本。</p>";				//使用HTML标签创建
	var txt2 = $("<p></p>").text("文本。");	//使用jQuery
	var txt3 = document.createElement("p");
	txt3.innerHTML = "文本。";				//使用DOM
	$("body").append(txt1,txt2,txt3)		//追加新元素
}

//删除元素，内容
remove();//删除被选元素包括子元素
empty();//被选元素的删除子元素
$("p").remove(".italic");//阐述class为italic的所有p元素

//操作css
addClass();//向被选元素添加一个或多个类
removeClass();//删除
toggleClass();//添加删除切换
$("button").click(function(){
	$("#div").addClass("border blue");
	$("p,h1,h2").removeClass("red")
})

css()//设置或返回样式属性
$("p").css("background-color");//返回css属性
$("p").css("background-color","blue");
$("p").css("background-color":"blue","font-size":"24px")//设置

//jQuery尺寸方法
width();//包括element的宽度
innerWidth();//包括padding，element的宽度
outerWidth();//包括border，padding，element
height();
innerHeight();
outerHeight();

//============================================================================================

//jQuery遍历
parent();//返回里面的直接父元素
parents();//返回里面的所有父元素
parentsUntil();//返回元素与里面的之间的所有父元素
$("span").parentsUntil("div");//span到div之间所有的父元素

children();//所有直接子元素
$("div").children("p.1")//div下class为1的所有p
find();//所有子元素
$("div").find("span");//div下的所有span元素
$("div").find("*");//div下的所有子元素

siblings();//所有同胞元素
next();//下一个
nextAll();//所有跟随的
nextUntil();//介于元素和之间的所有
prev();
prevAll();
prevUntil();

//遍历过滤
first();
last();
eq();
filter();
not();
$("div p").first();//首个div下的第一个p
$("div").eq(1);//选取第二个div，1为索引号。第一个是0；
$("div").filter(".url");//class为url的所有div
$("div").not(".url");//class不为url的所有div

//============================================================================================