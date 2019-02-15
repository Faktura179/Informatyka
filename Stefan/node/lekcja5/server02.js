var express = require("express")
var app = express()
const PORT = 3000

var hbs = require('express-handlebars')
var path = require("path")

app.use(express.static('static'))

app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' })); // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs'); // określenie silnika szablonów

var Datastore = require('nedb')

var coll1 = new Datastore({
    filename: 'samochody.db',
    autoload: true
});

app.get("/", function (req, res) {
    coll1.find({ }, function (err, docs) {
        var obj={arr:docs}
        res.render("layout1",obj)
    });
})

app.get("/send", function (req, res) {
    var obj={
        ubezpieczony:req.query.ubez=="on" ? "TAK":"NIE",
        benzyna:req.query.benzyna=="on" ? "TAK":"NIE",
        uszkodzony:req.query.uszkodzony=="on" ? "TAK":"NIE",
        naped:req.query.naped=="on" ? "TAK":"NIE"
    }
    coll1.insert(obj)
    res.redirect("/")
})

app.get("/usun",function(req, res){
    coll1.remove({ _id: req.query._id}, { multi: true });
    res.redirect("/")
})

app.get("/edytuj",function(req, res){
    coll1.find({ }, function (err, docs) {
        var obj={arr:docs}
        obj.arr.forEach((item, index)=>{
            if(item._id==req.query._id){
                item.edit=true
                item.isUbez= item.ubezpieczony=="TAK" ? true:false
                item.isBenz= item.benzyna=="TAK" ? true:false
                item.isUsz= item.uszkodzony=="TAK" ? true:false
                item.isNap= item.naped=="TAK" ? true:false
            }else{
                item.edit=false
            }
        })
        res.render("layout2",obj)
    });
})

app.get("/change", function(req,res){
    coll1.update({ _id: req.query._id }, { $set:  req.query}, {}, function (err, numUpdated) {
        res.redirect("/")
     });
    
})

var page = 0
app.get("/next",function(req,res){
    page+=1
    res.redirect("/mov")
})
app.get("/previous",function(req,res){
    if(page>0)
        page-=1
    res.redirect("/mov")
})

app.get("/mov", function(req,res){
    coll1.find({ }).limit(3).skip(page*3).exec(function(err, docs){
        var obj={arr:docs}
        res.render("layout3",obj)
    });
})

app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})