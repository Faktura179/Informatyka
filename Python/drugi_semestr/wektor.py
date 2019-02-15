import math
class Wektor():
    def __init__(self,x=0,y=0,x2=0,y2=0):
        self.x1 = x
        self.y1 = y
        self.x2 = x2
        self.y2 = y2
    def ustawWspolrzedne(self,x,y,x2,y2):
        self.x1=x
        self.y1=y
        self.x2=x2
        self.y2=y2
    def x(self):
        return self.x2-self.x1
    def y(self):
        return self.y2-self.y1
    def wyswietlWspolrzedne(self):
        print("["+str(self.x())+";"+str(self.y())+"]")

    def dlugosc(self):
        return math.sqrt(self.x()*self.x()+self.y()*self.y())

class Skalar(Wektor):
    def __init__(self,x=0,y=0,x1=0,y1=0,x2=0,y2=0,x3=0,y3=0):
        super().__init__(x,y,x1,y1)
        self.wektor2=Wektor(x2,y2,x3,y3)
    
    def dodajWektory(self):
        print("["+str(self.x()+self.wektor2.x())+";"+str(self.y()+self.wektor2.y())+"]")

    def skalar(self,liczba):
        print("["+str(self.wektor2.x()*liczba)+";"+str(self.wektor2.y()*liczba)+"]")

print("Tworze nowy wektor: ")
wektor=Wektor(0,0,3,4)
wektor.wyswietlWspolrzedne()
print("Dlugosc tego wektora")
print(wektor.dlugosc())
print("Ustawiam wspolrzedne tego wektora na [1;2](x1=1,y1=2,x2=2,y2=4): ")
wektor.ustawWspolrzedne(1,2,2,4)
wektor.wyswietlWspolrzedne()
print("Tworze skalara: ")
x1 = int(input("Podaj x1: "))
y1 = int(input("Podaj y1: "))
x2 = int(input("Podaj x2: "))
y2 = int(input("Podaj y2: "))
x3 = int(input("Podaj x3: "))
y3 = int(input("Podaj y3: "))
x4 = int(input("Podaj x4: "))
y4 = int(input("Podaj y4: "))
skalar = Skalar(x1,y1,x2,y2,x3,y3,x4,y4)
print("Wektory:")
skalar.wyswietlWspolrzedne()
skalar.wektor2.wyswietlWspolrzedne()
print("Suma wektorow: ")
skalar.dodajWektory()
liczba = int(input("Podaj liczbe przez ktora przemnozys drugi wektor (x2,y2): "))
skalar.skalar(liczba)
