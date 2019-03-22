def dzialanie(a,b,znak):
    if(znak=="/"):
        return b/a
    elif(znak=="*" or znak=="·"):
        return b*a
    elif(znak=="+"):
        return b+a
    elif(znak=="-"):
        return b-a
equ = input("Podaj równanie w postaci ONP: ")
arr=equ.split(" ")
dane=[]

while(arr):
    el=arr.pop(0)
    if(el.isdigit()):
        dane.append(el)
    else:
        dane.append(dzialanie(float(dane.pop()),float(dane.pop()),el))
print(dane[0])
