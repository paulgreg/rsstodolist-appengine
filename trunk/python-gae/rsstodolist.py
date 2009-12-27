import cgi
import datetime
import os

from google.appengine.ext import webapp
from google.appengine.ext import db
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

from converter import Converter
from urlfetcher import UrlFetcher
from feedNameCleaner import FeedNameCleaner
from limitParser import LimitParser


class Feed(db.Model):
  name = db.StringProperty(multiline=False)
  url = db.StringProperty(multiline=False)
  title = db.StringProperty(multiline=False)
  creation_date = db.DateTimeProperty(auto_now_add=True)
  description = db.StringProperty(multiline=True)


class MainPage(webapp.RequestHandler):
  def get(self): 
    name = feedNameCleaner.clean(self.request.get('name') or self.request.get('n'))
    limit = limitParser.parse(self.request.get('limit') or self.request.get('l'))
    if not name:
      goToHome(self)
    else:
      renderRss(self, name, limit)


class Add(webapp.RequestHandler):
  def get(self): 
    name = feedNameCleaner.clean(self.request.get('name') or self.request.get('n'))
    if not name:
      goToHome(self)
    else:
      url = self.request.get('url') or self.request.get('u')
      title  = self.request.get('title') or self.request.get('t')
      description = self.request.get('description') or self.request.get('d')

      if url:
        addUrl(url, name, title, description)

      self.redirect('/?name=' + name)


def addUrl(url, name, title, description):
  formatedUrl = url.replace('&', '&amp;')

  lastFeed = db.GqlQuery('SELECT * FROM Feed WHERE name = :1 ORDER BY creation_date DESC', name).fetch(1)

  if len(lastFeed) == 0 or formatedUrl != lastFeed[0].url: # Do not add same URL twice !

    feed = Feed()
    feed.url = formatedUrl
    feed.name = name
    feed.description = converter.convert(description)

    if not title:
        try:
          title = urlFetcher.fetch(url, '(?<=<(title|TITLE)>)[^<|^\r|^\n]*')
        except Exception:
          feed.title = feed.url

    feed.title = converter.convert(title)

    if not feed.title:
        feed.title = feed.url

    feed.put()


class Delete(webapp.RequestHandler):
  def get(self): 
    name = feedNameCleaner.clean(self.request.get('name') or self.request.get('n'))
    if not name:
      goToHome(self)
    else:
      url = self.request.get('url') or self.request.get('u')

      if url:
        removeUrl(url, name)

      self.redirect('/?name=' + name)


def removeUrl(url, name):
  formatedUrl = url.replace('&', '&amp;')

  feed = db.GqlQuery('SELECT * FROM Feed WHERE name = :1 AND url = :2 ORDER BY creation_date DESC', name, url).fetch(1)

  if len(feed) >= 1: # Do not add same URL twice !
	feed[0].delete()


def goToHome(self):
  try:
    random_url = urlFetcher.fetch('http://stackoverflow.com/feeds', '(?<=<id>)http://stackoverflow.com/questions/[0-9]*/')
  except Exception:
    random_url = 'http://www.google.com/'

  self.response.headers['Content-Type'] = 'text/html'
  path = os.path.join(os.path.dirname(__file__), 'home.html')
  self.response.out.write(template.render(path, { 'random_url': random_url } ))


def renderRss(self, name, limit):
  feeds = db.GqlQuery('SELECT * FROM Feed WHERE name = :1 ORDER BY creation_date DESC', name).fetch(limit)

  self.response.headers['Content-Type'] = 'application/rss+xml'
  path = os.path.join(os.path.dirname(__file__), 'rss.xml')
  self.response.out.write(template.render(path,	{ 'name': name, 'feeds': feeds } ))


application = webapp.WSGIApplication([
													('/', MainPage),
													('/add', Add),
													('/del', Delete)
												])

if __name__ == '__main__':
  converter = Converter()
  urlFetcher = UrlFetcher()
  feedNameCleaner = FeedNameCleaner()
  limitParser = LimitParser()
  run_wsgi_app(application)
