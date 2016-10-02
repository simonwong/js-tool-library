function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload=func;
	} else{
		winow.onload = function(){
			oldonload();
			func();
		}
	}
}