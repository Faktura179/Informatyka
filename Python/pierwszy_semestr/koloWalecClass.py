import math

class Kolo():
    def __init__(self,promien):
        self.promien=promien
    
    def pole(self):
        return math.pi * self.promien**2

    def obwod(self):
        return math.pi * self.promien * 2

class Walec(Kolo):
    def __init__(self,promien,wysokosc):
        super().__init__(promien)
        self.wysokosc=wysokosc

    def objetosc(self):
        return self.pole()*self.wysokosc
    def polePowCal(self):
        return self.pole()*2+self.obwod()*self.wysokosc

walec=Walec(6,8)
print(walec.obwod())
print(walec.pole())
print(walec.objetosc())
print(walec.polePowCal())