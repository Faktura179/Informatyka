var fs = require("fs");
var http = require("http");
var static
fs.readdir("static/",(err,items)=>{
    static = items
    console.log(static)
})
var server = http.createServer(function(request,response){
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
    
    //console.log(static)
    static.forEach(item => {
        if (request.url === "/" + item) {
            var ext = item.split(".")[1]
            console.log(ext)
            fs.readFile("static/"+item, function (error, data) {
                if(ext=="html")
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                else if(ext=="js")
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                else if(ext=="css")
                    response.writeHead(200, { 'Content-Type': 'text/css' });
                response.write(data);
                response.end();
            })
        }
    });
})


server.listen(3000, function(){
    console.log("serwer startuje na porcie 3000")
 });
