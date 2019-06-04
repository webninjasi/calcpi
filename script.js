var cRadius = 300;
var cTextColor = "white";
var cSaveInterval = 10 * 1000;

var width = cRadius * 2;
var height = cRadius * 2;
var lastX = 0, lastY = 0;
var radiusPow2 = cRadius * cRadius;

var inCircle = 0, outCircle = 0, total = 0, calcPi, lastSave = Date.now();

var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

canvas.width = width;
canvas.height = height;

load();
window.requestAnimationFrame(render);

function update() {
	// TODO use a better RNG
	// TODO ^ & save current state of RNG?
	lastX = Math.random() * width - cRadius;
	lastY = Math.random() * height - cRadius;

	dist = lastX * lastX + lastY * lastY;

	if (dist <= radiusPow2) inCircle ++;
	else outCircle ++;

	total ++;

	calcPi = 4 * inCircle / total;

	if (Date.now() - lastSave > cSaveInterval) {
		lastSave = Date.now();
		save();
		console.log("Saved!", lastSave);
	}
}

function render() {
	update();

  ctx.clearRect(0, 0, width, height);
	drawBox(0, 0, 2 * cRadius, "black");
	drawCircle(cRadius, cRadius, cRadius, "red");
	drawCircle(lastX+cRadius-1, lastY+cRadius-1, 2, "white");
	drawText("Pi: " + calcPi, "Arial", 12, cTextColor, 10, 20);
	drawText("In: " + inCircle, "Arial", 12, cTextColor, 10, 40);
	drawText("Out: " + outCircle, "Arial", 12, cTextColor, 10, 60);

  window.requestAnimationFrame(render);
}

function load() {
	var s_in = parseInt(localStorage.getItem("in")),
		s_out = parseInt(localStorage.getItem("out"));

	if (!isNaN(s_in) && !isNaN(s_out)) {
		inCircle = s_in;
		outCircle = s_out;
		total = inCircle + outCircle;
	}
}

function save() {
	localStorage.setItem("in", inCircle);
	localStorage.setItem("out", outCircle);
}

function drawBox(x, y, size, color) {
	ctx.rect(x, y, size, size);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawCircle(x, y, radius, color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fill();
}

function drawText(text, font, size, color, x, y) {
	ctx.font = size+"px "+font;
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}
