var http = require("http");
var server = http.createServer(function(req,res){
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
    console.log("adres żądania: " + req.url)
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
    if (req.headers["user-agent"].search("Firefox")!=-1){
        res.end("Twoja przegladarka to firefox")
    }else if(req.headers["user-agent"].search("Chrome")!=-1){
        res.end("Twoja przegladarka to chrome")
    }else{
        res.end("Twoja przegladarka jest nieznana")
    }
})

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});