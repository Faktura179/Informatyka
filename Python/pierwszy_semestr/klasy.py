class Dog():
    """Klasa opisująca pieska"""

    def __init__(self,name, age):
        """incjalizacja klasy"""
        self.name=name;
        self.age=age;

    def sit(self):
        """Siadaj na komendę"""
        print(self.name.title() + " teraz siedzi!")
    
    def givPaw(self):
        """Dawaj łapę!"""
        print(self.name.title() + " dał łapę!")

myDog=Dog("reksio", 4)
print("Mój pies ma na imię " + myDog.name + ".")
print("Mój pies ma " + str(myDog.age) + " lat.")
myDog.sit()
myDog.givPaw()