window.onload=function(){
        var login_btn=document.getElementById('login'),
            login_box=document.getElementById('login_box'),
            close=document.getElementById('close');
        // 封装添加事件监听程序
        function addEvent(ele,type,hander){
           // 执行代码
           if(ele.addEventListener){
               ele.addEventListener(type,hander,false);
           }else if(ele.attachEvent){
               ele.attachEvent("on"+type,hander);
           }else{
               ele["on"+type]=hander;
           }
        }
        // 显示登录层函数
        function showLogin(){
          // 执行代码
            login_box.style.display="block";
        }
        // 隐藏登录层函数
        function hideLogin(){
          // 执行代码
          login_box.style.display="none";
        }
        //点击登录按钮显示登录层 
        // 执行代码
        addEvent(login,"click",showLogin);
        //点击关闭按钮隐藏登录层
        // 执行代码
        addEvent(close,"click",hideLogin);
}