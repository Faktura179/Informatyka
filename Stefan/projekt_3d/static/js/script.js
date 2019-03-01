class Hex{
    constructor(){
        this.htmlElement=$("<div>")
        this.htmlElement.css("background-image","url('gfx/hexagon.png')")
        this.htmlElement.addClass("hexagon")
        console.log(this.htmlElement)
    }
    getHTML(){
        return this.htmlElement[0]
    }
    changePosition(x,z){
        this.htmlElement.css("top",z)
        this.htmlElement.css("left",x)
    }
}
$(document).ready(function(){
    $("#sel").on("change",function(){
        var size = this.value
        $("#plansza").empty()
        for(var i=0;i<size;i++){
            for(var j=0;j<size;j++){
                var hex = new Hex()
                if(j%2==1)
                    hex.changePosition(20+j*90,70+i*105)
                else
                    hex.changePosition(20+j*90,20+i*105)
                $("#plansza").append(hex.getHTML())
            }
        }
    })
    $("#sel").trigger("change")
})