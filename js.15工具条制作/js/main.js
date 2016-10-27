requirejs.config({
	paths:{
		jquery: "jquery-3.1.1.min"
	}
});

requirejs(['jquery','validate'],function($,validate){
	console.log(validate.isEqual(1,1))
})