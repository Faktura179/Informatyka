from kontrachent import Kontrachent
import json
import os
if __name__ == "__main__":
    print("Kontrachenci")
    while True:
        print("Wybierz co chesz zrobić:\n[0] Wyjście\n[1]Dodaj kontrachenta\n[2]Wyszukaj kontrachenta\n[3]Usuń kontrachenta\n[4]Pokaż kontrachentów")
        try:
            opcja = int(input("Podaj numerek: "))
        except:
            print("Nieprawidłowy numerek!")
            continue
        if(opcja==0):
            break
        elif opcja==1:
            nazwa=input("Podaj nazwę kontrachenta: ")
            poczta=input("Podaj kod pocztowy kontrachenta: ")
            miasto=input("Podaj z jakiego miasta jest kontrachent: ")
            ulica=input("Podaj na jakiej ulicy znajduje się siedziba: ")
            osoba=input("Podaj osobę kontaktową: ")
            mail=input("Podaj maila do tej osoby: ")
            telefon=input("Podaj telefon do tej osoby: ")
            if os.path.isfile("./baza.json"):
                file = open("baza.json", "r")
                read = file.read()
                file.close()
                if read == "":
                    file = open("baza.json", "rb+")
                    st = "[" + json.dumps(Kontrachent(nazwa,poczta,miasto,ulica,osoba,mail,telefon).__dict__) + "]"
                    file.write(st.encode())
                    file.close()
                if read == "[]":
                    file = open("baza.json", "rb+")
                    file.seek(-1,2)
                    st = json.dumps(Kontrachent(nazwa,poczta,miasto,ulica,osoba,mail,telefon).__dict__) + "]"
                    file.write(st.encode())
                    file.close()
                else:
                    file = open("baza.json", "rb+")
                    file.seek(-1,2)
                    st = ","+json.dumps(Kontrachent(nazwa,poczta,miasto,ulica,osoba,mail,telefon).__dict__) + "]"
                    file.write(st.encode())
                    file.close()
            else:
                file = open("baza.json", "w+")
                file.write("[")
                file.write(json.dumps(Kontrachent(nazwa,poczta,miasto,ulica,osoba,mail,telefon).__dict__))
                file.write("]")
                file.close()
        elif opcja==2:
            try:
                file = open("baza.json", "r+")
                arr = json.loads(file.read())
                file.close()
            except:
                arr=[]
            kontrahenci =[]
            for kontrahent in arr:
                kontrahenci.append(Kontrachent(kontrahent["nazwa"],kontrahent["poczta"],kontrahent["miasto"],kontrahent["ulica"],kontrahent["imie"],kontrahent["mail"],kontrahent["telefon"]))
            print("[0] Po nazwie\n[1] Po mieście\n[2] Po osobie\n[3] Po mailu")
            try:
                num = int(input("Po czym wyszukać? "))
            except:
                num=5
            if num==0:
                nazwa= input("Podaj nazwe kontrachenta aby wyszukać: ")
                for kontrahent in kontrahenci:
                    if nazwa.lower() in kontrahent.nazwa.lower():
                        kontrahent.wyswietl()
            elif num==1:
                nazwa= input("Podaj miasto kontrachenta aby wyszukać: ")
                for kontrahent in kontrahenci:
                    if nazwa.lower() in kontrahent.miasto.lower():
                        kontrahent.wyswietl()
            elif num==2:
                nazwa= input("Podaj osobę aby wyszukać: ")
                for kontrahent in kontrahenci:
                    if nazwa.lower() in kontrahent.imie.lower():
                        kontrahent.wyswietl()
            elif num==3:
                nazwa= input("Podaj mail kontrachenta aby wyszukać: ")
                for kontrahent in kontrahenci:
                    if nazwa.lower() in kontrahent.mail.lower():
                        kontrahent.wyswietl()
        elif opcja==3: #usuwanie
            try:
                file = open("baza.json", "r+")
                arr = json.loads(file.read())
                file.close()
            except:
                arr=[]
            kontrahenci =[]
            for kontrahent in arr:
                kontrahenci.append(Kontrachent(kontrahent["nazwa"],kontrahent["poczta"],kontrahent["miasto"],kontrahent["ulica"],kontrahent["imie"],kontrahent["mail"],kontrahent["telefon"]))

            usun = input("Podaj nazwę kontrachenta do usunięcia: ")
            for i in range(len(kontrahenci)):
                if kontrahenci[i].nazwa.lower()==usun.lower():
                    del kontrahenci[i]
                    print("Usunięto")
                    break
            file = open("baza.json", "w+")
            file.write("[")
            for i in range(len(kontrahenci)):
                if i ==0:
                    file.write(json.dumps(kontrahenci[i].__dict__))
                else:
                    file.write("," + json.dumps(kontrahenci[i].__dict__))
            file.write("]")
            file.close()

        elif opcja==4:
            try:
                file = open("baza.json", "r")
                arr = json.loads(file.read())
                file.close()
            except:
                arr=[]
            kontrahenci =[]
            for kontrahent in arr:
                kontrahenci.append(Kontrachent(kontrahent["nazwa"],kontrahent["poczta"],kontrahent["miasto"],kontrahent["ulica"],kontrahent["imie"],kontrahent["mail"],kontrahent["telefon"]))

            for kontrahent in kontrahenci:
                kontrahent.wyswietl()       
        
        print("\n")