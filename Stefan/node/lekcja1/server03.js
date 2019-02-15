var express = require("express")
var app = express()
const PORT = 3000

var path = require("path")

app.use(express.static('static'))

app.get("/strona", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: "+__dirname)
    res.sendFile(path.join(__dirname + "/static/strona.html"))
    
})

app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})