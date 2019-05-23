var http = require("http")
var express = require("express")
var app = express()
const PORT = 3000;
app.use(express.static('static'))
var path = require("path")
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true })); 

//nasłuch na określonym porcie
app.get("/", function (req, res) {
    res.sendFile(__dirname+"/static/index.html")   
})

app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})