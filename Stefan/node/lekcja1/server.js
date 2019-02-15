var express = require("express")
var app = express()
const PORT = 3000

app.use(express.static('static'))



app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})