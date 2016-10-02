function addLoadEvent(func){
  var oldonload = window.onload;
  if (typeof window.onload != 'function'){//如果处理函数未绑定任何函数，添加
    window.onload = func;
  }else {//如果已经有绑定的，在末尾追加
    window.onload = function(){
      oldonload();
      func();
    }
  }
}

function insertAfter(newElement,targetElement){//已有元素后插入新
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  }else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

function preparePlaceholder(){
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/team.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
}

function prepareGallery(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for ( var i=0; i<links.length; i++){
		links[i].onclick = function(){
			return showPic(this);
		}
		links[i].onkeypress = links[i].onclick;
	}
}

function showPic(whichpic){
	if (!document.getElementById("placeholder")) return false;
	var placeholder=document.getElementById("placeholder");
	var source = whichpic.getAttribute("href");
	placeholder.setAttribute("src",source);
	if (!document.getElementById("description")) return false;
	if (whichpic.getAttribute("tittle")){
		var text = whichpic.getAttribute("tittle");
	}else { var text = "";
	}
	var description=document.getElementById("description");
	if (description.firstChild.nodeType == 3){
		description.firstChild.nodeValue=text;
	}
	return false;
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);




