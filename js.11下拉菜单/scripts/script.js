window.onload=function(){
    var box=document.getElementById('divselect'),//整个
    title=box.getElementsByTagName('cite')[0],//请选择分类
    menu=box.getElementsByTagName('ul')[0],//ul
    as=box.getElementsByTagName('a'),
    index=-1;
    // 点击三角时
    for (var i=0;i<as.length;i++){
        as[i].style.backgroundColor = "#fff";
    }
    title.onclick=function(event){
    // 执行脚本
        event = event || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        }else{
            event.cancleBuble();
        }
        menu.style.display = "block";
        for (var i=0;i<as.length;i++){
            //鼠标经过
            as[i].onmouseover = function(){
                this.style.backgroundColor = "#999";
                index = this.getAttribute('selectid') - 1
            }
            //鼠标离开
            //鼠标点击
            as[i].onclick = function(event){
                title.innerHTML = this.innerHTML
                menu.style.display = "none";
                //阻止事件冒泡
                event = event || window.event;
                if (event.stopPropagation) {
                    event.stopPropagation();
                }else{
                    event.cancleBuble();
                }
            }
            window.onclick = function(){
            menu.style.display = "none";
            }
        }
    }
    //键盘事件，上38，下40，回车13
    document.onkeyup = function(event){
        event = event || window.event;
        for (var i=0;i<as.length;i++){
        as[i].style.backgroundColor = "#fff";
        }
        if (event.keyCode == 40) {
            index ++
            if (index >as.length-1) {
                index = 0
            }
            as[index].style.backgroundColor = "#999"
        }
        if (event.keyCode == 38) {
            index --;
            if(index < 0){
                index = as.length - 1
            }
            as[index].style.backgroundColor = "#999"
        }
        if (event.keyCode == 13) {
            title.innerHTML = as[index].innerHTML
            menu.style.display = "none";
            index = -1;
        }
    }
}