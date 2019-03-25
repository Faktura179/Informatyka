class Ui{
    constructor(){
        this.clicks()
        net.getNumLevels()
        $("#load_number").css("display","block")
    }
    clicks(){
        $("#send").click(function(){
            level.createMap($("#num_planszy").val())
            $("#load_number").css("display","none")
        })
        $("#power").on("change",function(){
            level.lights.forEach(el => {
                el.power=this.value
            });
        })
        $("#height").on("change",function(){
            level.lights.forEach(el => {
                el.position.y=this.value
            });
        })
    }
}