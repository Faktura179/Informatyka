from car import Car
from electricCar import Battery, ElectricCar

myAudi= Car("audi","a8",2018)
print(myAudi.descriptiveName())

myAudi.odometer=12345
myAudi.readOdometer()

myTesla=ElectricCar("Tesla","model S",2018)
print(myTesla.descriptiveName())