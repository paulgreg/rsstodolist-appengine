import cgi
import datetime
import os

from google.appengine.ext import webapp
from google.appengine.ext import db
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

from converter import Converter
from urlfetcher import UrlFetcher

class Feed(db.Model):
  name = db.StringProperty(multiline=False)
  url = db.StringProperty(multiline=False)
  title = db.StringProperty(multiline=False)
  creation_date = db.DateTimeProperty(auto_now_add=True)  


class MainPage(webapp.RequestHandler):
  def get(self): 
    name = self.request.get('name') or self.request.get('n')
    if not name:
      goToHome(self)
    else:
      renderRss(self, name)


class AddPage(webapp.RequestHandler):
  def get(self): 
    name = self.request.get('name') or self.request.get('n')
    if not name:
      goToHome(self)
    else:
      url = self.request.get('url') or self.request.get('u')
      title  = self.request.get('title') or self.request.get('t')

      if url:
        addUrl(url, name, title)

      self.redirect('/?name=' + name)


def addUrl(url, name, title):
  feed = Feed()
  feed.url = url
  feed.name = name

  if not title:
    try:
      title = urlFetcher.fetch(url, '(?<=<(title|TITLE)>)[^<|^\r|^\n]*')
    except Exception:
      feed.title = url

  feed.title = converter.convert(title)

  if not feed.title:
    feed.title = url

  feed.put()


def goToHome(self):
  try:
    random_url = urlFetcher.fetch('http://stackoverflow.com/feeds', '(?<=<id>)http://stackoverflow.com/questions/[0-9]*/')
  except Exception:
    random_url = 'http://www.google.com/'

  self.response.headers['Content-Type'] = 'text/html'
  path = os.path.join(os.path.dirname(__file__), 'home.html')
  self.response.out.write(template.render(path, { 'random_url': random_url } ))


def renderRss(self, name):
  feeds = db.GqlQuery('SELECT * FROM Feed WHERE name = :1 ORDER BY creation_date DESC LIMIT 25', name)

  self.response.headers['Content-Type'] = 'application/rss+xml'
  path = os.path.join(os.path.dirname(__file__), 'rss.xml')
  self.response.out.write(template.render(path,	{ 'name': name, 'feeds': feeds } ))


application = webapp.WSGIApplication([
													('/', MainPage),
													('/add', AddPage)
												])

if __name__ == '__main__':
  converter = Converter()
  urlFetcher = UrlFetcher()
  run_wsgi_app(application)
