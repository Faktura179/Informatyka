var net = new Net()
class Hex{
    constructor(x,y){
        this.x=x
        this.y=y
        this.type=type
        this.htmlElement=$("<div>")
        this.htmlElement.css("background-image","url('gfx/hexagon.png')")
        this.htmlElement.addClass("hexagon")
        this.dir=null
        this.dirIn=[]
        this.htmlElement.on("click",function(){
            this.click()
        }.bind(this)) 
    }
    getHTML(){
        return this.htmlElement[0]
    }
    changePosition(x,z){
        this.htmlElement.css("top",z)
        this.htmlElement.css("left",x)
    }
    inside(){
        var num = document.createElement("div")
        num.classList.add("number")
        num.innerText=this.dir
        var arrow = document.createElement("img")
        arrow.src="/gfx/arrow.png"
        arrow.classList.add("arrow")
        this.htmlElement.append(num)
        var div = document.createElement("div")
        div.classList.add("pusty_div")
        var span = document.createElement("span")
        span.classList.add("rotation_span")
        span.append(div)
        span.append(arrow)

        span.style.transform="rotate("+(270+(this.dir*60))+"deg)"

        this.htmlElement.append(span)
    }
    click(){
        this.type=type
        this.htmlElement.empty()
        if(this.dir==null || this.dir==5){
            this.dir=0
        }else{
            this.dir++
        }
        $("#json_pre").text(JSON.stringify({size:$("#sel").val(),level:getmap()},null,4))
        this.inside()
    }
}
var field=[]
var type="wall"
function getmap(){
    var map=[]
    var i =0
    field.forEach((e)=>{
        e.forEach(el=>{
            if(el.dir!=null){
                map.push({id:i,x:el.x,z:el.y,dirOut:el.dir,dirIn:el.dirIn,type:el.type})
                i++
            }
        })
    })
    return map
}
$(document).ready(function(){
    
    $("#sel").on("change",function(){
        var size = this.value
        field=[]
        $("#plansza").empty()
        for(var i=0;i<size;i++){
            field[i]=[]
            for(var j=0;j<size;j++){
                var hex = new Hex(j,i)
                field[i][j]=hex
                if(j%2==1)
                    hex.changePosition(20+j*88,73+i*106) //20 px - odsuniecie od lewej krawedzi, szerokosc 88 = 110(2R) - 1/2R(27?) + odstep, wysokosc - tez 20 odstepu oraz 50 to przesuniecie w dol a 3 to polowa odstepu 6(wys - 100)
                else
                    hex.changePosition(20+j*88,20+i*106)
                $("#plansza").append(hex.getHTML())
            }
        }
    })
    $("#sel").trigger("change")
    $("#save").on("click",function(){
        field.forEach((e)=>{
            e.forEach(el=>{
                el.dirIn=[]
            })
        })
        field.forEach((e)=>{
            e.forEach(el=>{
                if(el.dir!=null){
                    var x
                    var y
                    switch (el.dir) {
                        case 0:
                            x=0
                            y=-1
                            break;
                        case 1:
                            if(el.x%2==1){
                                x=1
                                y=0
                            }else{
                                x=1
                                y=-1
                            }
                            break;
                        case 2:
                            if(el.x%2==1){
                                x=1
                                y=1
                            }else{
                                x=1
                                y=0
                            }
                            break;
                        case 3:
                            x=0
                            y=1
                            break;
                        case 4:
                            x=-1
                            if(el.x%2==1) y=1; else y=0
                            break;
                        case 5:
                            x=-1
                            if(el.x%2==1) y=0; else y=-1
                            break;
                    }
                    if(field[el.y+y]!=undefined)
                        if(field[el.y+y][el.x+x]!=undefined){
                            field[el.y+y][el.x+x].dirIn.push((el.dir+3)%6)
                        }
                }
            })
        })
        var map=getmap()
        
        net.sendData($("#sel").val(),map) 
    })
    $("#load").on("click",function(){
        //net.getLevel(0)
        net.getNumLevels()
        $("#load_number").css("display","block")
    })
    $("#send").click(function(){
        net.getLevel($("#num_planszy").val())
        $("#load_number").css("display","none")
    })
    $("#test").click(function(){
        location="/test/player.html"
    })
    $("#walls").on("click",function(){
        type="wall"
    })
    $("#enemy").on("click",function(){
        type="enemy"
    })
    $("#treasure").on("click",function(){
        type="treasure"
    })
    $("#light").on("click",function(){
        type="light"
    })
    $("#hex").click(function(){
        location="/hex"
    })
    $("#game").click(function(){
        location="/game"
    })
})