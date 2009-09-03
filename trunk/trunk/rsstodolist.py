import cgi
import datetime
import re
import os

from google.appengine.api import urlfetch
from google.appengine.ext import webapp
from google.appengine.ext import db
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app
from BeautifulSoup import BeautifulStoneSoup

class Feed(db.Model):
  name = db.StringProperty(multiline=False)
  url = db.StringProperty(multiline=False)
  title = db.StringProperty(multiline=False)
  creation_date = db.DateTimeProperty(auto_now_add=True)  


def addUrl(url, name, title):
  feed = Feed()
  feed.url = url
  feed.name = name

  if title:
    feed.title = title
  else:
    result = urlfetch.fetch(url, allow_truncated=True)
    if result.status_code == 200:
      m = re.search('(?<=<title>).*(?=</title>)', result.content)
      if m.group(0):
        feed.title = unicode(BeautifulStoneSoup(m.group(0), convertEntities=BeautifulStoneSoup.HTML_ENTITIES ))

  if not feed.title:
    feed.title = url

  feed.put()

def renderRss(self, name):
  feeds = db.GqlQuery('SELECT * FROM Feed WHERE name = :1 ORDER BY creation_date DESC LIMIT 50', name)

  self.response.headers['Content-Type'] = 'application/rss+xml'
  path = os.path.join(os.path.dirname(__file__), 'rss.xml')
  self.response.out.write(template.render(path,	{ 'name': name, 'feeds': feeds } ))

def goToHome(self):
  random_url = 'http://www.google.com'
  result = urlfetch.fetch('http://stackoverflow.com/feeds', allow_truncated=True)
  if result.status_code == 200:
    m = re.search('(?<=<id>)http://stackoverflow.com/questions/[0-9]*/', result.content)
    if m.group(0):
      random_url = m.group(0)

  self.response.headers['Content-Type'] = 'text/html'
  path = os.path.join(os.path.dirname(__file__), 'home.html')
  self.response.out.write(template.render(path, { 'random_url': random_url } ))

class MainPage(webapp.RequestHandler):
  def get(self): 
    name = self.request.get('name')
    if not name:
      goToHome(self)
    else:
      renderRss(self, name)

class AddPage(webapp.RequestHandler):
  def get(self): 
    name = self.request.get('name')
    if not name:
      goToHome(self)
    else:
      url = self.request.get('url')
      title  = self.request.get('title')

      if url:
        addUrl(url, name, title)

      self.redirect('/?name=' + name)



application = webapp.WSGIApplication([
													('/', MainPage),
													('/add', AddPage)
												])

def main():
  run_wsgi_app(application)

if __name__ == '__main__':
  main()
