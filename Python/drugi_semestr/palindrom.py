palindrom = input("Wpisz palindrom: ")

palindrom=palindrom.replace(" ","").lower()

pal=True
for i in range(len(palindrom)):
    if(palindrom[i]!=palindrom[len(palindrom) - i-1]):
        pal=False

if pal:
    print("Wpisales palindrom")
else:
    print("Nie wpisales palindromu")