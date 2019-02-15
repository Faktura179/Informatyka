class User():
    def __init__(self,firstName,lastName,age,height):
        self.firstName=firstName
        self.lastName=lastName
        self.age=age
        self.height=height
        self.loginAttempts=0
    
    def greetUser(self):
        return "Witaj " + self.firstName + " " + self.lastName + "!"


    def describeUser(self):
        return self.firstName + " " + self.lastName + " w wieku " +str(self.age) + " lat, o wysokości " + str(self.height) + "cm."

    def login(self):
        self.loginAttempts+=1
    
    def resetLoginAttempts(self):
        self.loginAttempts=0

users=[User("Andrzej","Bombosz",12,182),User("Janusz","Strączek",89,158),User("Jerzy","Kowalski",33,195)]

#for user in users:
 #   print(user.greetUser())
 #   print(user.describeUser())

users[0].login();
users[0].login();
users[0].login();

print(users[0].loginAttempts)

users[0].resetLoginAttempts()

print(users[0].loginAttempts)