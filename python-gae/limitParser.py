
defaultLimit = 25
maxLimit = 50

class LimitParser():

  def parse(self,numberToClean):
    valueToReturn = defaultLimit

    if numberToClean:
      numberToClean = numberToClean.strip()

    if numberToClean.isdigit():
      parsedNumber = int(numberToClean)

      if parsedNumber > 0:
        valueToReturn = parsedNumber
      if parsedNumber > maxLimit:
        valueToReturn = maxLimit

    return valueToReturn
