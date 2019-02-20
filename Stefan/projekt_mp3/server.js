var http = require("http");
var qs = require("querystring")
var fs = require("fs")

var static = []
fs.readdir(__dirname+"/static",function(err,files){
    if(err){
        return console.log(err)
    }
    files.forEach(element => {
        static.push(element)
    });
    console.log(static)
})
var albums=[]
fs.readdir(__dirname+"/static/mp3",function(err,files){
    if(err){
        return console.log(err)
    }
    files.forEach(element => {
        albums.push(element)
    });
    console.log(albums)
})
var extensions={
    html:"text/html",
    json:"application/json",
    css:"text/css",
    js:"application/javascript",
    jpg:"image/jpg",
}

function servResponse(req,res) {
    var allData = "";

    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    req.on("data", function (data) {
       // console.log("data: " + data)
        allData += data;
    })

    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        var finish = qs.parse(allData)
        if(req.url=="/first"){
            finish.songs=[]
            finish.albums=albums
            finish.album=albums[0]
            fs.readdir(__dirname+"/static/mp3/"+albums[0],function(err,files){
                if(err){
                    return res.end()
                }
                files.forEach(el=>{
                    if(el.split(".")[el.split(".").length-1]=="mp3")
                    finish.songs.push(el)
                })
                res.end(JSON.stringify(finish))
                console.log(finish)
            })
        }else if(req.url=="/second"){
            finish.songs=[]
            fs.readdir(__dirname+"/static/mp3/"+finish.album,function(err,files){
                if(err){
                    return res.end()
                }
                files.forEach(el=>{
                    if(el.split(".")[el.split(".").length-1]=="mp3")
                    finish.songs.push(el)
                })
                res.end(JSON.stringify(finish))
                console.log(finish)
            })
        }
    })
}

var server = http.createServer(function (req, res) {
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
    switch (req.method) {
        case "GET":
            // tu wykonaj załadowanie statycznej strony z formularzem
            var sent=false
            if(req.url=="/"){
                req.url="/index.html"
            }
            static.forEach(el=>{
                if(req.url=="/"+el){
                    var ext = el.split(".")[1]
                    fs.readFile("static/"+el,function(err,data){
                        res.writeHead(200, { "content-type": extensions[ext] })
                        res.write(data)
                        res.end()
                    })
                    sent=true
                }
            })
            albums.forEach(el=>{
                if(req.url=="/"+el){
                    var ext = "jpg"
                    res.writeHead(200, { "content-type": extensions[ext] })
                    fs.createReadStream("static/covers/"+el+"."+ext).pipe(res)
                    sent=true
                }
            })
            if(!sent){
                res.end("404 Bad Gateway")
            }
            break;
        case "POST":
            // wywołanie funkcji "servResponse", która pobierze dane przesłane 
            // w formularzu i odpowie do przeglądarki 
            // (uwaga - adres żądania się nie zmienia)

            servResponse(req,res)

            break;

    }

})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});