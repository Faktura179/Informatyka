file = open("dane_lokacji_1.txt","r")
counter=0
items=False
json="{"
for line in file:
    if items:
        elements = line.split(", ")
        json+="["
        for element in elements:
            #print(element)
            if element.endswith("\n"):
                element=element.strip("\n")
            json+="\""+element+"\","
        json+="],"
    if line.split(" ")[0]=="WIERSZ":
        json+=str(counter) + ":["
        items=True
    if line.index("\n")==0:
        counter+=1
        json+="],"
        items=False
json+="]}"
print(json)