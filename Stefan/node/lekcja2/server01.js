var express = require("express")
var app = express()
const PORT = 3000
var path=require("path")

app.get("/", function(req, res){
     res.sendFile(path.join(__dirname+"/static/index.html"))    
})

app.get("/handleForm", function(req, res){
    console.log(req.query)
    res.send(req.query)    
})

app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})