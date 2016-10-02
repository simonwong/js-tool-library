function getNewContent() {
	var request = getHTTPObject();
	if (request){
		request.open("GET","example.txt",true);
		//GET请求，请求ajax.html文件同目录的example.txt文件
		request.onreadystatechange = function(){
		//事件处理函数，会在服务器给XMLHttpRequest对象送回响应的时候被执行
			if(request.readyState == 4){
				//alert("Response Received");
				//证明异步性，XMLHttpRequest请求后仍会继续执行不会等待响应返回
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				//responseText属性用于保存文本字符串形式的数据
				para.appendChild(txt);
				document.getElementById('new').appendChild(para);
			}
		};
		request.send(null);
	}else{
		alert('Sorry,your browser doesn\'t support XMLHttpRequest');
	}
	// alert("Function Done");证明异步性
}
addLoadEvent(getNewContent);

// 使用Ajax是注意同源策略；；
// 另外有些浏览器会限制Ajax请求使用，
// 在Chrome中，从自己硬盘里加载example.txt，会看到跨域请求只支持HTTP协议的错误消息