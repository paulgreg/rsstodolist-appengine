CustomButton = {

1: function () {
	
	function callbackFunction(request) {
		alert("sent, HTTP status code was " + request.status);
	}

	var url = "http://rsstodolist.appspot.com/add?name=firefox-extension-test&url=" + window.content.location.href;
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onreadystatechange = function() {
		var done = 4, ok = 200;
		if (request.readyState == done && request.status == ok) {
			callbackFunction(request);
		}
	};
	request.send(null);
  },

}
