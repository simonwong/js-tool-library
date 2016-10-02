function displayAccesskeys(){
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	//取得文档所有链接
	var links = document.getElementsByTagName("a");
	//创建一个数组保存访问键
	var akeys = new Array();
	//遍历链接
	for(var i =0; i<links.length; i++){
		var current_link = links[i];
		//如果没有accesskey，继续循环
		if (!current_link.getAttribute("accesskey")) continue;
		//取得accesskey值
		var key = current_link.getAttribute("accesskey");
		//取得链接文本
		var text = current_link.lastChild.nodeValue;
		//添加到数组
		akeys[key] = text;
	}
	//创建列表
	var list = document.createElement("ul");
	//遍历访问建
	for (key in akeys){
		var text = akeys[key];
		//创建字符串
		var	str = key+":"+text;
		//创建列表项
		var item = document.createElement("li");
		var item_text = document.createTextNode(str);
		item.appendChild(item_text);
		list.appendChild(item);
	}
	//创建标题
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Accesskeys");
	header.appendChild(header_text);
	//放进标题
	document.body.appendChild(header);
	//放进列表
	document.body.appendChild(list);
}
addLoadEvent(displayAccesskeys);