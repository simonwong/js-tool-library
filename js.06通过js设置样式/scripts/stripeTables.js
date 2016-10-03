function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
 		window.onload = func;
	}else {
    window.onload = function(){
		oldonload();
    	func();
    }
  }
}
//改变奇数行的背景颜色
// function stripeTables(){
// 	if (!document.getElementsByTagName) return false;
// 	var tables = document.getElementsByTagName("table");
// 	var odd,rows;
// 	for (var i=0;i<tables.length;i++){
// 		odd = false;
// 		rows = tables[i].getElementsByTagName("tr");
// 		for (var j=0;j<rows.length;j++){
// 			if(odd==true){
// 				rows[j].style.backgroundColor = "#ffc";
// 				odd=false;
// 			}else{
// 				odd=true;
// 			}
// 		}
// 	}
// }

//添加class
function addClass(element,value){
	if (!element.className) {
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}
// 通过增加class改变奇数行背景颜色
function stripeTables(){
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	var odd,rows;
	for (var i=0;i<tables.length;i++){
		odd = false;
		rows = tables[i].getElementsByTagName("tr");
		for (var j=0;j<rows.length;j++){
			if(odd==true){
				addClass(rows[j],"odd");
				odd=false;
			}else{
				odd=true;
			}
		}
	}
}
//鼠标停悬，字体变粗
function highlightRows(){
	if (!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for (var i=0;i<rows.length;i++){
		rows[i].onmouseover = function(){
			this.style.fontWeight = "bold";
		}
		rows[i].onmouseout = function(){
			this.style.fontWeight = "normal";
		}
	}
}
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);