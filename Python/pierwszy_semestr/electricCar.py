from car import Car
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