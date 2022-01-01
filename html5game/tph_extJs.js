
var X = 0;
var Y = 0;
function getMousePosX(w) {
	return X * w;
}
function getMousePosY(h) {
		return Y * h;
}

function getMousePosX2(mX,mY,w,h,bw,bh) {
		return mY + (bw - ((bw*16/9)/2));
}
function getMousePosY2(mX,mY,w,h,bw,bh) {
		return bh-mX;
}

function getCursorPosition(canvas, event) {
		const rect = canvas.getBoundingClientRect();
		X = (event.clientX - rect.left) / rect.width;
		Y = (event.clientY - rect.top) / rect.height;
}

var canvasHere;
var audioContext;
function canvasSetListener() {
	if (!audioContext) {
		audioContext = new AudioContext;
	}
	canvasHere = document.getElementById('canvas');
	canvasHere.addEventListener('mousemove', function(e) {
			getCursorPosition(canvasHere, e);
	});
}

function browser_click_handler_init_js() {
		console.log("INIT_HANDLER_JS");
		canvasHere = document.getElementById('canvas');
    canvasHere.addEventListener("click", function() {
			//
			if (!audioContext) {
				audioContext = new AudioContext;
			}
			console.log('click ' + audioContext.state);
			if (audioContext.state !== 'running') {
				audioContext.resume();
			}
			console.log('= ' + audioContext.state);
			//
			gml_Script_gmcallback_browser_click_handler();
		});
    return 0;
}

function checkIfTouch() {
	return (navigator.maxTouchPoints > 0);
}
