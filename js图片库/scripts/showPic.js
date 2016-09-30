function prepareGallery(){
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this) ? false : true;
			//?是三元操作符，variable = condition ? if true : if false;相当于if/else语句
		}
	}
}
window.onload=prepareGallery;
function showPic(whichpic){
	//假设id为placeholder不存在
	if (!document.getElementById("placeholder")) return false;
	var placeholder=document.getElementById("placeholder");
	var source = whichpic.getAttribute("href");
	//假设placeholder的节点名称不是img，nodeName返回的是大写
	if (placeholder.nodeName != "IMG") return false;
	placeholder.setAttribute("src",source);
	//假设id为description不存在
	if (document.getElementById("description")) {
		//假设whichpic的tittle属性不存在
		var text = whichpic.getAttribute("tittle") ? whichpic.getAttribute("tittle") : "";
		var description=document.getElementById("description");
		//如果description的第一个子节点的类型是3，即文本节点？ 1是元素，2是属性。
		if (description.firstChild.nodeType == 3){
			description.firstChild.nodeValue=text;
		}
	}
	return true;
}
