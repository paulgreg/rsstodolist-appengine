import cgi
import datetime

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from google.appengine.api import urlfetch
import re

import os
from google.appengine.ext.webapp import template


class Feed(db.Model):
  url = db.StringProperty(multiline=False)
  title = db.StringProperty(multiline=False)
  creation_date = db.DateTimeProperty(auto_now_add=True)  


def addUrl(url, title):
  feed = Feed()
  feed.url = url


  if title:
    feed.title = title
  else:
    result = urlfetch.fetch(url, allow_truncated=True)
    if result.status_code == 200:
      m = re.search('(?<=<title>).*(?=</title>)', result.content)
      if m.group(0):
        feed.title = m.group(0)

  if not feed.title:
    feed.title = url

  feed.put()

def render(self):
  feeds = db.GqlQuery('SELECT * FROM Feed ORDER BY creation_date DESC LIMIT 50')

  self.response.headers['Content-Type'] = 'application/rss+xml'
  path = os.path.join(os.path.dirname(__file__), 'rss.xml')
  self.response.out.write(template.render(path,	{ 'feeds': feeds } ))

class MainPage(webapp.RequestHandler):
  def get(self): 
    render(self);

class AddPage(webapp.RequestHandler):
  def get(self): 
    url = self.request.get('url')
    title  = self.request.get('title')

    if url:
      addUrl(url, title)

    render(self);



application = webapp.WSGIApplication([
													('/', MainPage),
													('/add', AddPage)
												])

def main():
  run_wsgi_app(application)

if __name__ == '__main__':
  main()
