(function() {

const synth = window.speechSynthesis;
if (!synth) { return; }

let timeout = null;
let text = "";
let node = document.createElement("button");
node.innerHTML = "▶";
node.id = "cf-speech";

function show(x, y) {
	document.body.appendChild(node);
	x += document.body.scrollLeft || document.documentElement.scrollLeft || 0;
	y += document.body.scrollTop || document.documentElement.scrollTop || 0;
	node.style.left = `${x}px`;
	node.style.top = `${y-node.offsetHeight}px`;
}

function hide() {
	node.parentNode && node.parentNode.removeChild(node);
}

function selected() {
	let s = getSelection();
	text = s.toString().trim();
	if (text == "") { return; }

	let r = s.getRangeAt(0).getClientRects()[0];
	show(r.left, r.top);
}

node.addEventListener("mousedown", e => e.preventDefault());

node.addEventListener("click", e => {
	console.log("Saying '%s'", text);
	let u = new SpeechSynthesisUtterance(text);
	synth.speak(u);
});

document.addEventListener("selectionchange", e => {
	hide();
	clearTimeout(timeout);
	timeout = setTimeout(selected, 300);
});

})();