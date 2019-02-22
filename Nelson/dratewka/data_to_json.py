file = open("items.txt","r")
counter=0
items=False
json="var items = {"
for line in file:
    line.replace("-",":")
    arr = line.split(",")
    arr[0]=arr[0][5:]
    json+="\""+line[:5]+"\"{"
json+="}"
print(json)