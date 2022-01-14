
var GoogleAuthID = null;
var GoogleUserID = null;
var loginState = -1;
var accessToken = "";

function Google_init() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.defer = true;
	script.onload = function() {
		gapi.load('auth2', function() {
			var auth = gapi.auth2.init({client_id: '42745182088-b6fsqdrfehukqrb32orpspl2r73i0g00.apps.googleusercontent.com'})
			GoogleAuthID = auth.then(
			function() {
				console.log("Google Sign-in auth has successfully initialized");
			},
			function() {
				GoogleAuthID = null;
				console.log("Google Sign-in is not supported on this browser or has failed to initialize");
			});
		});
	}
	script.src = "https://apis.google.com/js/platform.js";
	document.getElementsByTagName('head')[0].appendChild(script);
}

function Google_ready() {
	if (GoogleAuthID != null)
		return true;
	return false;
}

function Google_loginState() {
	return loginState;
}

function Google_token() {
	return accessToken;
}

function Google_login() {
	loginState = 0;
	GoogleUserID = GoogleAuthID.signIn().then(
		function() {
			console.log("IS_LOGGED_IN");
			var authResponse = GoogleUserID.getAuthResponse();
			console.log(authResponse);
			accessToken = authResponse.access_token;
			loginState = 1;
		},
		function () {
			console.log("UNLIKELY/NOT_LOGGED_IN");
			loginState = -1;
		}
	);
}

function Google_logout() {
	if (accessToken != "") {
		loginState = 0;
		GoogleAuthID.signOut().then(
			function() {
				console.log("LOGGED_OUT");
				loginState = -1;
				accessToken = "";
				GoogleUserID = null;
			}
		);
	}
}
