# rsstodolist-appengine

[rsstodolist](https://rsstodolist.appspot.com/) is an URL oriented to-read-list based on an RSS XML feed.

Typical example is putting web pages to read later on a RSS feed.

Also, if you know the feed name of a friend of yours, you may also "push" links to it's RSS feed. That's another cool use case.

Feeds are publics so anyone can publish to any feeds. Be aware of that before using it for sensible URLs.

But, instead of using the public server (rsstodolist.appspot.com), you can also deploy the app on your own server (see related projects below) to have maximum privacy and security.

## Related projects

  * [node server](https://github.com/paulgreg/rsstodolist-node-server) : a node js implementation to host the service on your server,
  * [django server](https://github.com/paulgreg/rsstodolist-server) : a django implementation to host the service on your server (not maintained anymore)
  * [rsstodolist-appengine](https://github.com/paulgreg/rsstodolist-appengine) : rsstodolist.appspot.com source code
  * [browser addon](https://github.com/paulgreg/rsstodolist-addon) : a browser (Chrome/Firefox) addon

## To deploy

    gcloud app deploy .
