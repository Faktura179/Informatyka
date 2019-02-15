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
        return longName.title()
        
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

    def fuelTank(self):
        return "Zbiornik ma rozmiar 60L"

class Battery():

    def __init__(self, batterySize=70):
        self.batterySize=batterySize

    def descriptiveBattery(self):
        return "Ten samochód ma baterię pojemności " + str(self.batterySize)+" kWh."

class ElectricCar(Car):
    def __init__(self,brand,model,year):
        super().__init__(brand,model,year)
        self.batterySize=Battery()
    
    def descriptiveBattery(self):
        return self.batterySize.descriptiveBattery()

    def fuelTank(self):
        return "Nie ma zbiornika paliwa w aucie elektrycznym!"

tesla = ElectricCar("Tesla","Model S",2018)
print(tesla.descriptiveName())
print(tesla.descriptiveBattery())
print()
print(tesla.fuelTank())

opel = Car("Opel","Astra",2001)
print(opel.descriptiveName())
print(opel.fuelTank())