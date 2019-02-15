var fs = require("fs");
var http = require("http");
var server = http.createServer(function(request,response){
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
    console.log("żądany przez przeglądarkę adres: " + request.url)

if (request.url === "/strona3.html") {
    fs.readFile("static/third.html", function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    })
}
else if (request.url === "/style.css") {
    fs.readFile("static/style.css", function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.write(data);
        response.end();
    })
}
else if (request.url === "/script.js") {
    fs.readFile("static/script.js", function (error, data) {
        response.writeHead(200, { 'Content-Type': 'application/javascript' });
        response.write(data);
        response.end();
    })
}
})


server.listen(3000, function(){
    console.log("serwer startuje na porcie 3000")
 });
