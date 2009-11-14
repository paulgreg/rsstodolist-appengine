# -*- coding: utf-8 -*-

from BeautifulSoup import BeautifulStoneSoup

class Converter():

  def convert(self,nameToClean):
    sanitizedName = BeautifulStoneSoup( nameToClean, convertEntities=BeautifulStoneSoup.HTML_ENTITIES )
    unicodedName = unicode( sanitizedName )
    cleanedName = unicodedName.replace('»'.decode('utf8'), '-')
    cleanedName = cleanedName.replace('&eacute;', 'é'.decode('utf8'))
    cleanedName = cleanedName.replace('&', 'and')
    cleanedName = cleanedName.replace('<', '{').replace('>', '}')
    cleanedName = cleanedName.replace('\n', ' ').replace('\r', '')
    cleanedName = cleanedName.replace('\t', ' ')
    return cleanedName
