text = input("Podaj ciag znakow: ")
wzorzec = "ABAB"
index=0
indexy=[]
while(text.find(wzorzec,index)!=-1):
    indexy.append(text.find(wzorzec,index))
    index=text.find(wzorzec,index)+1
print(indexy)
