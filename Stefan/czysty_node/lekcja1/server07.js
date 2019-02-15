var http = require("http");
require("colors");
var server = http.createServer(function(req,res){        
        res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
        if(req.url.toUpperCase()=="/A"){          
            res.end("<div style='color:blue'>Kolorowe</div>")
        }else if(req.url.toUpperCase()=="/B"){
            res.end("<div style='color:green'>Kolorowe</div>")
        }else if(req.url.toUpperCase()=="/C"){
            res.end("<div style='color:red'>Kolorowe</div>")
        }
        res.end("a")
})

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});
