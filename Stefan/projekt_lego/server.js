var express = require("express")
var app = express();
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);

app.use(express.static("static"))

//nasłuch na określonym porcie
app.get("/", function (req, res) {
    res.sendFile(__dirname+"/static/index.html")   
})

app.listen(3000, function () { 
    console.log("Listening on port 3000" )
})