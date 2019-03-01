var http = require("http")
var express = require("express")
var app = express()
const PORT = 3000;
app.use(express.static('static'))
var path = require("path")
//nasłuch na określonym porcie

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname + "/static/index.html"))
})


app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})
