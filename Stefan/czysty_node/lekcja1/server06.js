var http = require("http");
require("colors");
var server = http.createServer(function(req,res){        
        res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
        if(req.url=="/A"){          
            console.log("tekst na czerwono".red)
        }else if(req.url=="/B"){
            console.log("tekst na zielono".green)
        }else if(req.url=="/C"){
            console.log("tekst na tęczowo".rainbow)
        }
        res.end("a")
})

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});



