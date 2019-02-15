var http = require("http");
var qs = require("querystring")
var fs = require("fs")

function servResponse(req,res) {
    var allData = "";

    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    req.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })

    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        var finish = qs.parse(allData)
        res.end(JSON.stringify(finish));
    })
}
var server = http.createServer(function (req, res) {
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
    switch (req.method) {
        case "GET":
            // tu wykonaj załadowanie statycznej strony z formularzem
            res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
            fs.readFile("static/strona4.html", function (err, data) {
                res.write(data)
                res.end()
            })
            
            break;
        case "POST":
            // wywołanie funkcji "servResponse", która pobierze dane przesłane 
            // w formularzu i odpowie do przeglądarki 
            // (uwaga - adres żądania się nie zmienia)

            servResponse(req, res)

            break;

    }

})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});