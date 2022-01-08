
function GetENV() {
	return 0;
	//console.log(process.env.NODE_ENV);
	/*
	if (document.env.ENV === 'dev') {
		return 0;
	} 
	else if (document.env.ENV === 'prod') {
		return 1;
	}*/
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

var audioRecheck = false;
var canvasHere;
function canvasSetListener() {
	canvasHere = document.getElementById('canvas');
	canvasHere.addEventListener('mousemove', function(e) {
			getCursorPosition(canvasHere, e);
	});
	document.addEventListener('visibilitychange', function(e) {
			audioRecheck = true;
			console.log("audioRecheck needed")
	});
	
	var myEvent = ('ontouchstart' in document.documentElement) ? 'touchend' : 'click';
	canvasHere.addEventListener(myEvent, function() {
			gml_Script_gmcallback_browser_click_handler();
			audioContextCheck();
	});
}

function audioContextCheck() {
	if(typeof g_WebAudioContext == "undefined" || g_WebAudioContext == null) {
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		g_WebAudioContext = new AudioContext;
		g_WebAudioContext.resume();
		console.log("NEW AUDIO");
	} else if (g_WebAudioContext.state !== 'running') {
		g_WebAudioContext.resume();
		console.log("RESUME AUDIO");
	} else if (audioRecheck) { 
		g_WebAudioContext.suspend();
		g_WebAudioContext.resume();
		audioRecheck = false;
		console.log("RERUN AUDIO");
	}
}

function setAudioRecheck() {
	audioRecheck = 1;
}

function checkIfTouch() {
	return (navigator.maxTouchPoints > 0);
}

function copyToClipboard(str) {
	navigator.clipboard.writeText(str);
}

function ShareAPI(header,txt,url) {
	if (navigator.share) {
		navigator.share({
			title: header,
			text: txt,
			url: url,
		})
		.then(() => console.log("Successful share"))
		.catch((error) => console.log("Error sharing", error));
	} else {
		console.error("Your Browser doesn't support Web Share API");
	}
}

function ToggleFullscreen()
{
	var root = document.documentElement;
	var req = (
		root.requestFullscreen ||
		root.webkitRequestFullscreen ||
		root.mozRequestFullScreen ||
		root.msRequestFullscreen
	);
	if (!document.fullscreenElement) {
      root.req();
  } else {
    if (document.exitFullscreen) {
      root.exitFullscreen();
    }
  }
}
