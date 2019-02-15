var express = require("express")
var app = express()
const PORT = 3000

var path = require("path")

app.get('/user/:id', function (req, res) {
    
    var id = req.params.id
    if (id == 2)
        res.send("odsyłam stronę usera z id = 2")
    else
        res.send("taki user nie istnieje")
});


app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})