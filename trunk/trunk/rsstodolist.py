import cgi
import datetime
import re
import os
import HTMLParser

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from google.appengine.api import urlfetch
from google.appengine.ext.webapp import template


class Feed(db.Model):
  username = db.StringProperty(multiline=False)
  url = db.StringProperty(multiline=False)
  title = db.StringProperty(multiline=False)
  creation_date = db.DateTimeProperty(auto_now_add=True)  


def addUrl(url, username, title):
  feed = Feed()
  feed.url = url
  feed.username = username

  if title:
    feed.title = title
  else:
    result = urlfetch.fetch(url, allow_truncated=True)
    if result.status_code == 200:
      m = re.search('(?<=<title>).*(?=</title>)', result.content)
      if m.group(0):
        h= HTMLParser.HTMLParser()
        feed.title = unicode(h.unescape(m.group(0)), errors='replace')

  if not feed.title:
    feed.title = url

  feed.put()

def renderRss(self, username):
  feeds = db.GqlQuery('SELECT * FROM Feed WHERE username = :1 ORDER BY creation_date DESC LIMIT 50', username)

  self.response.headers['Content-Type'] = 'application/rss+xml'
  path = os.path.join(os.path.dirname(__file__), 'rss.xml')
  self.response.out.write(template.render(path,	{ 'username': username, 'feeds': feeds } ))

def goToHome(self):
  self.response.headers['Content-Type'] = 'text/html'
  self.response.out.write(template.render(os.path.join(os.path.dirname(__file__), 'home.html'), { } ))

class MainPage(webapp.RequestHandler):
  def get(self): 
    username = self.request.get('username')
    if not username:
      goToHome(self)
    else:
      renderRss(self, username)

class AddPage(webapp.RequestHandler):
  def get(self): 
    username = self.request.get('username')
    if not username:
      goToHome(self)
    else:
      url = self.request.get('url')
      title  = self.request.get('title')

      if url:
        addUrl(url, username, title)

      self.redirect('/?username=' + username)



application = webapp.WSGIApplication([
													('/', MainPage),
													('/add', AddPage)
												])

def main():
  run_wsgi_app(application)

if __name__ == '__main__':
  main()
