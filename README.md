# rsstodolist-appengine

[rsstodolist](https://rsstodolist.appspot.com/) is an URL oriented to-read-list based on an RSS XML feed, running on [Google AppEngine](https://cloud.google.com/appengine/) python.

Typical use case is to save web pages to read later on a RSS feed.

Also, if you know the feed name of a friend of yours, you may also "push" links to it's RSS feed. That's another cool use case.

Feeds are publics so anyone can publish to any feeds. Be aware of that before using it for sensible URLs.

But, instead of using the public server on AppEngine (rsstodolist.appspot.com), you can also deploy the app on your own server (see related projects below) to have maximum privacy and security.

## Related projects

  * [node server](https://github.com/paulgreg/rsstodolist-node-server) : a node js implementation for self-hosting,
  * [django server](https://github.com/paulgreg/rsstodolist-django-server) : a django implementation for self-hosting,
  * [rsstodolist-appengine](https://github.com/paulgreg/rsstodolist-appengine) : rsstodolist.appspot.com source code,
  * [browser addon](https://github.com/paulgreg/rsstodolist-addon) : a browser (Chrome/Firefox) addon.

## To run locally

    dev_appserver.py .

## To deploy

Update VERSIONS before deploying a new version

    gcloud app deploy .
