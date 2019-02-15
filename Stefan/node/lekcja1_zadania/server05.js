var app = express()
const PORT = 3000

var path = require("path")

app.get("/", function (req, res) {
    res.send("dane html odesłane z serwera do przeglądarki")   
})

app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})