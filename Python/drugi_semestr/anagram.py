string1 = input("podaj pierwszy wyraz: ").lower().replace(" ","")
string2 = input("podaj drugi wyraz: ").lower().replace(" ","")

if(len(string1)!=len(string2)):
    print("Słowa nie sa anagramami")
else:
    literki1={}
    literki2={}
    for c in string1:
        literki1[c]=literki1.get(c,0)+1
    for c in string2:
        literki2[c]=literki2.get(c,0)+1
    anagram=True
    for key,item in literki1.items():
        if(literki2.get(key,0)!=item):
            anagram=False
    for key,item in literki2.items():
        if(literki1.get(key,0)!=item):
            anagram=False
    if(anagram):
        print("Słowa są anagramami")
    else:
        print("Słowa nie są anagramami")