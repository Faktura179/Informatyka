var http = require("http");
var server = http.createServer(function(req,res){
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
    console.log("nagłowki żądania:")
        console.log(JSON.stringify(req.rawHeaders, null,5))
        console.log(JSON.stringify(req.headers, null,5))
    console.log("adres żądania: " + req.url)
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
    res.end(JSON.stringify(req.headers, null,5))
})

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});