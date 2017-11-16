window.onload = function() {
	var allInput = document.getElementsByTagName('input'),
		userName = allInput[0],
		pw = allInput[1],
		repw = allInput[2],
		name_tip = document.getElementById('tip1'),
		pw_tip = document.getElementById('tip2'),
		repw_tip = document.getElementById('tip3'),
		count1 = document.getElementById('cou1'),
		count2 = document.getElementById('cou2'),
		allem = document.getElementsByTagName('em'),
		name_length = 0;

	//1、数字 字母（部分大小写）下划线\w,汉字\u4e00-\u9fa5、
	//2、5-25个字符，推荐使用中文名

	

	//用户名

	userName.onfocus = function() {
		name_tip.style.display = 'inline-block';
		name_tip.innerHTML = "6-25个字符，一个汉字为两个字符，推荐使用中文会员名"
	}
	userName.onkeyup = function() {
		count1.style.visibility = 'visible';
		name_length = getLength(this.value);
		count1.innerHTML = name_length + '个字符';
		if (name_length == 0) {
			count1.style.visibility = 'hidden';
		}
	}
	userName.onblur = function() {
		var re = /[^\w\u4e00-\u9fa5]/g;
		if (re.test(this.value)) {
			//含有非法字符
			name_tip.innerHTML = "含有非法字符！"
		}else if (this.value == '') {
			//不能为空
			name_tip.innerHTML = "不能为空！"
		}else if (name_length > 25) {
			//长度超过25
			name_tip.innerHTML = "长度超过25个字符！"
		}else if (name_length < 6) {
			//少于6
			name_tip.innerHTML = "长度少于6个字符！"
		}else{
			name_tip.innerHTML = "OK!"
		}
	}


	//密码
	pw.onfocus = function() {
		pw_tip.style.display = "inline-block";
		pw_tip.innerHTML = "6-16个字符，请使用字母加数字组合密码"
	}
	pw.onkeyup = function() {
		count2.style.visibility = 'visible';
		//大于8个字符中
		if(this.value.length<8) {
			allem[1].className = "";
			allem[2].className = "";
		}else if (this.value.length>8 &&this.value.length<12) {
			allem[2].className = "";
			allem[1].className = "active";
		}else if (this.value.length>12) {
			allem[1].className = "active";
			allem[2].className = "active";
		}
		if(this.value.length <= 5){
			repw.setAttribute('disabled','disabled');
		}else if(this.value.length > 5){
			repw.removeAttribute("disabled");
			repw_tip.style.display = "inline-block";
		}
	}
	pw.onblur = function() {
		var m = findStr(pw.value,pw.value[0]);
		var re_n = /[^\d]/g;
		var re_t = /[^a-zA-Z]/g;

		if (this.value == '') {
			pw_tip.innerHTML = "不能为空！"
		}else if(m == this.value.length) {
			pw_tip.innerHTML = "不能使用相同字符！"
		}else if (this.value.length<6 || this.value.length>16) {
			pw_tip.innerHTML = "长度应为6-16个字符！";
		}else if (!re_n.test(this.value)) {
			pw_tip.innerHTML = "不能全为数字！";
		}else if (!re_t.test(this.value)) {
			pw_tip.innerHTML = "不能全为字母！";
		}else{
			pw_tip.innerHTML = "OK！";
		}
	}

	//确认密码
	repw.onblur = function() {
		if (this.value != pw.value) {
			repw_tip.innerHTML = "两次密码输入不一致！";
		}else{
			repw_tip.innerHTML = "OK！";
		}
	}
}

function getLength(str){
	return str.replace(/[^\x00-xff]/g,"xx").length;
}
function findStr(str,n) {
	var tmp = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i)==n) {
			tmp++
		}
	}
	return tmp;
}