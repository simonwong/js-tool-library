let dom = document.getElementById('clock');
let ctx = dom.getContext('2d');
let width = ctx.canvas.width;
let height = ctx.canvas.height;
let r = width / 2;
let rem = width / 200;


function drawBackground() {
	ctx.save();
	// 绘制钟表外圆
	ctx.translate(r, r);
	ctx.beginPath();
	ctx.lineWidth = 8 * rem;
	ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2*Math.PI, false);
	ctx.stroke();

	//绘制钟表时间
	let hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
	ctx.font = 18 * rem + 'px Microsoft Yahei';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hourNumbers.forEach(function(number, i) {
		let rad = 2 * Math.PI / 12 * i;
		let x = Math.cos(rad) * (r - 30 * rem);
		let y = Math.sin(rad) * (r - 30 * rem);
		ctx.fillText(number, x, y);
	});

	//绘制刻度
	for (let i = 0; i < 60; i++) {
		let rad = 2 * Math.PI / 60 * i;
		let x = Math.cos(rad) * (r - 18 * rem);
		let y = Math.sin(rad) * (r - 18 * rem);

		ctx.beginPath();
		if (i % 5 === 0) {
			ctx.fillStyle = '#000';
			ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
		} else {
			ctx.fillStyle = '#ccc';
			ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
		}
		ctx.fill();
	}
}

//绘制时针
function drawHour(hour, minute) {
	ctx.save();
	ctx.beginPath();
	let rad = 2 * Math.PI / 12 * hour;
	let mrad = 2 * Math.PI / 12 /60 * minute;
	ctx.rotate(rad + mrad);
	ctx.lineWidth = 6 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r / 2);
	ctx.stroke();
	ctx.restore();
}

//绘制分针
function drawMinute(minute) {
	ctx.save();
	ctx.beginPath();
	let rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r + 30 * rem);
	ctx.stroke();
	ctx.restore();
}

//绘制秒针
function drawSecond(second) {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#c14543';
	let rad = 2 * Math.PI / 60 * second;
	ctx.rotate(rad);
	ctx.moveTo(-2 * rem, 20 * rem);
	ctx.lineTo(2 * rem, 20 * rem);
	ctx.lineTo(1, -r + 18 * rem);
	ctx.lineTo(-1, -r + 18 * rem);
	ctx.fill();
	ctx.restore();
}

//绘制中间白点
function drawDot() {
	ctx.beginPath;
	ctx.fillStyle = '#fff';
	ctx.arc(0, 0, 3 * rem, 0, 2*Math.PI, false);
	ctx.fill();
}


function draw() {

	ctx.clearRect(0, 0, width, height);

	let now = new Date();
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();

	drawBackground();
	drawHour(hour, minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}
draw();
setInterval(draw,1000);