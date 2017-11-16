/**
 * window.onload
 * @param {function}
 */
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
/**
 * 把一个节点插入到一个节点的后面
 * @param  {newElement}
 * @param  {targetElement}
 */
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
/**
 * 添加class
 * @param {element, value}
 */
function addClass(element, value){
    if(!element.className){
        element.className = value;
    }else {
        newClassName = element.className;
        newClassName+= " ";
        newClassName+= value;
        element.className = newClassName;
    }
}
/**
 * 给特定元素紧跟的下一个元素添加class
 * @param  {className}
 * @return {}
 */
function styleElementSibilings(tag.theclass){
    if (!document.getElementsByTagName) return false;
    var elems = document.getElementsByTagName(tag);
    var elem;
    for (var i=0; i<elems.length; i++){
        elem = getNextElement(elems[i].nextSibling);
        addClass(elem,theclass);
    }
}
/**
 * 获取class
 * @param  {className}
 * @param  {parent}
 * @return { }
 */
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
/**
 * 获取样式
 * @param  {object}
 * @param  {attr}
 * @return {style}
 */
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];//针对IE浏览器
    }else{
        return getComputedStyle(obj,false)[attr];//针对火狐浏览器
    }
}
/**
 * 移动效果，向左右上下移动
 * @param  {elementID}
 * @param  {final_x}
 * @param  {final_y}
 * @param  {inerval}
 * @return {}
 */
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
/**
 * 物体长，宽，透明度等等的运动
 * @param  {object}
 * @param  {}
 * @param  {Function}
 * @return {}
 */
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
/**
 * 加入收藏
 * @param {url}
 * @param {url的title}
 */
function AddFavorite(sURL,sTitle){
    sURL = encodeURI(sURL);
    try{
        window.external.AddFavorite(sURL,sTitle);
    }
    catch(e){
        try{
            window.sidebar.addPanel(sTitle.sURL,"");
        }
        catch(e){
            alert("加入收藏失败，请使用Ctrl+D进行添加，或手动在浏览器里进行设置");
        }
    }
}
/**
 * 设为首页
 * @param {url}
 */
function SetHome(url){
    if(document.all){
        document.body.style.behavior = "url(#default#homepage)";
        document.body.stHomePage(url);
    }
    else{
        alert("您好，您的浏览器不支持自动设置页面为首页功能，请您手动在浏览器里设置页面为首页！")
    }
}

/**
 * 取消事件的默认行为
 * @param  {event}
 * @return {}
 */
function preventDefault(event){
    if (event.preventDefault) {
        event.preventDefault();
    }else{
        event.returnValue=false;
    }
}
/**
 * 阻止事件冒泡
 * @param  {event}
 * @return {}
 */
function stopPropagation(event){
    if (event.stopPropagation) {
        event.stopPropagation();//非IE
    }else{
        event.cancleBuble();//IE
    }
}

/**
 * 获取环境参数
 * @return {none}
 */
var platformFn = function() {
	var u = navigator.userAgent,
        app = navigator.appVersion;
    return {
        kebkit: u.indexOf('AppleWebkit') > -1,// 苹果、谷歌内核
        mobile: !!u.match(/AppleWebkit.*Mobile.*/),//是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),//ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,//android终端
        iPhone: u.indexOf('iPhone') > -1,//是否为iphone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1,//是否ipad
        webApp: u.indexOf('Safari') == -1,//是否web应用程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1//是否微信
    }
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





