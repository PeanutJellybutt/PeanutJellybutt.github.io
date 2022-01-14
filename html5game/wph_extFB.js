
var FBId = null;
var loginState = -1;
var accessToken = "";

function FB_init() {
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '677231830111128',
			xfbml      : true,
			version    : 'v12.0'
		});
		FB.AppEvents.logPageView();
		FBId = FB;
	};

	(function(d, s, id){
		 var js, fjs = d.getElementsByTagName(s)[0];
		 if (d.getElementById(id)) {return;}
		 js = d.createElement(s); js.id = id;
		 js.src = "https://connect.facebook.net/en_US/sdk.js";
		 fjs.parentNode.insertBefore(js, fjs);
	 }(document, 'script', 'facebook-jssdk'));
}

function FB_ready() {
	if (FBId == null)
		return false;
	return true;
}

function FB_loginState() {
	return loginState;
}

function FB_token() {
	return accessToken;
}

function FB_login() {
	loginState = 0;
	FBId.login(function(response) {
		if (response.status === 'connected') {
			FB_status();
		} else {
			console.log("UNLIKELY");
			loginState = -1;
		}
	});
}

function FB_logout() {
	if (accessToken != "") {
		loginState = 0;
		FBId.logout(function(response) {
			console.log("LOGGED_OUT");
			loginState = -1;
			accessToken = "";
		});
	}
}

function FB_status() {               // Called when a person is finished with the Login Button.
	loginState = 0;
	console.log("LOGIN_CHECK");
	FBId.getLoginStatus(function(response) {   // See the onlogin handler
		if (response.status === 'connected') {   // Logged into your webpage and Facebook.
			console.log("IS_LOGGED_IN");
			console.log(response);
			accessToken = response.authResponse.accessToken;
			loginState = 1;
		} else {                                 // Not logged into your webpage or we are unable to tell.
			console.log("IS_NOT_LOGGED_IN");
			loginState = -1;
		}
	});
}

function FB_share(url) {
	FB.ui({
		method: 'share',
		href: url,
	}, function(response){});
}

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
	console.log('Welcome!  Fetching your information.... ');
	FBId.api('/me', function(response) {
		console.log('Successful login for: ' + response.name);
	});
}
