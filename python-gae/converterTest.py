# -*- coding: utf-8 -*-

import unittest
from converter import Converter

class TestConverter(unittest.TestCase):

   def testConvertNothing(self):
     assert converter.convert('') == ''

   def testConvertSomethingSimple(self):
     assert converter.convert('A simple url: www.google.com') == 'A simple url: www.google.com'

   def testConvertHtmlName(self):
     assert converter.convert('Gr&eacute;gory Paul') == 'Grégory Paul'.decode('utf8')

   # Title from http://www.necdisplay.com/NewTechnologies/CurvedDisplay/
   def testConvertRaquo(self):
     assert converter.convert('NEC Display Solutions &raquo; News & Media &raquo; Media Coverage') == 'NEC Display Solutions - News & Media - Media Coverage'

   # Title from http://tempsreel.nouvelobs.com/actualites/societe/20091013.OBS4458/
   def testConvertAccents(self):
     assert converter.convert('Trois cas de gale ont été signalés à l\'Elysée, Soci&eacute;t&eacute;') == 'Trois cas de gale ont été signalés à l\'Elysée, Société'.decode('utf8')

if __name__=="__main__":
   converter = Converter()
   unittest.main()

