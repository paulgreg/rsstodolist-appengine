
defaultLimit = 25

class LimitParser():

  def parse(self,numberToClean):
    valueToReturn = defaultLimit

    if numberToClean:
      numberToClean = numberToClean.strip()

    if numberToClean.isdigit():
      parsedNumber = int(numberToClean)

      if parsedNumber > 0 and parsedNumber <= 50:
        valueToReturn = parsedNumber

    return valueToReturn
