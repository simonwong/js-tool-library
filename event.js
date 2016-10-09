//window.onload
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
//把一个节点插入到一个节点的后面
function insertAfter(newElement,targetElement){
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  }else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}
//获取class
function addClass(element.value){
	if(!element.className){
		element.className = value;
	}else {
		newClassName = element.className;
		newClassName+= " ";
		newClassName+= value;
		element.className = newClassName;
	}
}
//给特定元素紧跟的下一个元素添加class
function styleElementSibilings(tag.theclass){
	if (!document.getElementsByTagName) return false;
	var elems = document.getElementsByTagName(tag);
	var elem;
	for (var i=0; i<elems.length; i++){
		elem = getNextElement(elems[i].nextSibling);
		addClass(elem,theclass);
	}
}
//获取class
function getByClass(className,parent){
  var oParent = parent? document.getElementById(parent) : document;
  var eles = [];
  var elements = oParent.getElementsByTagName("*");
  for (var i=0;i<elements.length;i++){
    if(elements[i].className == className){
      eles.push(elements[i]);
    }
  }
  return eles;
}
//获取样式
function getStyle(obj,attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr];//针对IE浏览器
  }else{
    return getComputedStyle(obj,false)[attr];//针对火狐浏览器
  }
}
//移动效果，向左右上下移动
function moveElement(elementID,final_x,final_y,interval){
  if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
  var dist = 0;
	if (xpos == final_x && ypos == final_y){
		return true;
	}
	if (xpos < final_x){
    dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if (xpos > final_x){
    dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if (ypos < final_y){
    dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
	}if (ypos > final_y){
    dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}
//物体长，宽，透明度等等的运动
function startMove(obj,json,fn){
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    var flag = true//假设
    for (var attr in json){
      //1取当前的值
      var iCur = 0;
      if (attr == "opacity"){
        iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
      }else{
        iCur = parseInt(getStyle(obj,attr));
      }
      //2算速度
      var iSpeed = (json[attr] - iCur)/10;
      iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      //3如果运动还没完全走完，flag假设不成立，继续
      if(iCur != json[attr]){
        flag = false;
      }
      //执行
      if (attr == "opacity") {
        obj.style.filter = 'alpha(opacity:'+(iCur + iSpeed)+')';
        obj.style.opacity = (iCur + iSpeed)/100;
      }else{
        obj.style[attr] = iCur + iSpeed + "px";
      }
    }
    //如果flag成立，停止
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        fn();
      }
    }
    
  },30)
}

//添加一个事件监听程序，进行“能力检测”
function addHandler:(element,type,handler){
  if(element.addEventListener){
    element.addEventListener(type,handler,false);//dom2级事件处理
  }else if(element.attachEvent){
    element.attachEvent("on"+type,handler);//IE级事件处理
  }else{
    element["on"+type]=handler;//dom0级;;;;element.type===element[type];这里因为中间有+,所有用了[]
  }
}
//，删除一个时事件监听程序
function removeHandler(element,type,handler){
  if(element.removeEventListener){
    element.removeEventListener(type,handler,false);
  }else if(element.detachEvent){
    element.detachEvent("on"+type,handler);
  }else{
    element["on"+type]=null;
  }
}
//兼容所有浏览器的事件对象
function getEvent(event){
  return event?event:window.event;
}
//获取事件的类型
function getType(event){
  return event.type;
}
//获取来自于哪个元素
function getElement(event){
  return event.target||event.srcElement;
}
//取消事件的默认行为
function preventDefault(event){
  if (event.preventDefault) {
    event.preventDefault();
  }else{
    event.returnValue=false;
  }
}
//阻止事件冒泡
function stopPropagation(event){
  if (event.stopPropagation) {
    event.stopPropagation();//非IE
  }else{
    event.cancleBuble();//IE
  }
}



