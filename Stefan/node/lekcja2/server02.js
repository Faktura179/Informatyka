var express = require("express")
var app = express()
const PORT = 3000
var path=require("path")
var bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", function(req, res){
     res.sendFile(path.join(__dirname+"/static/index.html"))    
})

app.post("/handleForm", function(req, res){
    console.log(req.body)
    res.send("<html><body style='background:"+req.body.color+"'>"+"</body></html>")    
})

app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})