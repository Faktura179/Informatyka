var net = new Net()
class Hex{
    constructor(x,y){
        this.x=x
        this.y=y
        this.htmlElement=$("<div>")
        this.htmlElement.css("background-image","url('gfx/hexagon.png')")
        this.htmlElement.addClass("hexagon")
        this.dir=null
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
        this.htmlElement.empty()
        if(this.dir==null || this.dir==5){
            this.dir=0
        }else{
            this.dir++
        }
        this.inside()
    }
}
var field=[]
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
    $("button").on("click",function(){
        var map=[]
        var i=0
        field.forEach((e)=>{
            e.forEach(el=>{
                if(el.dir!=null){
                    map.push({id:i,x:el.x,z:el.y,dir:el.dir})
                    i++
                }
            })
        })
        net.sendData(map)
    })
})