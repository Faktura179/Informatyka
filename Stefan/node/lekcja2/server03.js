var express = require("express")
var app = express()
const PORT = 3000
var path=require("path")
var formidable=require("formidable")

app.get("/", function(req, res){
     res.sendFile(path.join(__dirname+"/static/index1.html"))    
})

app.post('/handleUpload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/static/upload/' // folder do zapisu zdjęcia
    form.parse(req, function (err, fields, files) {  
        console.log(fields);        
        console.log(files);
        res.send(files)
    });
});

app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})