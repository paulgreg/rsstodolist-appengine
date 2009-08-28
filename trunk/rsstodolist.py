import cgi
import datetime

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db

import os
from google.appengine.ext.webapp import template


class Feed(db.Model):
  url = db.StringProperty(multiline=False)
  title = db.StringProperty(multiline=False)
  creation_date = db.DateTimeProperty(auto_now_add=True)  


def addUrl(add_url):
  feed = Feed()
  feed.url = add_url
  feed.title = add_url
  feed.put()

def render(self):
  feeds = db.GqlQuery('SELECT * FROM Feed ORDER BY creation_date DESC LIMIT 50')

  self.response.headers['Content-Type'] = 'application/rss+xml'
  path = os.path.join(os.path.dirname(__file__), 'rss.xml')
  self.response.out.write(template.render(path,	{ 'feeds': feeds } ))

class MainPage(webapp.RequestHandler):
  def get(self):
    add_url = self.request.get('add')

    if add_url:
      addUrl(add_url)
 
    render(self);


application = webapp.WSGIApplication(
													[('/', MainPage)]
												)

def main():
  run_wsgi_app(application)

if __name__ == '__main__':
  main()
