var fs = require("fs");
var http = require("http");
var server = http.createServer(function(request,response){
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
    if (request.url == "/index.html") {

        fs.readFile("static/index.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    }
    else if (request.url == "/second") {
    
        fs.readFile("static/second.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    }
    
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write("<h1>404 - brak takiej strony</h1>");
        response.end();
    
    }
})


server.listen(3000, function(){
    console.log("serwer startuje na porcie 3000")
 });
