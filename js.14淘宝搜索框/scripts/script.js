var getDOM = function(id){
return document.getElementById(id);
}
 
var addEvent = function(id, event, fn){
var el = getDOM(id) || document;
if(el.addEventListener){
el.addEventListener(event, fn, false);
}else{
el.attachEvent('on'+event, fn);
}
}
 
// 添加个变量用于保存当前选择的Tab，这样当鼠标离开时，选择的也是保存的Tab
var curSelected = "tab_1";
 
// 创建一个函数，用于互斥选择
function selectTab(id) {
    if(id == "tab_1"){
        getDOM("tab_2").className = '';
    }
    else{
        getDOM("tab_1").className = '';
    }
    getDOM(id).className = 'selected';
}
 
addEvent('search-tab', 'mouseover', function(){
    if(this.className.indexOf('trigger-hover') < 0){
        this.className+= ' trigger-hover';
    }
});
addEvent('search-tab', 'mouseout', function(){
    getDOM('search-tab').className = 'search-box';
    selectTab(curSelected);
});
 
addEvent('tab_1', 'mouseover', function(){
    selectTab('tab_1');
});
 
addEvent('tab_2', 'mouseover', function(){
    selectTab('tab_2');
});
 
addEvent('tab_1', 'click', function(){
    curSelected = 'tab_1';
    selectTab(curSelected);
    getDOM('search-tab').className = 'search-box';
});
addEvent('tab_2', 'click', function(){
    curSelected = 'tab_2';
    selectTab(curSelected);
    getDOM('search-tab').className = 'search-box';
});
 