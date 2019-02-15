var express = require("express")
var app = express()
const PORT = 3000

app.get("/", function (req, res) {
    let count = req.query.count
    let bg = req.query.bg
    str = "<html><head></head><body>"
    for (let i = 0; i < count; i++) {
        str+="<div style='background-color:" + bg + ";width:50px;height:50px;float:left;margin:5px;'>"+i+"</div>"       
    }
    str+="</body></html>"
    res.send(str)   
})


app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})