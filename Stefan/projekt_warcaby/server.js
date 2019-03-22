var http = require("http");
var qs = require("querystring")
var fs = require("fs")

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

function servResponse(req,res) {
    var allData = "";

    req.on("data", function (data) {
        allData += data;
    })

    req.on("end", function (data) {
        var finishObj = qs.parse(allData)
             
        switch (finishObj.akcja) {
           //dodanie nowego usera
           case "ADD_USER":
              addUser();
              break;
           //inna akcja
           case "":
              
              break;            
          }
     })
}

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

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            if(req.url=="/"){
                req.url="/index.html"
            }
            req.url=decodeURI(req.url)
            readFiles(req,res,"static","static")
            break;
        case "POST":

            servResponse(req,res)

            break;

    }

})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});

//funkcje

function addUser(){
    
}
