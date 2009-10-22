jetpack.future.import("storage.simple");

jetpack.statusBar.append({
  html: <>
    <style><![CDATA[
      body,input {font-family: sans-serif; font-size: 9pt; background-color: transparent; color: black;}
      input#submit { cursor: pointer; width: 50px; background-color: #E3E9EF; }
      input#feed { width: 75px; background-color: #E3E9EF;}
      input { border: 1px solid grey; }
      a { border-bottom: 1px solid #63ADF5; cursor: pointer; }
    ]]></style>
    <body><input type="submit" id="submit" value="add url"/> to <a id="link">rsstodolist/?name=</a><input type="text" id="feed" value="somename"/></body>
  </>,
  width: 280,
  onReady: function(widget){

     var datastore = jetpack.storage.simple;
     
     if (datastore.feed && datastore.feed.name != '')
        $("#feed", widget).val(datastore.feed.name); // Restoring last feed name

    $("#link", widget).click(function(){
         var tab = jetpack.tabs.open('http://rsstodolist.appspot.com/?name=' + $("#feed", widget).val());
         tab.focus();
    });
    
    $("#submit", widget).click(function(){
      var feedName = $("#feed", widget).val();
      if (feedName != '') {

        datastore.feed = { name: feedName }; // Saving feed name

        var url = jetpack.tabs.focused.url;
        
        var request = new XMLHttpRequest();
        request.open("GET", "http://rsstodolist.appspot.com/add?name=" + feedName + "&url=" + url, true);
        request.onreadystatechange = function() {
                var done = 4, ok = 200;
                if (request.readyState == done) {
                    $("#submit", widget).val('add url');
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
        $("#submit", widget).val('adding...');
        $("#submit", widget).attr('disabled', 'disabled'); 
        request.send(null);
      };
      
    });
  }
});
