from koloModule import Kolo
from kulaModule import Kula

while True:
    r = float(input("podaj promien - r (0 aby wyjść): "))
    if(r==0):
        break
    kula =Kula(r)
    print("Pole kuli: "+ str(kula.poleKuli())+"\nObjętość kuli: " + str(kula.objetosc())+"\nObwód koła z obrotu którego powastała kula: "+str(kula.obwod()))
    print("Pole tego koła: " + str(kula.pole()))