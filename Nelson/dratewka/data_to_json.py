file = open("zaleznosci.txt","r")
counter=0
items=False
i=0
json="var zaleznosci = {"
for line in file:
    arr = line.split(",")
    json+="\""+str(i)+"\":{\"id\":\""+arr[0]+"\",\"lokacja\":\""+arr[1]+"\",\"id2\":\""+arr[2]+"\",\"komunikat\":\""+arr[3].replace("\n","")+"\"},\n"
    i+=1
json+="}"
print(json)