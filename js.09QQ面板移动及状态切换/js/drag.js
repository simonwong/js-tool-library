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
//拖曳
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
  //设置可移动最大范围
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

//切换状态
function loginState(){
  var state = document.getElementById("loginState");
  state.onclick = stateShow;
}
function stateShow(event){
  //阻止事件冒泡为了在空白处onclick，也能隐藏
  event = event || window.event;
      if (event.stopPropagation) {
            event.stopPropagation();
          }else{
            event.cancleBuble();
          }
  var statePanel = document.getElementById("loginStatePanel");
  //显示状态选择
  statePanel.style.display = "block";
  var panelList = getByClass("statePanel_li","loginStatePanel");
  for(var i=0 ; i<panelList.length; i++){
    //鼠标经过
    panelList[i].onmouseover = function(){
      this.style.backgroundColor = "#ccc";
    }
    //鼠标离开
    panelList[i].onmouseout = function(){
      this.style.backgroundColor = "#fff";
    }
    //鼠标按下
    panelList[i].onclick = function(event){
      //此处再点击时none，冒泡到外面，外面已经显示block，导致无法隐藏，所以要阻止事件冒泡
      event = event || window.event;
      if (event.stopPropagation) {
            event.stopPropagation();
          }else{
            event.cancleBuble();
          }
      statePanel.style.display = "none";
      var showPic  = document.getElementById("loginStateShow"),
          showTxt =document.getElementById("login2qq_state_txt"),
          id = this.id
      showPic.className = " ";
      showPic.className = "login-state-show " + id;
      showTxt.innerHTML = getByClass("stateSelect_text",id)[0].innerHTML;
    }
    //在外部点击时，也能隐藏
    window.onclick = function(){
      statePanel.style.display = "none";
    }
  }
}
function closeBox(){
  var close = document.getElementById("ui_boxyClose");
  close.onclick = function(){
    var loginPanel = document.getElementById("loginPanel");
    loginPanel.style.display = "none";
  }
}
addLoadEvent(drag);
addLoadEvent(loginState);
addLoadEvent(closeBox);
