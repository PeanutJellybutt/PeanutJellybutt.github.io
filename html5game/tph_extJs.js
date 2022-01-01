
var audioContext;
function getAudioContext() {
	if (!audioContext) {
		audioContext = new AudioContext;
		return 1;
	}
	return 0;
}

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
function CanvasSetListener() {
	canvasHere = document.getElementById('canvas');
	canvasHere.addEventListener('mousemove', function(e) {
			getCursorPosition(canvasHere, e);
	});
}

function checkIfIPAD() {
	console.log("IS_IPAD?");
	if (navigator && navigator.userAgent && navigator.userAgent != null) 
	{
			var strUserAgent = navigator.userAgent.toLowerCase();
			var arrMatches = strUserAgent.match(/(iphone|ipod|ipad)/);
			if (arrMatches != null) 
					 return true;
	}
	return false;
}
