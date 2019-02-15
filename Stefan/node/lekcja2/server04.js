var express = require("express")
var app = express()
const PORT = 3000
var path=require("path")
var users=[]
var bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname+"/static/addUser.html"))    
})
app.get("/delete", function(req, res){
    var str="<select name='mail'>"
    for(var i=0;i<users.length;i++){
        str+="<option value='"+users.mail+"'>"+users.mail+"</option>"
    }
    str+="</select><button type='submit'>Usun</button>"
    res.send("<html><body><form action=\"/removeUser1\" method=\"POST\">"+str+"</form></body></html>")  
})

app.post("/handleForm", function(req, res){
    var zajety=false
    users.forEach((item,index)=>{
        if(req.body.mail==item.mail){
            res.send("Taki mail już jest w bazie")
            zajety=true
        }
    })
    if(!zajety){
        users.push({mail:req.body.mail,user:req.body.user})
        res.send("dodano")
    }
    console.log(users)  
})

app.post("/removeUser1", function(req, res){
    console.log(req.body)
    res.send(users)
})

app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})