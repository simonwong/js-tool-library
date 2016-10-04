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

function drag(){
  var oTitle = getByClass("login_logo_webqq","loginPanel")[0];
  // 该区域鼠标按下是的动作
  oTitle.onmousedown=fnDown;

}
// 按下的动作
function fnDown(event){
  // 获取光标位置
  var oDrag=document.getElementById("loginPanel");
  var disX = event.clientX - oDrag.offsetLeft;
  var disY = event.clientY - oDrag.offsetTop;
  document.onmousemove = function(event){
    event = event || window.event;
    fnMove(event,disX,disY);
  }
  // 释放鼠标
  document.onmouseup = function(){
    document.onmousemove = null;
    document.onmouseup=null;
  }
}
// 移动时的动作
function fnMove(e,X,Y){
  var oDrag=document.getElementById("loginPanel"),
      mX = e.clientX - X,
      mY = e.clientY - Y,
      winW = document.documentElement.clientWidth || document.body.clientWidth,
      winH = document.documentElement.clientHeight || document.body.clientHeight,
      maxW = winW - oDrag.offsetWidth - 10,
      maxH = winH - oDrag.offsetHeight;

  if (mX < 0){
    mX = 0
  }else if (mX > maxW){
    mX = maxW
  }
  if (mY <0){
    mY = 0
  }else if (mY >maxH){
    mY = maxH
  }
  oDrag.style.left = mX+"px";
  oDrag.style.top = mY+"px";
}
addLoadEvent(drag)