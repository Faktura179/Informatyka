from koloModule import Kolo,math


class Kula(Kolo):
    def __init__(self,promien):
        super().__init__(promien)
    
    def poleKuli(self):
        return 4*super().pole()

    def objetosc(self):
        return 4/3*math.pi*self.promien**3