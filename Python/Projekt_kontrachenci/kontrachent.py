class Osoba():
    def __init__(self,imie,mail,telefon):
        self.imie=imie
        self.mail=mail
        self.telefon=telefon
        
    def wyswietlOsobe(self):
        print("Kontakt: " + self.imie.title()+ ", mail: " + self.mail + ", telefon: " + self.telefon+"\n")

class Kontrachent(Osoba):
    def __init__(self,nazwa,poczta,miasto,ulica,osoba,mail,telefon):
        self.nazwa=nazwa
        self.poczta=poczta
        self.miasto=miasto
        self.ulica=ulica
        super().__init__(osoba,mail,telefon)

    def wyswietl(self):
        print("\nFirma: " + self.nazwa)
        print("Siedziba: " + self.miasto.title() + ", Ul. " + self.ulica + " " + self.poczta)
        self.wyswietlOsobe()