jetpack.statusBar.append({
  html: <>
    <style><![CDATA[
      body,input {font-family: sans-serif; font-size: 9pt;}
      input#feed { width: 75px; }
      input#submit { width: 30px; cursor: pointer; }
      input { border: 1px solid black; }
      a { border-bottom: 1px dotted blue; cursor: pointer; }
    ]]></style>
    <body><input type="submit" id="submit" value="add url"/> to <a id="link">rsstodolist/?name=</a><input type="text" id="feed" value="somename"/></body>
  </>,
  width: 260,
  onReady: function(widget){

    $("#link", widget).click(function(){
         var tab = jetpack.tabs.open('http://rsstodolist.appspot.com/?name=' + $("#feed", widget).val());
         tab.focus();
    });
    
    $("#submit", widget).click(function(){
      var feedName = $("#feed", widget).val();
      if (feedName != '') {
        var url = jetpack.tabs.focused.url;
        var request = new XMLHttpRequest();
        request.open("GET", "http://rsstodolist.appspot.com/add?name=" + feedName + "&url=" + url, true);
        request.onreadystatechange = function() {
                var done = 4, ok = 200;
                if (request.readyState == done) {
                    $("#submit", widget).attr('disabled', '');
                    if (request.status == ok)
                        jetpack.notifications.show(
                                {   title: 'URL added to rssdotolist',
                                    body: 'URL [' + url + '] added to feed '+feedName} );
                    else 
                        jetpack.notifications.show(
                                {   title: 'Error while adding URL to rssdotolist',
                                    body: 'Problem while adding URL [' + url + '] to feed '+feedName} );
               }
        };
        $("#submit", widget).attr('disabled', 'disabled'); 
        request.send(null);
      };
      
    });
  }
});
