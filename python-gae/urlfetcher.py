from google.appengine.api import urlfetch

class UrlFetcher():

  def fetch(self, url, regexp):
    result = urlfetch.fetch(url, allow_truncated=True)
    if result.status_code == 200:
      m = re.search(regexp, result.content)
      if m.group(0):
        return m.group(0)

    return null
