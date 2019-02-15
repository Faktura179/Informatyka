var express = require("express")
var app = express()
const PORT = 3000

var path = require("path")

app.use(express.static('static'))


app.get("/", function (req, res) {
    res.send("dane html odesłane z serwera do przeglądarki")   
})

app.get("/strona1", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: "+__dirname)
    res.sendFile(path.join(__dirname + "/static/index1.html"))
    
})
app.get("/strona2", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: "+__dirname)
    res.sendFile(path.join(__dirname + "/static/index2.html"))
    
})
app.get("/strona3", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: "+__dirname)
    res.sendFile(path.join(__dirname + "/static/index3.html"))
    
})

app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})