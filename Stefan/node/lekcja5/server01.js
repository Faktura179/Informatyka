var express = require("express")
var app = express()
const PORT = 3000

var Datastore = require('nedb')

var coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});

var doc = {
    a: "a",
    b: "b"
};

coll1.count({}, function (err, count) {
    console.log("dokumentów jest: ",count)
});

app.get("/", function (req, res) {
    
})

app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})