jetpack.future.import("storage.simple");

// Icons comes from http://famfamfam.com/lab/icons/silk/
var feed_add = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALqSURBVHjaYvz//z8DJQAggFjAZCsjN4Omrj+DmMVSBlY+Boa/fyCy/35D2P/+QjGQ/fMLA8PLSzMYku9mgpQABBDEAC2jXAaVeFsGaWcGBkZmBobfP0C6GRhArvvzHWoYlA8ygP90BsNEER6G/DexAAEEMUDYoJ1B3IaB4cNtBoYvLxgYvj8D2vwbqglo818Q/gdxAYcEA4OQLgMDt1IMUGcsQABBDPjPDFH46gwDg3kj0IC3DAyf7jMwvLnKwPDiPMT5IK+ADPn5kIGBVwnIBkIgAAggiAG/f0IU/PoJ8QKXGASLmwJpaQaGO9uAGr9CXPKfEagO6K3vEK8BBBDEgJ9AP397D5QA0keALuBXZGAQ1WFgkDBiYFByB1oA9M6NzUB17yAG/PwM0QMEAAEEMeDXN4jtIAO+A534+h4Dw+3dDAzKQM3qvkDsAwxMoAtPzwd65z/ENd9+grUCBBDEgO9Ajb+Bgj+BgjaVoEBhYLi5nYHh8jqgONDZJvHAmPJjYHgGDJN7RxkYfgBd8ANiAEAAQQ34BnEFyABRTUi0gQLsF9DWC2uAsaTCsOvtK4Y9d28yfPzOxvD78hkG1/9cTJFAZQABBDHgx3eIs379YmDYVsXAoOnFwKBoA3Hujb0MW06sZjjH+onB3taCQUZIlWH/1Q0MG6+8ZpyYI9UDEEBMEBf8hIYD0IDHFxgYLm2EuAKckP4yrH90jcFAQ5/hL9NfBn1JV4a/jL8ZLHStQCqyAQII4oLPbxgYvn6EpIe/IEMuMjBMcoUYAMSvgPKsjDwMnprJYOXFzrMYNl+eBmRt4gAIIIgBV14tYpC/ac7AJ64OSbbQ1Pf/Hzg1fr5/h+Hqs2MMF58dYahwnc/QsSuRgYOZHex5gABihOdGd8a5DCrsiQzsXP/BfgcLAyMdKD/jHxvjHkURBis9GwZVCUOG28DUeezSEYYn9z/2AgQQI7HZ2SJHqgNIZQExL8jTQDztxJRnFQABBgCsaTGqudZSmgAAAABJRU5ErkJggg%3D%3D';
var feed_del = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALwSURBVHjaYvz//z8DJQAggFjAZCsjN4Omrj+DmMVSBlY+Boa/fyCy/35D2P/+QjGQ/fMLA8PLSzMYku9mgpQABBDEAC2jXAaVeFsGaWcGBkZmBobfP0C6GRhArvvzHWoYlA8ygP90BsNEER6G/DexAAEEMUDYoJ1B3IaB4cNtBoYvLxgYvj8D2vwbqglo818Q/gdxAYcEA4OQLgMDt1IMUGcsQABBDPjPDFH46gwDg3kj0IC3DAyf7jMwvLnKwPDiPMT5IK+ADPn5kIGBVwnIBkIgAAggiAG/f0IU/PoJ8QKXGASLmwJpaQaGO9uAGr9CXPKfEagO6K3vEK8BBBDEgJ9AP397D5QA0keALuBXZGAQ1WFgkDBiYFByB1oA9M6NzUB17yAG/PwM0QMEAAEEMeDXN4jtIAO+A534+h4Dw+3dDAzKQM3qvkDsAwxMoAtPzwd65z/ENd9+grUCBBDEgO9Ajb+Bgj+BgjaVoEBhYLi5nYHh8jqgONDZJvHAmPJjYHgGDJN7RxkYfgBd8ANiAEAAQQ34BnEFyABRTUi0gQLsF9DWC2uAsaTC8OTSRYYna+cxfH36iIGV/xiDLM8fJqBHGQACCGLAj+8QZ/36xcCwrYqBQdOLgUHRBuLcG3sZnqyfyvD+5RMGg4hsBnZFbYbvl3YxXD+8m/GOC2suQAAxQVzwExoOQAMeX2BguLQR4gpwQvrLcP/wNgYV+wAGjrsHGBgXRjJw3VvPIC8vDAzP/4UAAQRxwec3DAxfP0LSw1+QIRcZGCa5QgwA4l+fvgLTD9DBXkWIPNAgycD8j1EBIIAgBlx5tYhB/qY5A5+4OiTZQlPf/3/g1MjKy8Hw7cJWBu5NWQw/v79g+Aay8xMzw19mhmcAAcQIz43ujHMZVNgTGdi5/oP9DhYGRjpQ/tEXNsaXzIIMMsJ/GFiYnjB8fv2H4cFL5r+/f/yvAwggRmKz89EIuYqv756lM/9llP/L/P8pUNd0911/2gACDABZRTl8tLqdqAAAAABJRU5ErkJggg%3D%3D';
var feed_edit = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAM9SURBVHjaYvz//z8DJQAggFjAZCsjN4Omrj+DmMVSBlY+Boa/fyCy/35D2P/+QjGQ/fMLA8PLSzMYku9mgpQABBDEAC2jXAaVeFsGaWcGBkZmBobfP0C6GRhArvvzHWoYlA8ygP90BsNEER6G/DexAAEEMUDYoJ1B3IaB4cNtBoYvLxgYvj8D2vwbqglo818Q/gdxAYcEA4OQLgMDt1IMUGcsQABBDPjPDFH46gwDg3kj0IC3DAyf7jMwvLnKwPDiPMT5IK+ADPn5kIGBVwnIBkIgAAggiAG/f0IU/PoJ8QKXGASLmwJpaQaGO9uAGr8yfP33geHJDy4G5kcPGb6yCjIzTtOJAwggiAE/gX7+9h5oAJA+AnQBvyIDg6gOA4OEEQODkjvQgt8M327NZvjMr8kgIWILlDZk+HBfneHGrjldAAEEMeDXN4jtIAO+A534+h4Dw+3dDAzKQM3qvgzf+JgYfiobMgjxGTO8u3udgY3xFwMvnwQDj7AcP0AAQQz4DtT4+yvQJUBDbCpBgcLAcHM7A8PldQw/vt5i+MkPdBTQJT+fr2Bg42JkeHjhBsO/r18Zvv/6qQ8QQFADvkFcATJAVBMSbcAA+/btPsNPvj8M/Mp+DD+ezmBgYvvDwMojz8D94zqDyP0b/zg7Ht8CCCCIAT++gwOJ4dcvBoZtVQwMml4ML368A0YXD4OYCkjzdAYm1j8Mvz4pMrw9eJxBkluUgePbJ7BWgACCuuAnNByABjy+wPDizV2GD5IKDGo2Pgy/XsxhYGb7z/DjozzDm2PnGOS+/mZg5QDF3D+wVoAAYgKTn98wMHz9CE4Pt968Y3gnqsLw668Uw/PLk4Hp8QfD13fSDG8PnGCQ+/iFgZWJFehioGu/fQHrBQggiAFXXi1ieH3zJgOfOMNFVh4GLZs0BvbHRxhubTzKcGHnO4ZbWw8wSHEIMbCKygDTCVD9I2ACO8cwC6QVIIAgXlj7P57BnXEugwq72u3fKoy/rm5hUNS3Zfj4+i3D0zOXGFy4fv7neHKFAZwZvnxlYjjOkM1w+/80kFaAAGJEz85hdkLfjZTEWcw0FRn+s/489v3V60Sfjkv3cGVngAADANOFP2yy8U5tAAAAAElFTkSuQmCC';
var feed_go = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMBSURBVHjaYvz//z8DJQAggFjAZCsjN4Omrj+DmMVSBlY+Boa/fyCy/35D2P/+QjGQ/fMLA8PLSzMYku9mgpQABBDEAC2jXAaVeFsGaWcGBkZmBobfP0C6GRhArvvzHWoYlA8ygP90BsNEER6G/DexAAEEMUDYoJ1B3IaB4cNtBoYvLxgYvj8D2vwbqglo818Q/gdxAYcEA4OQLgMDt1IMUGcsQABBDPjPDFH46gwDg3kj0IC3DAyf7jMwvLnKwPDiPMT5IK+ADPn5kIGBVwnIBkIgAAggiAG/f0IU/PoJ8QKXGASLmwJpaQaGO9uAGr9CXPKfEagO6K3vEK8BBBDEgJ9AP397D5QA0keALuBXZGAQ1WFgkDBiYFByB1oA9M6NzUB17yAG/PwM0QMEAAHEBCZ/fYPYDjLgPdCJd/YyMBzrZ2C4uISB4cdHBgZ1H4aK77cY0n7dhWgEuebbT7BWgACCGPAdKPgbKPgTKGhRysBgU87AIGbAwHB5HQPDlQ1gJT+ANsuIaDJE/AYG9A+gC35ADAAIIIgXvn+DuAJkgKgmWKhgdwYocBh+XZvM8OvyRAZJQRUGTQlzhs8/vjJ43lnEsO3PX0agZxgAAghiwI/vEGf9+sXAsK2KgUHTi+HPv18MrtrxDH///wMG/l9gqvjP8OzjYwZdGWuGL8BAtPpxkOlrCxMjQABBXfATGg5AAx5fAAfajz+/wJofvr3N8BsY/3+AqfI3MG18Agaggawtw5ff3xhO3j/yAyCAIAZ8fsPA8PUjJD38BRlykeEHxw+GP8CoFeeTA2r+Czbs+cdHDEI8EgznHh9leHHjCMM3RgYBgACCGHDl1SIG+ZvmDHzi6pBk+5fh+8c7DAuP9zD8AnrlJ9A1iiJaDBZKbgynHx5heHrzAMPG7QxzuS78/w4QQIzw3OjOOJdBhT2RgZ3rP8M/oBhYGBj0/yFsW9EvjMoKjgxvr+xlWLaFIZ/32v9JIBUAAcRIbHZWqmN8/fcfs8j3f39ZX7X9/wMTBwgwAD5jU2E9CK0iAAAAAElFTkSuQmCC';

var datastore = jetpack.storage.simple;

function send(widget, button) {
  var feedName = $("#feed", widget).val();
  if (feedName != '') {

    datastore.feed = { name: feedName }; // Saving feed name

    var url = jetpack.tabs.focused.url;

    var action = button.attr('id');
    var done = button.attr('data-done');
    var doing = button.attr('data-doing');
    
    var request = new XMLHttpRequest();
    request.open("GET", "http://rsstodolist.appspot.com/" + action + "?name=" + feedName + "&url=" + url, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200)
                jetpack.notifications.show({title: 'URL '+ done +' to rssdotolist', body: 'URL ['+ url +'] '+ done +' to feed '+feedName});
                else 
                    jetpack.notifications.show({title: 'Error while '+ doing +' URL to rssdotolist', body: 'Problem while '+ doing +' URL [' + url + '] to feed '+feedName});
        }
    };
    request.send(null);
  }
}

jetpack.statusBar.append({
  html: <>
    <style><![CDATA[
      body,input {font-family: sans-serif; font-size: 9pt; background-color: transparent; color: black;}
      input[type=image] { border: 0; }
      input#feed { width: 75px; background-color: #E3E9EF;}
      input { border: 1px solid grey; }
      a { border-bottom: 1px solid #63ADF5; cursor: pointer; }
    ]]></style>
    <body>
    <input type="image" id="add" data-done="added" data-doing="adding" alt="add current url" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALqSURBVHjaYvz//z8DJQAggFjAZCsjN4Omrj+DmMVSBlY+Boa/fyCy/35D2P/+QjGQ/fMLA8PLSzMYku9mgpQABBDEAC2jXAaVeFsGaWcGBkZmBobfP0C6GRhArvvzHWoYlA8ygP90BsNEER6G/DexAAEEMUDYoJ1B3IaB4cNtBoYvLxgYvj8D2vwbqglo818Q/gdxAYcEA4OQLgMDt1IMUGcsQABBDPjPDFH46gwDg3kj0IC3DAyf7jMwvLnKwPDiPMT5IK+ADPn5kIGBVwnIBkIgAAggiAG/f0IU/PoJ8QKXGASLmwJpaQaGO9uAGr9CXPKfEagO6K3vEK8BBBDEgJ9AP397D5QA0keALuBXZGAQ1WFgkDBiYFByB1oA9M6NzUB17yAG/PwM0QMEAAEEMeDXN4jtIAO+A534+h4Dw+3dDAzKQM3qvkDsAwxMoAtPzwd65z/ENd9+grUCBBDEgO9Ajb+Bgj+BgjaVoEBhYLi5nYHh8jqgONDZJvHAmPJjYHgGDJN7RxkYfgBd8ANiAEAAQQ34BnEFyABRTUi0gQLsF9DWC2uAsaTCsOvtK4Y9d28yfPzOxvD78hkG1/9cTJFAZQABBDHgx3eIs379YmDYVsXAoOnFwKBoA3Hujb0MW06sZjjH+onB3taCQUZIlWH/1Q0MG6+8ZpyYI9UDEEBMEBf8hIYD0IDHFxgYLm2EuAKckP4yrH90jcFAQ5/hL9NfBn1JV4a/jL8ZLHStQCqyAQII4oLPbxgYvn6EpIe/IEMuMjBMcoUYAMSvgPKsjDwMnprJYOXFzrMYNl+eBmRt4gAIIIgBV14tYpC/ac7AJ64OSbbQ1Pf/Hzg1fr5/h+Hqs2MMF58dYahwnc/QsSuRgYOZHex5gABihOdGd8a5DCrsiQzsXP/BfgcLAyMdKD/jHxvjHkURBis9GwZVCUOG28DUeezSEYYn9z/2AgQQI7HZ2SJHqgNIZQExL8jTQDztxJRnFQABBgCsaTGqudZSmgAAAABJRU5ErkJggg%3D%3D'/>
    <input type="image" id="del" data-done="deleted" data-doing="deleting" alt="delete current url" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALwSURBVHjaYvz//z8DJQAggFjAZCsjN4Omrj+DmMVSBlY+Boa/fyCy/35D2P/+QjGQ/fMLA8PLSzMYku9mgpQABBDEAC2jXAaVeFsGaWcGBkZmBobfP0C6GRhArvvzHWoYlA8ygP90BsNEER6G/DexAAEEMUDYoJ1B3IaB4cNtBoYvLxgYvj8D2vwbqglo818Q/gdxAYcEA4OQLgMDt1IMUGcsQABBDPjPDFH46gwDg3kj0IC3DAyf7jMwvLnKwPDiPMT5IK+ADPn5kIGBVwnIBkIgAAggiAG/f0IU/PoJ8QKXGASLmwJpaQaGO9uAGr9CXPKfEagO6K3vEK8BBBDEgJ9AP397D5QA0keALuBXZGAQ1WFgkDBiYFByB1oA9M6NzUB17yAG/PwM0QMEAAEEMeDXN4jtIAO+A534+h4Dw+3dDAzKQM3qvkDsAwxMoAtPzwd65z/ENd9+grUCBBDEgO9Ajb+Bgj+BgjaVoEBhYLi5nYHh8jqgONDZJvHAmPJjYHgGDJN7RxkYfgBd8ANiAEAAQQ34BnEFyABRTUi0gQLsF9DWC2uAsaTC8OTSRYYna+cxfH36iIGV/xiDLM8fJqBHGQACCGLAj+8QZ/36xcCwrYqBQdOLgUHRBuLcG3sZnqyfyvD+5RMGg4hsBnZFbYbvl3YxXD+8m/GOC2suQAAxQVzwExoOQAMeX2BguLQR4gpwQvrLcP/wNgYV+wAGjrsHGBgXRjJw3VvPIC8vDAzP/4UAAQRxwec3DAxfP0LSw1+QIRcZGCa5QgwA4l+fvgLTD9DBXkWIPNAgycD8j1EBIIAgBlx5tYhB/qY5A5+4OiTZQlPf/3/g1MjKy8Hw7cJWBu5NWQw/v79g+Aay8xMzw19mhmcAAcQIz43ujHMZVNgTGdi5/oP9DhYGRjpQ/tEXNsaXzIIMMsJ/GFiYnjB8fv2H4cFL5r+/f/yvAwggRmKz89EIuYqv756lM/9llP/L/P8pUNd0911/2gACDABZRTl8tLqdqAAAAABJRU5ErkJggg%3D%3D'/>
    to <input type="text" id="feed" value="somename"/><a id="link"><img alt="go to that feed" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMBSURBVHjaYvz//z8DJQAggFjAZCsjN4Omrj+DmMVSBlY+Boa/fyCy/35D2P/+QjGQ/fMLA8PLSzMYku9mgpQABBDEAC2jXAaVeFsGaWcGBkZmBobfP0C6GRhArvvzHWoYlA8ygP90BsNEER6G/DexAAEEMUDYoJ1B3IaB4cNtBoYvLxgYvj8D2vwbqglo818Q/gdxAYcEA4OQLgMDt1IMUGcsQABBDPjPDFH46gwDg3kj0IC3DAyf7jMwvLnKwPDiPMT5IK+ADPn5kIGBVwnIBkIgAAggiAG/f0IU/PoJ8QKXGASLmwJpaQaGO9uAGr9CXPKfEagO6K3vEK8BBBDEgJ9AP397D5QA0keALuBXZGAQ1WFgkDBiYFByB1oA9M6NzUB17yAG/PwM0QMEAAHEBCZ/fYPYDjLgPdCJd/YyMBzrZ2C4uISB4cdHBgZ1H4aK77cY0n7dhWgEuebbT7BWgACCGPAdKPgbKPgTKGhRysBgU87AIGbAwHB5HQPDlQ1gJT+ANsuIaDJE/AYG9A+gC35ADAAIIIgXvn+DuAJkgKgmWKhgdwYocBh+XZvM8OvyRAZJQRUGTQlzhs8/vjJ43lnEsO3PX0agZxgAAghiwI/vEGf9+sXAsK2KgUHTi+HPv18MrtrxDH///wMG/l9gqvjP8OzjYwZdGWuGL8BAtPpxkOlrCxMjQABBXfATGg5AAx5fAAfajz+/wJofvr3N8BsY/3+AqfI3MG18Agaggawtw5ff3xhO3j/yAyCAIAZ8fsPA8PUjJD38BRlykeEHxw+GP8CoFeeTA2r+Czbs+cdHDEI8EgznHh9leHHjCMM3RgYBgACCGHDl1SIG+ZvmDHzi6pBk+5fh+8c7DAuP9zD8AnrlJ9A1iiJaDBZKbgynHx5heHrzAMPG7QxzuS78/w4QQIzw3OjOOJdBhT2RgZ3rP8M/oBhYGBj0/yFsW9EvjMoKjgxvr+xlWLaFIZ/32v9JIBUAAcRIbHZWqmN8/fcfs8j3f39ZX7X9/wMTBwgwAD5jU2E9CK0iAAAAAElFTkSuQmCC'/></a>
     </body>
  </>,
  width: 150,
  onReady: function(widget){
     
    if (datastore.feed && datastore.feed.name != '')
        $("#feed", widget).val(datastore.feed.name); // Restoring last feed name

    $("#link", widget).click(function(){
         var tab = jetpack.tabs.open('http://rsstodolist.appspot.com/?name=' + $("#feed", widget).val());
         tab.focus();
    });

    $("#add", widget).click(function() { send(widget, $("#add", widget)); });
    $("#del", widget).click(function() { send(widget, $("#del", widget)); });
  }
});

