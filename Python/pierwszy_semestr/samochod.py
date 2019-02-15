class Car():
    """Klasa samochodu"""

    def __init__(self,brand,model,year):
        """incijalizacja klasy"""
        self.brand=brand
        self.model=model
        self.year=year
        self.odometer=0
    
    def descriptiveName(self):
        """Zwraca dane o samochodzie"""
        longName=self.brand + " " + self.model + " " + str(self.year)
        return longName.title();
        
    def readOdometer(self):
        """odczytuje przebieg"""
        print("Ten samochód ma przejechane " + str(self.odometer) + " km.")

    def updateOdometer(self,odometer):
        """Uaktualnia licznik"""
        if(self.odometer<=odometer):
            self.odometer=odometer
        else:
            print("Nie można cofnąć licznika!")
    
    def increaseOdometer(self, kilometers):
        """inkrementacja licznika"""
        self.odometer+=kilometers
        

newCar = Car("Audi", "a6", 2016)
print(newCar.descriptiveName())
newCar.odometer=15700
newCar.updateOdometer(5000)
newCar.increaseOdometer(220)
newCar.readOdometer()