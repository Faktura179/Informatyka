var http = require("http");
var fs = require("fs")
var qs = require("querystring")
var mongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var opers = require("./Modules/Operations.js")
//console.log(opers)

var _db;
var extensions={
    html:"text/html",
    json:"application/json",
    css:"text/css",
    js:"application/javascript",
    jpg:"image/jpg",
    mp3:"audio/mpeg",
    txt:"text/plain",
    png:"image/png",
}
var server = http.createServer(function(req,res){
    switch (req.method) {
        case "GET":
            if(req.url=="/"){
                req.url="/index.html"
            }
            req.url=decodeURI(req.url)
            readFiles(req,res,"static","static")
            break;
        case "POST":
            servResponse(req, res)
            break;
    
    } 
})


function servResponse(req,res){
    var allData = "";

    req.on("data", function (data) {
        allData += data;
    })

    req.on("end", function (data) {
        var finish = qs.parse(allData)
        console.log(req.url, finish)
        var coll = _db.collection("usersi")
        switch(req.url){
            case "/add":
                opers.Insert(coll,{login:finish.login,password:finish.password})
                res.end("success")
                break;
            case "/get":
                opers.SelectAll(coll, function(items){
                    res.writeHead(200,{ "content-type": extensions["json"] })
                    res.end(JSON.stringify(items))
                })
                
                break;
            case "/update":
                opers.UpdateById(ObjectID,coll,finish)
                res.end("success")
                break;
            case "/connect":
                mongoClient.connect("mongodb://"+finish.ip+"/", function (err, db) {
                    if (err){ console.log(err);res.writeHead(400,{ "content-type": extensions["txt"] });res.end()}
                    else{ console.log("mongo podłączone!")
                        //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt 
                        // pod zmienną widoczną na zewnątrz    
                        //console.log(db)
                        opers.ListDatabases(db,function(databases){
                            res.writeHead(200,{ "content-type": extensions["json"] })   
                            res.end(JSON.stringify({dbs:databases, ip:finish.ip}))
                        })
                    }
                })
                break;
            case "/collections":
                mongoClient.connect("mongodb://"+finish.ip+"/"+finish.db, function (err, db) {
                    if (err){ console.log(err)}
                    else{ console.log("mongo podłączone!")
                        //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt 
                        // pod zmienną widoczną na zewnątrz    
                        //console.log(db)
                        _db=db
                        opers.ListCollections(db,function(collections){
                            res.writeHead(200,{ "content-type": extensions["json"] })   
                            res.end(JSON.stringify({collections:collections}))
                        })
                    }
                })
                break;
            case "/add_db":
                mongoClient.connect("mongodb://"+finish.ip+"/"+finish.db, function (err, db) {
                    if (err){ console.log(err)}
                    else{ console.log("mongo podłączone!")
                        opers.CreateCollection(db,"test",()=>{
                            opers.ListDatabases(db,function(databases){
                                res.writeHead(200,{ "content-type": extensions["json"] })   
                                res.end(JSON.stringify({dbs:databases}))
                            })
                        })
                    }
                })
                break;
            case "/del_db":
                opers.DropDatabase(_db,()=>{
                    opers.ListDatabases(_db,function(databases){
                        res.writeHead(200,{ "content-type": extensions["json"] })   
                        res.end(JSON.stringify({dbs:databases}))
                    })
                })
                break;
            case "/add_col":
                opers.CreateCollection(_db,finish.col,()=>{
                    opers.ListCollections(_db,function(collections){
                        res.writeHead(200,{ "content-type": extensions["json"] })   
                        res.end(JSON.stringify({collections:collections}))
                    })
                })
                break;
            case "/del_col":
                opers.DeleteCollection(_db,finish.col,()=>{
                    opers.ListCollections(_db,function(collections){
                        res.writeHead(200,{ "content-type": extensions["json"] })   
                        res.end(JSON.stringify({collections:collections}))
                    })
                })
                break;
            default:

                break;
        }
    })
}

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});

mongoClient.connect("mongodb://localhost/3id1", function (err, db) {
    if (err) console.log(err)
    else console.log("mongo podłączone!")
    //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt 
    // pod zmienną widoczną na zewnątrz    
    _db = db;
    db.createCollection("users", function (err, coll) {
    })
})



function readFiles(req,res,dir,remove=""){
    fs.readdir(__dirname+"/"+dir,function(err,files){
        if(err){
            return res.end()
        }
        files.forEach((file)=>{
            fs.stat(__dirname+"/"+dir+"/"+file,function(err,f){
                if(err){
                    return res.end()
                }
                if(f.isDirectory()){
                    readFiles(req,res,dir+"/"+file,remove)
                }else{
                    fs.readFile(__dirname+"/"+dir+"/"+file,function(err,data){
                        if(err){
                            return res.end()
                        }
                        var ext = file.split(".")[file.split(".").length-1]
                        if(req.url==(dir+"/"+file).replace(remove,"")){
                            res.writeHead(200, { "content-type": extensions[ext] })
                            res.write(data)
                            res.end()
                        }
                    })
                }
            })
        })
    })
}