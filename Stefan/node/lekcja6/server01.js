var context = require("./data/data.json")
var hbs = require('express-handlebars');

var path = require("path")
var http = require("http")
var express = require("express")
var app = express()
const PORT = 3000;


app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' ,helpers:{
    funkcja:function(a){
        return "abc" +a
    }
},partialsDir:"views/partials",extname:".hbs"})); // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs'); // określenie silnika szablonów

app.get("/", function (req, res) { 
    res.render('index01.hbs',context);   // nie podajemy ścieżki tylko nazwę pliku
    //console.log(context)
    // res.render('index.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
})

app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})

