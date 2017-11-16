function addLoadEvent(func){
  let oldonload = window.onload;
  if (typeof window.onload != 'function'){
    window.onload = func;
  }else {
    window.onload = function(){
      oldonload();
      func();
    }
  }
}

let generator = [
	'All for one, one for all. ',
	'Other men live to eat, while I eat to live. ',
	'Easy come, easy go. ',
	'Love rules his kingdom without a sword. ',
	'We soon believe what we desire. ',
	'The darkest hour is that before the dawn. ',
	'The longest day has an end. ',
	'Living without an aim is like sailing without a compass. ',
	'A bird in the hand is worth two in the bush. ',
	'One swallow does not make a summer. ',
	'A man may lead a horse to the water, but he cannot make it drink. ',
	'One cannot eat one’s cake and have it. ',
	'Time is money. ',
	'Time and tide wait for no man. ',
	'There is no rose without a thorn. ',
	'Lookers-on see most of the game. ',
	'Beggars cannot be choosers. ',
	'First catch your hare. ',
	'Victory won’t come to me unless I go to it. ',
	'A great man is always willing to be little. ',
]
let quoteDispaly = document.getElementById('quoteDispaly');
let quoteBtn = document.getElementById('quoteBtn');


function quote () {
	quoteBtn.onclick = function() {
		let num = Math.floor(Math.random()*20);
		console.log(num);
		quoteDispaly.innerHTML = '<p> ' + generator[num] + ' </p>';
	}
}
addLoadEvent(quote);