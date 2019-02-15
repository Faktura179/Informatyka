var express = require("express")
var app = express()
const PORT = 3000
var path=require("path")
var bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({ extended: true })); 

var id=5
var tab = [
    { id: 1, log: "AAA", pass: "PASS1", wiek: 10, uczen: "checked", plec: "m" },
    { id: 4, log: "BBB", pass: "PASS2", wiek: 15, uczen: "checked", plec: "m" },
    { id: 3, log: "CCC", pass: "PASS3", wiek: 16, uczen: "checked", plec: "k" },
    { id: 2, log: "DDD", pass: "PASS4", wiek: 17, uczen: "checked", plec: "m" },
    { id: 5, log: "EEE", pass: "PASS5", wiek: 21, uczen: "unchecked", plec: "k" }
]


app.get("/", function(req, res){
     res.sendFile(path.join(__dirname+"/static/index.html"))    
})

app.get("/register", function(req, res){
    res.sendFile(path.join(__dirname+"/static/register.html"))    
})

app.get("/login", function(req, res){
    res.sendFile(path.join(__dirname+"/static/login.html"))    
})

app.get("/admin", function(req, res){
    res.sendFile(path.join(__dirname+"/static/admin.html"))    
})

app.post("/registeruser",function(req,res){
    console.log(req.body)
    id+=1
    if(req.body.uczen=="on")
        tab.push({id:id,log:req.body.login,pass:req.body.password,wiek:parseInt(req.body.wiek),uczen:"checked",plec:req.body.plec})
    else
        tab.push({id:id,log:req.body.login,pass:req.body.password,wiek:parseInt(req.body.wiek),uczen:"unchecked",plec:req.body.plec})
    res.send("Dodano użytkownika")
    console.log(tab)
})

app.post("/loginuser",function(req,res){
    var loged=false
    tab.forEach(function(item,index){
        if(req.body.login==item["log"]){
            if(req.body.pass==item["pass"]){
                res.send("Zalogowano pomyślnie")
                loged=true
            }
        }
    })
    if(!loged){
        res.send("nie udalo sie zalogowac")
    }   
})

app.get("/sort",function(req,res){
    var ros=""
    var mal=""
    if(req.query.ros=="on"){
        tab = tab.sort((a,b)=>a.id-b.id)
        ros="checked"
    }
    else{
        tab = tab.sort((a,b)=>b.id-a.id)
        mal="checked"
    }
    var str="<html><head><style>a{margin:20px;} td{border:1px solid blue;}</style></head><body><a href='/sort'>sort</a><a href='/gender'>gender</a><a href='/show'>show</a><br/><form action='/sort' onchange='this.submit()' method='get'><input type='radio' name='ros' val='ros'"+ros+">rosnaco<input type='radio' name='ros' value='mal'"+mal+">malejaco</form><table>"
    tab.forEach(function(item,index){
        str+="<tr>"
        str+="<td>id: " + item.id+"</td>" +"<td>user: " + item.log+" - "+ item.pass+"</td>"+"<td>płeć: " + item.plec+"</td>"+"<td>uczeń?: " + item.uczen+"</td>"+"<td>wiek: " + item.wiek+"</td>"
        str+="</tr>"
    })
    str+="</table></body></html>"
    res.send(str)
})

// app.post("/sort",function(req,res){
//     console.log(req.body)
//     var redirected= false
//     if(req.body.ros=="on"){
//         res.redirect("/sort")
//         redirected=true
//     }
//     tab = tab.sort((a,b)=>a.id-b.id)
//     var str="<html><head><style>a{margin:20px;} td{border:1px solid blue;}</style></head><body><a href='/sort'>sort</a><a href='/gender'>gender</a><a href='/show'>show</a><br/><form action='/sort' onchange='this.submit()' method='post'><input type='radio' name='ros' val='ros'>rosnaco<input type='radio' name='ros' value='mal' checked>malejaco</form><table>"
//     if(req.body.ros=="ros")
//         tab.forEach(function(item,index){
//             str+="<tr>"
//             str+="<td>id: " + item.id+"</td>" +"<td>user: " + item.log+" - "+ item.pass+"</td>"+"<td>płeć: " + item.plec+"</td>"+"<td>uczeń?: " + item.uczen+"</td>"+"<td>wiek: " + item.wiek+"</td>"
//             str+="</tr>"
//         })
//     else
//         for(var i =tab.length-1;i>=0;i--){
//             str+="<tr>"
//             str+="<td>id: " + tab[i].id+"</td>" +"<td>user: " + tab[i].log+" - "+ tab[i].pass+"</td>"+"<td>płeć: " + tab[i].plec+"</td>"+"<td>uczeń?: " + tab[i].uczen+"</td>"+"<td>wiek: " + tab[i].wiek+"</td>"
//             str+="</tr>"
//         }
//     str+="</table></body></html>"
//     if(!redirected)
//         res.send(str)
// })

app.get("/gender",function(req,res){
    var tab1=""
    var tab2=""
    for(var i = 0;i<tab.length;i++){
        if(tab[i].plec=="m"){
            tab1+="<tr><td>ID: "+tab[i].id+"</td>"+"<td>Płeć: "+tab[i].plec+"</td>"+"</tr>"
        }else{
            tab2+="<tr><td>ID: "+tab[i].id+"</td>"+"<td>Płeć: "+tab[i].plec+"</td>"+"</tr>"
        }
    }
    var str="<html><head><style>a{margin:20px;} td{border:1px solid blue;} table{float:left; margin-left:50px;}</style></head><body><a href='/sort'>sort</a><a href='/gender'>gender</a><a href='/show'>show</a><br/><form onchange='this.submit()' method='post'>"
    str+="</form><table>"
    str+=tab1
    str+="</table><table>"
    str+=tab2
    str+="</table></body></html>"
    res.send(str)
})

app.get("/show",function(req,res){
    tab = tab.sort((a,b)=>a.id-b.id)
    var str="<html><head><style>a{margin:20px;} td{border:1px solid blue;}</style></head><body><a href='/sort'>sort</a><a href='/gender'>gender</a><a href='/show'>show</a><br/><form action='/sort' onchange='this.submit()' method='post'></form><table>"
    tab.forEach(function(item,index){
        str+="<tr>"
        str+="<td>id: " + item.id+"</td>" +"<td>user: " + item.log+" - "+ item.pass+"</td>"+"<td>płeć: " + item.plec+"</td>"
        if(item.uczen=="checked")
            str+="<td>uczeń?: " + "<input type='checkbox' checked disabled>" +"</td>"
        else
            str+="<td>uczeń?: " + "<input type='checkbox' disabled>" +"</td>"
        str+="<td>wiek: " + item.wiek+"</td>"
        str+="</tr>"
    })
    str+="</table></body></html>"
    res.send(str)
})

app.listen(PORT, function(){
    console.log("Start serwera na porcie "+PORT)
})