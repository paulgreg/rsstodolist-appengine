const widgets = require("widget");
const tabs = require("tabs");
const panels = require("panel");
const Request = require('request').Request;
var data = require("self").data;
var simpleStorage = require("simple-storage");
var notifications = require("notifications");

var serverUrl = "http://rsstodolist.appspot.com/";

var panel = panels.Panel({
   contentURL: data.url("rsstodolist.html"),
   contentScriptFile: [data.url("jquery.min.js"), data.url("rsstodolist.js")],
   width: 335,
   height: 37,
   onMessage: function(message) {
      if(message == 'ready') {
         transmitInfos();
      } else {
         doAction(message);
      }
   }
});

var widget = widgets.Widget({
   label: "RSS Todo List",
   contentURL: data.url("icon.png"),
   panel: panel,
   onMouseover: function() {
      transmitInfos();
   }
});

function transmitInfos() {
   var title = tabs.activeTab.title;
   var feed = simpleStorage.storage.feed;

   console.log('ready - ' + ' description : ' + title + ' feed : ' + feed);

   this.panel.postMessage({description: title, feed: feed});
}

function doAction(message) {
   console.log("message - action : " + message.action + " description : " + message.description + " feed : " + message.feed);
   if(message.feed && message.action) {
      simpleStorage.storage.feed = message.feed;

      switch(message.action) {
         case "link":
             console.log(serverUrl + "?name=" + message.feed);
             tabs.open(serverUrl + "?name=" + message.feed); break;
         case "add": requestAddOrDel(message); break;
         case "del": requestAddOrDel(message); break;
         default: console.log(message.action);
      }
   }
   panel.hide();
}

function requestAddOrDel(message) {
   var url = constructAddOrDelUrl(message);
   console.log(url);
   Request({
      url: url,
      onComplete: function(response){
         if(response.status == 200) {
            console.log("Sending request OK : " + response.status);
            notifications.notify({
               text: "Le flux " + simpleStorage.storage.feed + " a correctement été mis à jour",
               iconURL: data.url("icon.png")
            });
         } else {
            console.log("Sending request ERROR : " + response.status);
            notifications.notify({
               text: "Un problème s'est produit lors de la mise à jour du flux  " + simpleStorage.storage.feed,
               iconURL: data.url("icon.png")
            });
         }
      }
   }).get();
}
function constructAddOrDelUrl(message) {
   return serverUrl + message.action + "?name=" + message.feed + "&description=" + encodeURIComponent(message.description || "") + "&url=" + encodeURIComponent(tabs.activeTab.url);
}

console.log("The add-on is running.");
