var http = require("http")
var express = require("express")
var app = express()
const PORT = 3000;
app.use(express.static('static'))
var path = require("path")
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true })); 
//nasłuch na określonym porcie
var level=[]
var id=0

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname + "/static/index.html"))
})
app.get("/hex",function(req,res){
    res.redirect("/hex.html")
})
app.get("/game", function(req,res){
    res.redirect("/game.html")
})
app.post("/map",function(req,res){
    level.push({level:req.body,id:id})
    id++
    res.send(req.body)
    //console.log(level[0].level,"- req body -",req.body)
})

app.post("/load",function(req,res){
    res.send(level[req.body.id])
})

app.post("/levels",function(req,res){
    res.send({levels:level.length})
})

app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})
