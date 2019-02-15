var express = require("express")
var app = express()
const PORT = 3000

app.get("/", function (req, res) {
    let val = req.query.value
    let toRad = req.query.toRad
    if(toRad=="true"){
        res.send(val + "° to " + val*Math.PI/180 + " RAD")
    }
    else{
        res.send(val + " RAD to " + val*180/Math.PI + "°")
    }   
})


app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})