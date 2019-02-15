var express = require("express")
var app = express()
const PORT = 3000

var path = require("path")

app.get('/product/:id', function (req, res) {
    
    var id = req.params.id
    if (id == 2 || id==1 || id==3)
        res.sendFile(path.join(__dirname + "/static/products/product"+id+".html"))
    else
        res.send("taki produkt nie istnieje")
});

    


app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})