var express = require("express")
var app = express()
const PORT = 3000
var hbs = require('express-handlebars')
var path = require("path")

app.use(express.static('static'))

app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' })); // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs'); // określenie silnika szablonów

var context = {
    subject: "ćwiczenie 3 - dane z tablicy obiektów",  
    books: [
     { title: "Lalka", author: "B Prus", lang: "PL" },
     { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
     { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
     { title: "Zamek", author: "F Kafka", lang: "CZ" }
   ] 
 }
 


app.get("/", function (req, res) { 
    res.render('index02.hbs',context);   // nie podajemy ścieżki tylko nazwę pliku
    // res.render('index.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
})


app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})