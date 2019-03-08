text = input("Podaj kilka wyrazow: ")
text = text.split(" ")
for i in range(len(text)):
    for j in range(len(text)-1):
        if(text[j]>text[j+1]):
            tmp=text[j+1]
            text[j+1]=text[j]
            text[j]=tmp
print(text)

