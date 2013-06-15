var server = 'https://rsstodolist.appspot.com/';
var descriptionDefaultMessage = "Your description here";

var gotoRssFeed = function() {
    var url = server + "?n=" + document.querySelector('#feed').value;
    chrome.tabs.create( { "url": url } );
}

var notify = function(cssClass, msg) {
    var tag  = document.querySelector('#notification');	
    tag.setAttribute('class', cssClass);
    tag.innerHTML = msg;
    setTimeout(function() {
        notify('', '');
    }, 10000);
}

var add = function(e) {
    button = document.querySelector('#add');
    chrome.tabs.getSelected(getTabAndSend.bind(this, button));
    e.stopPropagation();
}

var del = function(e) {
    button = document.querySelector('#del');
    chrome.tabs.getSelected(getTabAndSend.bind(this, button));
    e.stopPropagation();
}

var getTabAndSend = function(button, tab) {
  var url = tab.url;
  var feedName = document.querySelector('#feed').value;
  if (feedName != '') {

        localStorage['rsstodolist'] = feedName;

        var encodedUrl = encodeURIComponent(url);
        var action = button.getAttribute('id');
        var done = button.getAttribute('data-done');
        var doing = button.getAttribute('data-doing');
        var description = document.querySelector('#description').value;
        var descriptionParam = (description != '' && description != descriptionDefaultMessage) ? '&description=' + encodeURIComponent(description) : '';
        var request = new XMLHttpRequest();
    
        var rssTodoListUrl = server + action + "?name=" + feedName + "&url=" + encodedUrl + descriptionParam;

        request.open("GET", rssTodoListUrl, true);
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    document.querySelector('#description').value = descriptionDefaultMessage;
                    notify('info', 'URL ['+ url +'] '+ done +' to feed '+feedName);
                } else 
                  notify('error', 'Problem while '+ doing +' URL [' + url + '] to feed '+feedName);
            }
        };
        notify('info', 'Sending URL ['+ url +'] '+ ' to feed '+ feedName);
        request.send(null);
  }
}

document.addEventListener('DOMContentLoaded', function onStartup() {

    document.querySelector('#description').value = descriptionDefaultMessage;

    var feedName = localStorage['rsstodolist'];
    if (feedName)
        document.querySelector('#feed').value = feedName;

    document.querySelector('#link').addEventListener('click', gotoRssFeed, true);
    document.querySelector('#add').addEventListener('click', add, true);
    document.querySelector('#del').addEventListener('click', del, true);
}, true);
